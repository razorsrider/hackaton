/* eslint-disable no-case-declarations */
/* eslint-disable prettier/prettier */
import * as Constants from '@/constants';
import { getId } from '@/routes';
import { ResourceAction, ResourceActionTypes, ResourceState } from './type';

export const DEFAULT_AVAIABILITY = 'available';
export const DEFAULT_STATUS = '1';

const initialState: ResourceState = {
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
      getId(window.location.pathname.slice(1).replace(/\/+$/, '')) ||
      DEFAULT_STATUS,
    sortBy: Constants.DEFAULT_SORT,
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
): ResourceState => {
  switch (action.type) {
    case ResourceActionTypes.SET_RESOURCE:
      return {
        ...state,
        loading: false,
        error: '',
        data: action.payload,
      };
    case ResourceActionTypes.UPDATE_RESOURCE:
      if (Number(state.filter.statusIds) === action.payload.status.id) {
        const newData = state.data.items;
        const resourceIndex = newData.findIndex(
          (obj) => obj.id === action.payload.id
        );
        if (resourceIndex > -1) newData[resourceIndex] = action.payload;
        else newData.push(action.payload);
        return {
          ...state,
          data: {
            items: newData,
            total: state.data.total,
          },
          loading: false,
        };
      }
      return state;
    case ResourceActionTypes.SET_FILTER:
      return {
        ...state,
        filter: { ...state.filter, [action.payload.key]: action.payload.value },
      };

    case ResourceActionTypes.RESET_FILTER:
      return {
        ...state,
        filter: { ...state.filter, ...Constants.RESET_FILTER },
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

    case ResourceActionTypes.SET_META_SUMMARY:
      return {
        ...state,
        metaLoading: false,
        error: '',
        meta: action.payload.meta,
        summary: action.payload.summary,
      };
    case ResourceActionTypes.SET_SUMMARY:
      return {
        ...state,
        summary: action.payload,
      };

    case ResourceActionTypes.SET_STAT:
      return {
        ...state,
        summary: {
          count: state.summary.count,
          stat: action.payload,
        },
      };

    case ResourceActionTypes.SET_PRESALE_STATS:
      return {
        ...state,
        presaleStats: action.payload,
      };

    case ResourceActionTypes.UPDATE_SUMMARY:
      const newSummary = state.summary;
      const summaryIndex = newSummary.count.findIndex(
        (obj) => obj.status_id === action.payload.id
      );
      if (summaryIndex > -1)
        newSummary.count[summaryIndex].count =
          Number(newSummary[summaryIndex].count) + 1;
      else
        newSummary.count.push({
          status_id: action.payload.id,
          status_name: action.payload.name,
          count: 1,
        });
      return {
        ...state,
        summary: newSummary,
      };

    case ResourceActionTypes.DELETE_FROM_SUMMARY:
      const modifiedSummary = state.summary;
      const index = modifiedSummary.count.findIndex(
        (obj) => obj.status_id === action.payload.id
      );
      if (modifiedSummary.count[index].count > 0)
        modifiedSummary.count[index].count =
          Number(modifiedSummary.count[index].count) - 1;
      else
        modifiedSummary.count.filter(
          (el) => el.status_id === action.payload.id
        );
      return {
        ...state,
        summary: modifiedSummary,
      };

    case ResourceActionTypes.DELETE_RESOURCE:
      const newResources = state.data.items.filter(
        (elem) => elem.id !== action.payload
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
        (obj) => obj.status_id === action.payload.statusId
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
