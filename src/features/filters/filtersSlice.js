import types from './types';
import { FILTER_STATUSES } from '../../common/redux/constants';
import { saveFiltersInLocalStorage } from './utils';
import { getLocalStorageItemByKey, LOCAL_STORAGE_KEYS } from '../../common/lib/utils/local-storage';

const storedFilters = getLocalStorageItemByKey(LOCAL_STORAGE_KEYS.FILTERS);

const initialState = {
  status: storedFilters.status ?? FILTER_STATUSES.ALL,
};

export default function filtersReducer(state = initialState, action) {
  switch (action.type) {
    case types.setStatusFilter: {
      const newFilters = {
        ...state,
        status: action.payload,
      };

      saveFiltersInLocalStorage(newFilters);

      return {
        ...state,
        status: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
