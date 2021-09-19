import { createSelector } from 'reselect';
import { FILTER_STATUSES } from '../../common/redux/constants';

const selectTodoEntities = state => state.todos.entities;
const selectTodos = createSelector(selectTodoEntities, entities => Object.values(entities));
const selectOrderedTodos = createSelector(selectTodos, todos =>
  [...todos].sort((a, b) => (a.order > b.order ? 1 : -1))
);

const selectors = {
  selectTodoEntities,
  selectOrderedTodos,
  selectFilteredTodos: createSelector(
    [state => state.filters, selectOrderedTodos],
    (filters, todos) => {
      const { status } = filters;

      if (status === FILTER_STATUSES.ALL) {
        return todos;
      }

      return todos.slice().filter(todo => todo.status === status);
    }
  ),
  selectTodoIds: createSelector(selectTodoEntities, entities => Object.keys(entities)),
  selectTodoById: (state, todoId) => selectTodoEntities(state)[todoId],
};

export default selectors;
