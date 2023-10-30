const Fragment = Symbol('Fragment');
const Text = Symbol('Text');
function createVNode(type, props, children) {
    const vnode = {
        type,
        props,
        children,
        el: null,
        shapeFlag: getShapFlag(type),
    };
    if (typeof children == 'string') {
        vnode.shapeFlag |= 8 /* ShapeFlags.TEXT_CHILDREN */;
    }
    else if (Array.isArray(children)) {
        vnode.shapeFlag |= 16 /* ShapeFlags.ARRAY_CHILDREN */;
    }
    // 组件+ children object
    if (vnode.shapeFlag & 4 /* ShapeFlags.STATEFUL_COMPONENT */) {
        if (typeof children === 'object') {
            vnode.shapeFlag |= 32 /* ShapeFlags.SLOTS_CHILDREN */;
        }
    }
    return vnode;
}
function createTextVnode(text) {
    return createVNode(Text, {}, text);
}
function getShapFlag(type) {
    return typeof type === 'string'
        ? 1 /* ShapeFlags.ELEMENT */
        : 4 /* ShapeFlags.STATEFUL_COMPONENT */;
}

function h(type, props, children) {
    return createVNode(type, props, children);
}

/**
 * Compiler runtime helper for rendering `<slot/>`
 * 用来 render slot 的
 * 之前是把 slot 的数据都存在 instance.slots 内(可以看 componentSlot.ts)，
 * 这里就是取数据然后渲染出来的点
 * 这个是由 compiler 模块直接渲染出来的
 * 其最终目的就是在 render 函数中调用 renderSlot 取 instance.slots 内的数据
 * TODO 这里应该是一个返回一个 block ,但是暂时还没有支持 block ，所以这个暂时只需要返回一个 vnode 即可
 * 因为 block 的本质就是返回一个 vnode
 *
 * @private
 */
function renderSlot(slots, name, props) {
    const slot = slots[name];
    if (slot) {
        // 因为 slot 是一个返回 vnode 的函数，我们只需要把这个结果返回出去即可
        // slot 就是一个函数，所以就可以把当前组件的一些数据给传出去，这个就是作用域插槽
        // 参数就是 props
        if (typeof slot == 'function') {
            return createVNode(Fragment, {}, slot(props));
        }
    }
}

const extend = Object.assign;
const EMPTY_OBJ = {};
const isObject = (val) => {
    return val !== null && typeof val === 'object';
};
// 是否相同
const hasChanged = (val, newValue) => {
    return !Object.is(val, newValue);
};
function hasOwn(val, key) {
    return Object.prototype.hasOwnProperty.call(val, key);
}
// add-foo => addFoo
const camelize = (str) => {
    return str.replace(/-(\w)/g, (_, c) => {
        return c ? c.toUpperCase() : '';
    });
};
// add => Add
const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
const toHandlerKey = (str) => {
    return str ? 'on' + capitalize(str) : '';
};

let activeEffect;
// 是否收集依赖
let shouldTrack;
class ReactiveEffect {
    constructor(fn, scheduler) {
        this.scheduler = scheduler;
        this.deps = [];
        this.active = true; //状态是否多次调用stop
        this._fn = fn;
    }
    run() {
        activeEffect = this;
        // 1. 会收集依赖
        // shouldTrack 来做区分
        if (!this.active) {
            return this._fn();
        }
        // 应该收集
        shouldTrack = true;
        activeEffect = this;
        const result = this._fn();
        // 重置
        shouldTrack = false;
        return result;
    }
    stop() {
        // 删除effect
        // 优化前
        // this.deps.forEach((dep: any) => {
        //   dep.delete(this)
        // })
        // 优化后
        // 是否多次调用stop
        if (this.active) {
            cleanupEffect(this);
            if (this.onStop) {
                this.onStop();
            }
            this.active = false;
        }
    }
}
// 删除effect
function cleanupEffect(effect) {
    effect.deps.forEach((dep) => {
        dep.delete(effect);
    });
    // 把effect.deps 清空
    effect.deps.length = 0;
}
// 收集依赖
const targetMap = new Map();
function track(target, key) {
    if (!isTracking())
        return;
    // target -> key -> dep
    let depsMap = targetMap.get(target);
    if (!depsMap) {
        // 没有值， 初始化
        depsMap = new Map();
        targetMap.set(target, depsMap);
    }
    let dep = depsMap.get(key);
    if (!dep) {
        dep = new Set();
        depsMap.set(key, dep);
    }
    // 收集依赖
    trackEffects(dep);
}
function trackEffects(dep) {
    // 有activeEffect 无需重复收集   看dep 之前有没有添加过， 有就不添加了
    if (dep.has(activeEffect))
        return;
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
}
function isTracking() {
    // if (!activeEffect) return
    // if (!shouldTrack) return
    return shouldTrack && activeEffect !== undefined;
}
// 触发依赖 更新
function trigger(target, key) {
    let depsMap = targetMap.get(target);
    let dep = depsMap.get(key);
    triggerEffect(dep);
}
function triggerEffect(dep) {
    for (const effect of dep) {
        if (effect.scheduler) {
            effect.scheduler();
        }
        else {
            effect.run();
        }
    }
}
function effect(fn, options = {}) {
    // fn
    const _effect = new ReactiveEffect(fn, options.scheduler);
    // _effect.onStop = options.onStop
    // options
    // Object.assign(_effect,options)
    // extend
    extend(_effect, options);
    _effect.run();
    const runner = _effect.run.bind(_effect);
    runner.effect = _effect;
    return runner;
}

// 优化： 只会在初始化调用一次
const get = creatGetter();
const set = creatSetter();
const readonlyGet = creatGetter(true);
const shallowReadonlyGet = creatGetter(true, true);
function creatGetter(isReadonly = false, shallow = false) {
    return function get(target, key) {
        if (key === "_v_isReactive" /* ReactiveFlages.IS_REACTIVE */) {
            return !isReadonly;
        }
        else if (key === "_v_isReadonly" /* ReactiveFlages.IS_READONLY */) {
            return isReadonly;
        }
        const res = Reflect.get(target, key);
        // shallowReadonly ：创建一个浅层只读代理对象
        if (shallow) {
            return res;
        }
        // 嵌套reactive
        // 判断res   是不是  object
        if (isObject(res)) {
            return isReadonly ? readonly(res) : reactive(res);
        }
        // 依赖收集
        if (!isReadonly) {
            track(target, key);
        }
        return res;
    };
}
function creatSetter() {
    return function set(target, key, value) {
        const res = Reflect.set(target, key, value);
        // 触发依赖
        trigger(target, key);
        return res;
    };
}
const mutableHandlers = {
    get,
    set,
};
const readonlyHandlers = {
    get: readonlyGet,
    set(target, key, value) {
        console.warn(`key:${key} set 失败， 因为 target是 readonly`, target);
        return true;
    },
};
const shallowReadonlyHandlers = extend({}, readonlyHandlers, {
    get: shallowReadonlyGet,
    set(target, key, value) {
        console.warn(`key:${key} set 失败， 因为 target是 readonly`, target);
        return true;
    },
});

function reactive(raw) {
    return creatActiveObject(raw, mutableHandlers);
}
function readonly(raw) {
    return creatActiveObject(raw, readonlyHandlers);
}
function shallowReadonly(raw) {
    return creatActiveObject(raw, shallowReadonlyHandlers);
}
function creatActiveObject(target, baseHandles) {
    if (!isObject(target)) {
        console.warn(`target ${target}必须是一个对象`);
        return target;
    }
    return new Proxy(target, baseHandles);
}

class RefImpl {
    constructor(value) {
        this._v_isRef = true;
        // 存储未处理的value
        this._rawValue = value;
        // value  =》 reactive
        // 1. 判断是否是对象， 是需要用reactive包裹
        this._value = convert(value);
        this.dep = new Set();
    }
    get value() {
        // 依赖收集
        trackRefValue(this);
        return this._value;
    }
    set value(newVlue) {
        // 触发依赖
        // 一定先修改了value 的值
        // newVlue -> this._value 相同不出触发trigger
        // 对比的时候 是 object
        if (hasChanged(newVlue, this._rawValue)) {
            this._rawValue = newVlue;
            this._value = convert(newVlue);
            triggerEffect(this.dep);
        }
    }
}
function convert(value) {
    return isObject(value) ? reactive(value) : value;
}
function trackRefValue(ref) {
    if (isTracking()) {
        trackEffects(ref.dep);
    }
}
function ref(value) {
    return new RefImpl(value);
}
function isRef(ref) {
    return !!ref._v_isRef;
}
function unRef(ref) {
    // 是不是一个ref -> ref.value
    return isRef(ref) ? ref.value : ref;
}
function proxyRefs(objectWithRefs) {
    return new Proxy(objectWithRefs, {
        get(target, key) {
            // get -> age(ref) 返回 。value
            // not ref   -> value
            return unRef(Reflect.get(target, key));
        },
        set(target, key, value) {
            // set -> ref   .value
            if (isRef(target[key]) && !isRef(value)) {
                return (target[key].value = value);
            }
            else {
                return Reflect.set(target, key, value);
            }
        },
    });
}

function emit(instance, event, ...args) {
    console.log('emit---', event);
    // instance.props => event
    const { props } = instance;
    // TPP  先写特定的行为-》 通用
    const handlerName = toHandlerKey(camelize(event));
    const handler = props[handlerName];
    handler && handler(...args);
}

function initProps(instance, rawProps) {
    instance.props = rawProps || {};
    // attrs
}

const publicPropertiesMap = {
    $el: (i) => i.vnode.el,
    $slots: (i) => i.slots
};
const PublicInstanceProxyHandlers = {
    get({ _: instance }, key) {
        // setupstate
        const { setupState, props } = instance;
        if (key in setupState) {
            return setupState[key];
        }
        if (hasOwn(setupState, key)) {
            return setupState[key];
        }
        else if (hasOwn(props, key)) {
            return props[key];
        }
        // $el
        const publicGetter = publicPropertiesMap[key];
        if (publicGetter) {
            return publicGetter(instance);
        }
    },
};

function initSlots(instance, children) {
    const { vnode } = instance;
    if (vnode.shapeFlag & 32 /* ShapeFlags.SLOTS_CHILDREN */) {
        normalizeObjectSlots(children, instance.slots);
    }
}
const normalizeSlotValue = (value) => {
    // 把 function 返回的值转换成 array ，这样 slot 就可以支持多个元素了
    return Array.isArray(value) ? value : [value];
};
const normalizeObjectSlots = (children, slots) => {
    for (let key in children) {
        let value = children[key];
        slots[key] = (props) => normalizeSlotValue(value(props));
    }
};

function creatComponentInstance(vnode, parent) {
    const component = {
        vnode,
        type: vnode.type,
        setupState: {},
        props: {},
        slots: {},
        provides: parent ? parent.provides : {},
        parent,
        isMount: false,
        subTree: {},
        emit: () => { },
    };
    component.emit = emit.bind(null, component);
    return component;
}
function setupComponent(instance) {
    initProps(instance, instance.vnode.props);
    initSlots(instance, instance.vnode.children);
    // 初始化一个有状态的component
    setupStatefulComponen(instance);
}
function setupStatefulComponen(instance) {
    const Component = instance.type;
    // 初始化
    // ctx
    instance.proxy = new Proxy({ _: instance }, PublicInstanceProxyHandlers);
    const { setup } = Component;
    if (setup) {
        setCurrentInstance(instance);
        const setupResult = setup(shallowReadonly(instance.props), {
            emit: instance.emit,
        });
        setCurrentInstance(null);
        handleSetupResult(instance, setupResult);
    }
}
function handleSetupResult(instance, setupResult) {
    // function  obj
    // object
    if (typeof setupResult === 'object') {
        instance.setupState = proxyRefs(setupResult);
    }
    // 保证组件render有值
    finishComponentSetup(instance);
}
// 保证组件render有值  设置render
function finishComponentSetup(instance) {
    const Component = instance.type;
    instance.render = Component.render;
}
let currentInstance = null;
function getCurrentInstance() {
    return currentInstance;
}
function setCurrentInstance(instance) {
    currentInstance = instance;
}

function provide(key, value) {
    // 存
    // 获取组件实例对像
    const currentInstance = getCurrentInstance();
    if (currentInstance) {
        let { provides } = currentInstance;
        const parentProvides = currentInstance.parent.provides;
        // 从原型上获取  改写  初始化init
        if (provides === parentProvides) {
            provides = currentInstance.provides = Object.create(parentProvides);
        }
        provides[key] = value;
    }
}
function inject(key, defaultValue) {
    // 取
    const currentInstance = getCurrentInstance();
    if (currentInstance) {
        const parentProvides = currentInstance.parent.provides;
        console.log('parentProvides', parentProvides);
        if (key in parentProvides) {
            return parentProvides[key];
        }
        else if (defaultValue) {
            if (typeof defaultValue === 'function') {
                return defaultValue();
            }
            else {
                return defaultValue;
            }
        }
    }
}

function createAppAPI(render) {
    return function createApp(rootComponent) {
        return {
            mount(rootContainer) {
                // 先 vnode
                // componet -> vnode
                // 所有的逻辑都会基于虚拟节点 做处理
                const vnode = createVNode(rootComponent);
                render(vnode, rootContainer);
            }
        };
    };
}

function createRenderer(options) {
    const { createElement: hostCreateElememt, patchProp: hostPatchProp, insert: hostInsert, remove: hostRemove, setElementText: hostSetElementText, } = options;
    function render(vnode, container) {
        // patch
        patch(null, vnode, container, null);
    }
    // n1=> 老的
    // n2 => 新的
    function patch(n1, n2, container, parentComponent) {
        // 处理组件
        // 判断vnode 是不是一个element
        // 是element处理 element
        const { type, shapeFlag } = n2;
        // fragment => 只渲染 children
        switch (type) {
            case Fragment:
                processFragment(n1, n2, container, parentComponent);
                break;
            case Text:
                processText(n1, n2, container);
                break;
            default:
                if (shapeFlag & 1 /* ShapeFlags.ELEMENT */) {
                    processElement(n1, n2, container, parentComponent);
                }
                else if (shapeFlag & 4 /* ShapeFlags.STATEFUL_COMPONENT */) {
                    //组件 object
                    processComponent(n1, n2, container, parentComponent);
                }
                break;
        }
    }
    function processFragment(n1, n2, container, parentComponent) {
        // 渲染children
        mountChildren(n2.children, container, parentComponent);
    }
    function processText(n1, n2, container) {
        const { children } = n2;
        console.log('children', children);
        const textNode = (n2.el = document.createTextNode(children));
        console.log('textNode', textNode);
        container.append(textNode);
    }
    function processElement(n1, n2, container, parentComponent) {
        if (!n1) {
            // 初始话
            mountElement(n1, n2, container, parentComponent);
        }
        else {
            // 更新
            patchELement(n1, n2, container, parentComponent);
        }
    }
    function patchELement(n1, n2, container, parentComponent) {
        console.log('patchELement');
        console.log('n1', n1);
        console.log('n2', n2);
        const oldProps = n1.props || EMPTY_OBJ;
        const newProps = n2.props || EMPTY_OBJ;
        const el = (n2.el = n1.el);
        patchChildren(n1, n2, el, parentComponent);
        patchProps(el, oldProps, newProps);
    }
    function patchChildren(n1, n2, container, parentComponent) {
        const prevShapeFlag = n1.shapeFlag;
        const { shapeFlag } = n2;
        const c1 = n1.children;
        const c2 = n2.children;
        // 数组-> 文本
        // 判断是否是文本节点
        // 如果 n2 的 children 是 text 类型的话
        // 就看看和之前的 n1 的 children 是不是一样的
        // 如果不一样的话直接重新设置一下 text 即可
        if (shapeFlag & 8 /* ShapeFlags.TEXT_CHILDREN */) {
            // 数组-> 文本
            // taxt -> text
            if (prevShapeFlag & 16 /* ShapeFlags.ARRAY_CHILDREN */) {
                // 1.把老的清空
                unmountChildren(n1.children);
            }
            if (c2 !== c1) {
                // 2. 设置text
                hostSetElementText(container, c2);
            }
        }
        else {
            // 看看之前的是不是 text
            if (prevShapeFlag & 8 /* ShapeFlags.TEXT_CHILDREN */) {
                // 先清空
                // 然后在把新的 children 给 mount 生成 element
                hostSetElementText(container, '');
                mountChildren(c2, container, parentComponent);
            }
        }
    }
    function unmountChildren(children) {
        for (let i = 0; i < children.length; i++) {
            const el = children[i].el;
            // remove
            hostRemove(el);
        }
    }
    function patchProps(el, oldProps, newProps) {
        if (oldProps !== newProps) {
            for (const key in newProps) {
                const prevProp = oldProps[key];
                const nextProp = newProps[key];
                if (prevProp !== nextProp) {
                    hostPatchProp(el, key, prevProp, nextProp);
                }
            }
            if (oldProps !== EMPTY_OBJ) {
                for (const key in oldProps) {
                    if (!(key in newProps)) {
                        // 这里是以 oldProps 为基准来遍历，
                        // 而且得到的值是 newProps 内没有的
                        // 所以交给 host 更新的时候，把新的值设置为 null
                        hostPatchProp(el, key, oldProps[key], null);
                    }
                }
            }
        }
    }
    function mountElement(n1, n2, container, parentComponent) {
        // canvas
        // new  Element()
        // vnode =》 属于 element  -> div
        const el = (n2.el = hostCreateElememt(n2.type));
        // string array
        const { children, shapeFlag } = n2;
        if (shapeFlag & 8 /* ShapeFlags.TEXT_CHILDREN */) {
            // text_children
            el.textContent = children;
        }
        else if (shapeFlag & 16 /* ShapeFlags.ARRAY_CHILDREN */) {
            // array_children
            mountChildren(n2.children, el, parentComponent);
        }
        // props
        const { props } = n2;
        console.log(n2);
        for (const key in props) {
            console.log(key);
            const val = props[key];
            // 点击事件具体click => 通用
            // 命名规划 on+ Event name
            // const isOn = (key: string) => /^on[A-Z]/.test(key)
            // if (isOn(key)) {
            //   const event = key.slice(2).toLocaleLowerCase()
            //   el.addEventListener(event, val)
            // }else{
            //   el.setAttribute(key, val)
            // }
            hostPatchProp(el, key, null, val);
        }
        // container.append(el)
        hostInsert(el, container);
    }
    function mountChildren(children, el, parentComponent) {
        children.forEach((v) => {
            patch(null, v, el, parentComponent);
        });
    }
    function processComponent(n1, n2, container, parentComponent) {
        // 挂载组件
        mountComponent(n2, container, parentComponent);
    }
    function mountComponent(initialVNode, container, parentComponent) {
        //创建组件实例
        const instance = creatComponentInstance(initialVNode, parentComponent);
        setupComponent(instance);
        setupRenderEffect(instance, initialVNode, container);
    }
    function setupRenderEffect(instance, initialVNode, container) {
        effect(() => {
            // 第一次渲染初始化触发
            if (!instance.isMounted) {
                console.log('init-- 初始化');
                const { proxy } = instance;
                // 虚拟节点树
                const subTree = (instance.subTree = instance.render.call(proxy));
                console.log('subTree', subTree);
                // vnode -> patch
                // vnode -> element -> mounElement
                patch(null, subTree, container, instance);
                // element => mount
                // // 把 root element 赋值给 组件的vnode.el ，为后续调用 $el 的时候获取值ƒ
                initialVNode.el = subTree.el;
                instance.isMounted = true;
            }
            else {
                // 更新触发
                console.log('update');
                const { proxy } = instance;
                // 虚拟节点树
                const subTree = instance.render.call(proxy);
                const prevSubTree = instance.subTree;
                instance.subTree = subTree;
                console.log('subTree', subTree, prevSubTree);
                patch(prevSubTree, subTree, container, instance);
            }
        });
    }
    return {
        createApp: createAppAPI(render),
    };
}

function createElement(type) {
    return document.createElement(type);
}
// 设置属性
function patchProp(el, key, prevVal, nextVal) {
    const isOn = (key) => /^on[A-Z]/.test(key);
    if (isOn(key)) {
        const event = key.slice(2).toLocaleLowerCase();
        el.addEventListener(event, nextVal);
    }
    else {
        if (nextVal === undefined || nextVal === null) {
            el.removeAttribute(key);
        }
        else {
            el.setAttribute(key, nextVal);
        }
    }
}
// 插入元素
function insert(el, parent) {
    parent.append(el);
}
// 移除
function remove(child) {
    const parent = child.parentNode;
    if (parent) {
        parent.removeChild(child);
    }
}
// 设置text
function setElementText(el, text) {
    el.textContent = text;
}
const renderer = createRenderer({
    createElement,
    patchProp,
    insert,
    remove,
    setElementText
});
function createApp(...args) {
    return renderer.createApp(...args);
}

export { createApp, createRenderer, createTextVnode, getCurrentInstance, h, inject, provide, proxyRefs, ref, renderSlot };
