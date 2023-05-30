<template>
 <section id="app" class="todoapp">
    <header class="header">
      <input
        class="new-todo"
        placeholder="What needs to be done?"
        autocomplete="off"
        autofocus
        v-model="input"
        @keyup.enter="addTodo"
        >
    </header>
    <section class="main">
      <input id="toggle-all" class="toggle-all" v-model="allDone" type="checkbox">
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        <li v-for="todo in todos" :key='todo'  :class="{ editing: todo === editingTodo, completed: todo.completed }">
          <div class="view">
            <input class="toggle" type="checkbox" >
            <label @dblclick="editTodo(todo)">{{todo.text}}</label>
            <button class="destroy" @click="remove(todo)"></button>
          </div>
          <input
            class="edit"
            type="text"
            v-editing-focus="todo == editingTodo"
            v-model="todo.text"
            @keyup.enter="doneEdit(todo)"
            @blur="doneEdit(todo)"
            @keyup.esc="cancelEdit(todo)"
            >
        </li>
      </ul>
    </section>
  
  </section>
</template>

<script >
import { ref, onUpdated, onMounted, watchEffect, reactive, computed } from 'vue'
import './assets/index.css'
  // 添加代办
const useAdd = todos => {
  const input = ref('')
  const addTodo = () => {
    const text = input.value && input.value.trim()
    if (text.length === 0) return
    todos.value.unshift({
      text,
      completed: false
    })
    input.value = ''
  }
  return {
    input,
    addTodo
  }
}

// 删除代码
const  useRemove = todos =>{
  const remove = todo =>{
    const index =  todos.value.indexOf(todo)
    todos.value.splice(index,1)
  }
  return {
    remove
  }
}

// 编辑待办
const useEdit=(todos) =>{
  let beforeEditingText = ''
  
  const editingTodo =  ref(null)

  const editTodo =  todo =>{
    beforeEditingText =  todo.text
    editingTodo.value = todo
  }

  const doneEdit = todo =>{
    if(!editingTodo.value) return
    todo.text =  todo.text.trim()
    editingTodo.value = null 
  }
  const cancelEdit =  todo=>{
    editingTodo.value = null
    todo.text =  beforeEditingText
  }
  return {
    editingTodo,
    editTodo,
    doneEdit,
    cancelEdit
  }
}

// // 切换代办完成状态
// const useFilter =  todos =>{
//   const allDone=  computed(({
//     // get()、
//   })
// }


export default {
  name: 'App',
  setup() {
    const todos = ref([])
    const {remove} =  useRemove(todos)

    const books = reactive([ref('Vue 3 Guide')])
    // 这里需要 .value
    console.log(books)

    const map = reactive(new Map([['count', ref(0)]]))
    // 这里需要 .value
    console.log(map.get('count').value)
    return {
      remove,
      todos,
      ...useAdd(todos),
      ...useEdit(remove),
    }
  },
  directives: {
    editingFocus: (el, binding) => {
      binding.value && el.focus()
    }
  }
}


</script>



