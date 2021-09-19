import { LOADING_STATUS } from '../../api/constants';
import types from './types';
import { getNextOrderNumber, saveTodosInLocalStorage, TODO_STATUSES_TOGGLING_MAP } from './utils';
import generateRandomId from '../../common/lib/utils/generate-random-id';
import { TODO_STATUSES } from '../../common/redux/constants';
import { getLocalStorageItemByKey, LOCAL_STORAGE_KEYS } from '../../common/lib/utils/local-storage';

const initialState = {
  loadingStatus: LOADING_STATUS.IDLE,
  entities: getLocalStorageItemByKey(LOCAL_STORAGE_KEYS.TODOS),
};

export default function todosReducer(state = initialState, action) {
  const { entities } = state;

  switch (action.type) {
    case types.addTodo: {
      const todo = action.payload;
      const todoId = generateRandomId();
      const todos = Object.values(entities);
      const order = getNextOrderNumber(todos);

      const updatedEntities = {
        ...entities,
        [todoId]: {
          id: todoId,
          text: todo.text,
          status: todo.status ?? TODO_STATUSES.ACTIVE,
          order,
        },
      };

      saveTodosInLocalStorage(updatedEntities);

      return {
        ...state,
        entities: updatedEntities,
      };
    }
    case types.toggleTodo: {
      const todoId = action.payload;
      const todo = entities[todoId];
      const updatedEntities = {
        ...entities,
        [todoId]: { ...todo, status: TODO_STATUSES_TOGGLING_MAP[todo.status] },
      };

      saveTodosInLocalStorage(updatedEntities);

      return {
        ...state,
        entities: updatedEntities,
      };
    }
    case types.deleteTodo: {
      const todoId = action.payload;
      const updatedEntities = { ...entities };

      delete updatedEntities[todoId];

      saveTodosInLocalStorage(updatedEntities);

      return {
        ...state,
        entities: updatedEntities,
      };
    }
    case types.clearCompleted: {
      const updatedEntities = Object.entries(entities).reduce((acc, [id, todo]) => {
        acc[id] = { ...todo, status: TODO_STATUSES.ACTIVE };

        return acc;
      }, {});

      saveTodosInLocalStorage(updatedEntities);

      return {
        ...state,
        entities: updatedEntities,
      };
    }
    case types.swapOrder: {
      const { firstTodoId, secondTodoId } = action.payload;

      if (!firstTodoId || !secondTodoId) return state;

      const firstTodo = entities[firstTodoId];
      const secondTodo = entities[secondTodoId];
      const updatedEntities = { ...entities };

      updatedEntities[firstTodo.id] = { ...firstTodo, order: secondTodo.order };
      updatedEntities[secondTodo.id] = { ...secondTodo, order: firstTodo.order };

      saveTodosInLocalStorage(updatedEntities);

      return {
        ...state,
        entities: updatedEntities,
      };
    }
    default: {
      return state;
    }
  }
}
