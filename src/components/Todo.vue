<template>
  <div class="todo-app">
    <h2>Todo アプリ</h2>
    <div class="add-button">
      <input v-model="newTodo" placeholder="新しい Todo" />
      <button @click="addTodo">追加</button>
    </div>
    <ul class="todo-list">
      <li v-for="(todo, index) in todos" :key="index">
        <label>
          <input type="checkbox" v-model="todo.completed" />
          <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
        </label>
        <button @click="deleteTodo(index)">削除</button>
      </li>
    </ul>
    <p>
      完了済み: {{ completedTodosCount }} / 未完了: {{ incompleteTodosCount }}
    </p>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";

export default {
  setup() {
    const newTodo = ref("");
    const todos = ref([]);

    // ローカルストレージからTodoリストを読み込む
    const loadTodos = () => {
      const savedTodos = localStorage.getItem("todos");
      if (savedTodos) {
        todos.value = JSON.parse(savedTodos);
      }
    };

    // ローカルストレージへTodoリストを保存する
    const saveTodos = () => {
      localStorage.setItem("todos", JSON.stringify(todos.value));
    };

    const addTodo = () => {
      if (newTodo.value.trim()) {
        todos.value.push({ text: newTodo.value, completed: false });
        newTodo.value = "";
        saveTodos();
      }
    };

    const deleteTodo = (index) => {
      todos.value.splice(index, 1);
      saveTodos();
    };

    // 算出プロパティ: 完了済みのタスク数
    const completedTodosCount = computed(() => {
      return todos.value.filter((todo) => todo.completed).length;
    });

    // 算出プロパティ: 未完了のタスク数
    const incompleteTodosCount = computed(() => {
      return todos.value.filter((todo) => !todo.completed).length;
    });

    // コンポーネントがマウントされたときにTodoリストを読み込む
    onMounted(() => {
      loadTodos();
    });

    return {
      newTodo,
      todos,
      addTodo,
      deleteTodo,
      completedTodosCount,
      incompleteTodosCount,
    };
  },
};
</script>

<style lang="scss" scoped>
.todo-app {
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 0 20px #f7f7f7;
}

.add-button {
  display: flex;
  gap: 20px;
}

.completed {
  text-decoration: line-through;
  color: #999;
}

.todo-list {
  list-style-type: none;
  padding-left: 0;
  li {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
