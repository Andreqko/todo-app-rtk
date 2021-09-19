import { TODO_STATUSES } from '../../common/redux/constants';
import { LOCAL_STORAGE_KEYS, setItemToLocalStorage } from '../../common/lib/utils/local-storage';

export const saveTodosInLocalStorage = todos =>
  setItemToLocalStorage(LOCAL_STORAGE_KEYS.TODOS, todos);

export const getNextOrderNumber = todos =>
  todos.reduce((maxOrder, { order }) => Math.max(order, maxOrder), 0) + 1;

export const TODO_STATUSES_TOGGLING_MAP = {
  [TODO_STATUSES.COMPLETED]: TODO_STATUSES.ACTIVE,
  [TODO_STATUSES.ACTIVE]: TODO_STATUSES.COMPLETED,
};
