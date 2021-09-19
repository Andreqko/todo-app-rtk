import { LOCAL_STORAGE_KEYS, setItemToLocalStorage } from '../../common/lib/utils/local-storage';

export const saveFiltersInLocalStorage = filters =>
  setItemToLocalStorage(LOCAL_STORAGE_KEYS.FILTERS, filters);
