import types from './types';

const actions = {
  addTodo: ({ text, status }) => ({
    type: types.addTodo,
    payload: {
      text,
      status,
    },
  }),
  toggleTodo: todoId => ({
    type: types.toggleTodo,
    payload: todoId,
  }),
  deleteTodo: todoId => ({
    type: types.deleteTodo,
    payload: todoId,
  }),
  clearCompleted: () => ({
    type: types.clearCompleted,
    payload: {},
  }),
  swapOrder: (firstTodoId, secondTodoId) => ({
    type: types.swapOrder,
    payload: {
      firstTodoId,
      secondTodoId,
    },
  }),
};

export default actions;
