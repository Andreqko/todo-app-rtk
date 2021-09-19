export const LOCAL_STORAGE_KEYS = {
  TODOS: 'todos',
  FILTERS: 'filters',
};

const doesLocalStorageExists = () => {
  // wrap check in try/catch, since there is no window in test env
  try {
    return 'localStorage' in window;
  } catch (e) {
    return false;
  }
};

export const getLocalStorageItemByKey = key => {
  if (!doesLocalStorageExists()) {
    return {};
  }

  const localStorageItem = localStorage.getItem(key);

  return localStorageItem ? JSON.parse(localStorageItem) : {};
};

export const setItemToLocalStorage = (key, item) => {
  if (!doesLocalStorageExists()) return;

  localStorage.setItem(key, JSON.stringify(item));
};
