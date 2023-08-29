'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const isObject = (val) => {
    return val !== null && typeof val === 'object';
};

const publicPropertiesMap = {
    $el: (i) => i.vnode.el,
};
const PublicInstanceProxyHandlers = {
    get({ _: instance }, key) {
        // setupstate
        const { setupState } = instance;
        if (key in setupState) {
            return setupState[key];
        }
        // $el
        const publicGetter = publicPropertiesMap[key];
        if (publicGetter) {
            return publicGetter(instance);
        }
    },
};

function creatComponentInstance(vnode) {
    const component = {
        vnode,
        type: vnode.type,
        setupState: {},
    };
    return component;
}
function setupComponent(instance) {
    // initProps()
    // initSlots()
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
        const setupResult = setup();
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
    if (typeof vnode.type === 'string') {
        processElement(vnode, container);
    }
    else if (isObject(vnode.type)) {
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
    const { children } = vnode;
    if (typeof children === 'string') {
        el.textContent = children;
    }
    else if (Array.isArray(children)) {
        mountChildren(vnode, el);
    }
    // props
    const { props } = vnode;
    console.log(vnode);
    for (const key in props) {
        const val = props[key];
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
    };
    return vnode;
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

exports.createApp = createApp;
exports.h = h;
