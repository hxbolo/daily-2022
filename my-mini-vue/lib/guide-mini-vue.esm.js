function creatComponentInstance(vnode) {
    const component = {
        vnode,
        type: vnode.type,
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
    patch(vnode);
}
function patch(vnode, container) {
    // 处理组件
    // 判断vnode 是不是一个element
    // 是element处理 element
    // processElement()
    processComponent(vnode);
}
function processComponent(vnode, container) {
    // 挂载组件
    mountComponent(vnode);
}
function mountComponent(vnode, container) {
    //创建组件实例
    const instance = creatComponentInstance(vnode);
    setupComponent(instance);
    setupRenderEffect(instance);
}
function setupRenderEffect(instance, container) {
    // 虚拟节点树
    const subTree = instance.render();
    // vnode -> patch
    // vnode -> element -> mounElement
    patch(subTree);
}

function createVNode(type, props, children) {
    const vnode = {
        type,
        props,
        children,
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
            render(vnode);
        }
    };
}

function h(type, props, children) {
    return createVNode(type, props, children);
}

export { createApp, h };
