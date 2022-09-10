import {
  Item,
  IResource,
  StatusItem,
  ProjectStatusItem,
  ICount,
  IStat,
  IItemsResource,
  IPresaleStats,
} from '@/model/resources';

export interface ResourceState {
  data: IItemsResource;
  meta: {
    levels: string[];
    english: string[];
    frontendTechnologies: string[];
    managers: Item[];
    intProjects: Item[];
    statuses: StatusItem[];
    extProjectsStatuses: ProjectStatusItem[];
    generalTechnologies: string[];
  };
  summary: {
    stat: IStat[];
    count: ICount[];
  };
  filter: {
    name: string;
    levels: string;
    frontendTechnologies: string;
    generalTechnologies: string;
    managerIds: string;
    english: string;
    statusIds: string;
    sortBy: string;
  };
  presaleStats: IPresaleStats[];
  editing: boolean;
  editId: number | null;

  loading: boolean;
  metaLoading: boolean;
  error: null | string;
}

export enum ResourceActionTypes {
  SET_RESOURCE = 'SET_RESOURCE',
  UPDATE_RESOURCE = 'UPDATE_RESOURCE',
  SET_META_SUMMARY = 'SET_META_SUMMARY',
  SET_SUMMARY = 'SET_SUMMARY',
  SET_STAT = 'SET_STAT',
  SET_FILTER = 'SET_FILTER',
  RESET_FILTER = 'RESET_FILTER',
  SET_LOADING = 'SET_LOADING',
  SET_META_LOADING = 'SET_META_LOADING',
  SET_EDITING = 'SET_EDITING',
  SET_ADD_PROJECT_MODE = 'SET_ADD_PROJECT_MODE',
  SET_FORM_MODE = 'SET_FORM_MODE',
  SET_ERROR = 'SET_ERROR',
  DELETE_RESOURCE = 'DELETE_RESOURCE',
  UPDATE_SUMMARY = 'UPDATE_SUMMARY',
  DELETE_FROM_SUMMARY = 'DELETE_FROM_SUMMARY',
  UPDATE_SUMMARY_AFTER_FILTER = 'UPDATE_SUMMARY_AFTER_FILTER',
  SET_PRESALE_STATS = 'SET_PRESALE_STATS',
}

export interface SetResourceAction {
  type: ResourceActionTypes.SET_RESOURCE;
  payload: {
    items: [];
    total: number;
  };
}
export interface UpdateResourceAction {
  type: ResourceActionTypes.UPDATE_RESOURCE;
  payload: IResource;
}
export interface SetMetaSummaryAction {
  type: ResourceActionTypes.SET_META_SUMMARY;
  payload: {
    meta: {
      levels: string[];
      english: string[];
      frontendTechnologies: string[];
      statuses: StatusItem[];
      managers: Item[];
      intProjects: Item[];
      extProjectsStatuses: ProjectStatusItem[];
      generalTechnologies: string[];
    };
    summary: any;
  };
}
export interface SetSummaryAction {
  type: ResourceActionTypes.SET_SUMMARY;
  payload: any;
}

export interface SetPresaleStatsAction {
  type: ResourceActionTypes.SET_PRESALE_STATS;
  payload: IPresaleStats[];
}
export interface SetStatAction {
  type: ResourceActionTypes.SET_STAT;
  payload: IStat[];
}

export interface UpdateSummaryAction {
  type: ResourceActionTypes.UPDATE_SUMMARY;
  payload: StatusItem;
}
export interface DeleteFromSummaryAction {
  type: ResourceActionTypes.DELETE_FROM_SUMMARY;
  payload: Item;
}
export interface SetFilterAction {
  type: ResourceActionTypes.SET_FILTER;
  payload: { key: string; value: string | number };
}

export interface ResetFilterAction {
  type: ResourceActionTypes.RESET_FILTER;
}
export interface SetLoadingAction {
  type: ResourceActionTypes.SET_LOADING;
  payload: boolean;
}

export interface SetMetaLoadingAction {
  type: ResourceActionTypes.SET_META_LOADING;
  payload: boolean;
}

export interface SetEditingAction {
  type: ResourceActionTypes.SET_EDITING;
  payload: { editing: boolean; editId: number | null };
}

export interface SetErrorAction {
  type: ResourceActionTypes.SET_ERROR;
  payload: string;
}
export interface DeleteResourceAction {
  type: ResourceActionTypes.DELETE_RESOURCE;
  payload: number;
}

export interface UpdateSummaryAfterFilterAction {
  type: ResourceActionTypes.UPDATE_SUMMARY_AFTER_FILTER;
  payload: { statusId: number; total: number };
}

export type ResourceAction =
  | SetResourceAction
  | UpdateResourceAction
  | SetMetaSummaryAction
  | SetSummaryAction
  | SetStatAction
  | UpdateSummaryAction
  | DeleteFromSummaryAction
  | SetLoadingAction
  | SetMetaLoadingAction
  | SetEditingAction
  | SetErrorAction
  | SetFilterAction
  | ResetFilterAction
  | DeleteResourceAction
  | UpdateSummaryAfterFilterAction
  | SetPresaleStatsAction;
