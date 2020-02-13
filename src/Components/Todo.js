import React, { useState, useRef, useCallback, useReducer } from "react";
import TodoTemplate from "./TodoTemplate";
import TodoInsert from "./TodoInsert";
import TodoList from "./TodoList";

function createBulkTodos() {
  const array = [];
  const length = 10;
  for (let i = 0; i < length; i++) {
    array.push({
      id: i,
      text: `할 일 ${i}`,
      checked: false
    });
  }
  return array;
}

function todoReducer(todos, action) {
  switch (action.type) {
    case "INSERT":
      return todos.concat(action.todo);
    case "REMOVE":
      return todos.filter(todo => todo.id !== action.id);
    case "TOGGLE":
      return todos.map(todo =>
        todo.id === action.id ? { ...todo, checked: !todo.checked } : todo
      );
    default:
      return todos;
  }
}

function Todo() {
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);

  const nextId = useRef(10);

  const onInsert = useCallback(
    text => {
      const todo = {
        id: nextId.current,
        text: text,
        checked: false
      };
      dispatch({ type: "INSERT", todo });
      nextId.current += 1;
    },
    // [todos]
    []
  );

  const onRemove = useCallback(
    id => {
      dispatch({ type: "REMOVE", id });
    },
    []
    // [todos]
  );

  const onToggle = useCallback(
    id => {
      dispatch({ type: "TOGGLE", id });
    },
    []
    // [todos]
  );

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert}></TodoInsert>
      <TodoList
        todos={todos}
        onRemove={onRemove}
        onToggle={onToggle}
      ></TodoList>
    </TodoTemplate>
  );
}

export default Todo;
