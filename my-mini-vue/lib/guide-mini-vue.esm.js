const extend = Object.assign;
const isObject = (val) => {
    return val !== null && typeof val === 'object';
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

// 收集依赖
const targetMap = new Map();
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

function creatComponentInstance(vnode) {
    const component = {
        vnode,
        type: vnode.type,
        setupState: {},
        props: {},
        slots: {},
        emit: () => { }
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
        const setupResult = setup(shallowReadonly(instance.props), { emit: instance.emit });
        handleSetupResult(instance, setupResult);
    }
}
function handleSetupResult(instance, setupResult) {
    // function  obj
    // object
    if (typeof setupResult === 'object') {
        instance.setupState = setupResult;
    }
    // 保证组件render有值
    finishComponentSetup(instance);
}
// 保证组件render有值  设置render
function finishComponentSetup(instance) {
    const Component = instance.type;
    instance.render = Component.render;
}

function render(vnode, container) {
    // patch
    patch(vnode, container);
}
function patch(vnode, container) {
    // 处理组件
    // 判断vnode 是不是一个element
    // 是element处理 element
    const { shapeFlag } = vnode;
    if (shapeFlag & 1 /* ShapeFlags.ELEMENT */) {
        processElement(vnode, container);
    }
    else if (shapeFlag & 4 /* ShapeFlags.STATEFUL_COMPONENT */) {
        //组件 object
        processComponent(vnode, container);
    }
}
function processElement(vnode, container) {
    // 初始话
    mountElement(vnode, container);
    // 更新
}
function mountElement(vnode, container) {
    // vnode =》 属于 element  -> div
    const el = (vnode.el = document.createElement(vnode.type));
    // string array
    const { children, shapeFlag } = vnode;
    if (shapeFlag & 8 /* ShapeFlags.TEXT_CHILDREN */) {
        // text_children
        el.textContent = children;
    }
    else if (shapeFlag & 16 /* ShapeFlags.ARRAY_CHILDREN */) {
        // array_children
        mountChildren(vnode, el);
    }
    // props
    const { props } = vnode;
    console.log(vnode);
    for (const key in props) {
        console.log(key);
        const val = props[key];
        // 点击事件具体click => 通用
        // 命名规划 on+ Event name
        const isOn = (key) => /^on[A-Z]/.test(key);
        if (isOn(key)) {
            const event = key.slice(2).toLocaleLowerCase();
            el.addEventListener(event, val);
        }
        el.setAttribute(key, val);
    }
    container.append(el);
}
function mountChildren(vnode, el) {
    vnode.children.forEach((v) => {
        patch(v, el);
    });
}
function processComponent(vnode, container) {
    // 挂载组件
    mountComponent(vnode, container);
}
function mountComponent(initialVNode, container) {
    //创建组件实例
    const instance = creatComponentInstance(initialVNode);
    setupComponent(instance);
    setupRenderEffect(instance, initialVNode, container);
}
function setupRenderEffect(instance, initialVNode, container) {
    const { proxy } = instance;
    // 虚拟节点树
    const subTree = instance.render.call(proxy);
    // vnode -> patch
    // vnode -> element -> mounElement
    patch(subTree, container);
    // element => mount
    // // 把 root element 赋值给 组件的vnode.el ，为后续调用 $el 的时候获取值ƒ
    initialVNode.el = subTree.el;
}

function createVNode(type, props, children) {
    const vnode = {
        type,
        props,
        children,
        el: null,
        shapeFlag: getShapFlag(type)
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
function getShapFlag(type) {
    return typeof type === 'string' ? 1 /* ShapeFlags.ELEMENT */ : 4 /* ShapeFlags.STATEFUL_COMPONENT */;
}

function createApp(rootComponent) {
    return {
        mount(rootContainer) {
            // 先 vnode
            // componet -> vnode
            // 所有的逻辑都会基于虚拟节点 做处理
            const vnode = createVNode(rootComponent);
            render(vnode, rootContainer);
        }
    };
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
            return createVNode('div', {}, slot(props));
        }
    }
}

export { createApp, h, renderSlot };
