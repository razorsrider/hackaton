import { ResourceAction, ResourceActionTypes } from './type';

export const DEFAULT_AVAIABILITY = 'available';
export const DEFAULT_STATUS = '1';

const initialState: any = {
  data: {
    items: [],
    total: 0,
  },
  meta: {
    levels: [],
    english: [],
    frontendTechnologies: [],
    managers: [],
    intProjects: [],
    statuses: [],
    extProjectsStatuses: [],
    generalTechnologies: [],
  },
  summary: {
    stat: [],
    count: [],
  },
  presaleStats: [],
  filter: {
    name: '',
    frontendTechnologies: '',
    generalTechnologies: '',
    levels: '',
    managerIds: '',
    english: '',
    statusIds:
      DEFAULT_STATUS,
    sortBy: '',
  },
  editing: false,
  editId: 0,

  loading: false,
  metaLoading: false,
  error: null,
};

export const resourceReducer = (
  state = initialState,
  action: ResourceAction
): any => {
  switch (action.type) {
    case ResourceActionTypes.SET_RESOURCE:
      return {
        ...state,
        loading: false,
        error: '',
        data: action.payload,
      };
    case ResourceActionTypes.SET_FILTER:
      return {
        ...state,
        filter: { ...state.filter, [action.payload.key]: action.payload.value },
      };

    case ResourceActionTypes.RESET_FILTER:
      return {
        ...state,
        filter: { ...state.filter },
      };
    case ResourceActionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    case ResourceActionTypes.SET_META_LOADING:
      return { ...state, metaLoading: action.payload };
    case ResourceActionTypes.SET_EDITING:
      return {
        ...state,
        editing: action.payload.editing,
        editId: action.payload.editId,
      };

    case ResourceActionTypes.SET_ERROR:
      return { ...state, error: action.payload, loading: false };

    case ResourceActionTypes.SET_SUMMARY:
      return {
        ...state,
        summary: action.payload,
      };

    case ResourceActionTypes.DELETE_RESOURCE:
      const newResources = state.data.items.filter(
        (elem: { id: number; }) => elem.id !== action.payload
      );
      return {
        ...state,
        data: {
          items: newResources,
          total: state.data.total,
        },
      };

    case ResourceActionTypes.UPDATE_SUMMARY_AFTER_FILTER:
      const updatedSummary = { ...state.summary };
      const updatedCount = updatedSummary.count.find(
        (obj: { status_id: number; }) => obj.status_id === action.payload.statusId
      );
      if (updatedCount) updatedCount.count = action.payload.total;
      return {
        ...state,
        summary: updatedSummary,
      };

    default:
      return state;
  }
};
