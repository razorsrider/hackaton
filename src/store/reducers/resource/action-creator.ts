/* eslint-disable no-case-declarations */
import { Dispatch } from 'redux';
// import ResourceService from '@/core/api/resource-service';
// import {
//   IPresaleStats,
//   IResource,
//   IStat,
//   Item,
//   StatusItem,
// } from '@/model/resources';
// import { IResourceFormData } from '@/components/resourceForm/type';
// import {
//   openErrorNotification,
//   openSuccessNotification,
// } from '@/components/notification/notification';
// import { EntityName } from '@/pages/resource-table/columns';
// import _ from 'lodash';
import moment from 'moment';
// import { DataSet } from '@/pages/statistic/connection-statistic/connection-statistic';
// import { IGetResourceParams } from '@/core/api/resource-service-types';
import {
  ResourceAction,
  ResourceActionTypes,
  SetResourceAction,
  UpdateSummaryAfterFilterAction,
  SetFilterAction,
  ResetFilterAction,
  SetErrorAction,
  SetLoadingAction,
  SetMetaLoadingAction,
  SetEditingAction,
  DeleteResourceAction,
  SetSummaryAction,
} from './type';
import { RootState } from '..';

export const ResourceActionCreators = {
  setResource: (resource: any): SetResourceAction => ({
    type: ResourceActionTypes.SET_RESOURCE,
    payload: resource,
  }),

  setSummary: (summary: any): SetSummaryAction => ({
    type: ResourceActionTypes.SET_SUMMARY,
    payload: summary,
  }),
  updateSummaryAfterFilter: (
    statusId: number,
    total: number
  ): UpdateSummaryAfterFilterAction => ({
    type: ResourceActionTypes.UPDATE_SUMMARY_AFTER_FILTER,
    payload: { statusId, total },
  }),

  setLoading: (payload: boolean): SetLoadingAction => ({
    type: ResourceActionTypes.SET_LOADING,
    payload,
  }),
  setMetaLoading: (payload: boolean): SetMetaLoadingAction => ({
    type: ResourceActionTypes.SET_META_LOADING,
    payload,
  }),
  setEditing: (
    editing: boolean,
    editId: number | null = null
  ): SetEditingAction => ({
    type: ResourceActionTypes.SET_EDITING,
    payload: { editing, editId },
  }),

  setError: (payload: string): SetErrorAction => ({
    type: ResourceActionTypes.SET_ERROR,
    payload,
  }),
  setFilter: (key: string, value: string | number): SetFilterAction => ({
    type: ResourceActionTypes.SET_FILTER,
    payload: { key, value },
  }),
  resetFilter: (): ResetFilterAction => ({
    type: ResourceActionTypes.RESET_FILTER,
  }),

  deleteResource: (payload: number): DeleteResourceAction => ({
    type: ResourceActionTypes.DELETE_RESOURCE,
    payload,
  }),

  putResource: (
    resource: any,
    filter: any
  ) => async (
    dispatch: Dispatch<ResourceAction>
    // eslint-disable-next-line consistent-return
  ) => {
    try {

    } catch (e: any) {
      // todo: get all error from e console.dir(e);
      // dispatch(ResourceActionCreators.setError(e.message));
      // openErrorNotification('Ошибка при обновлении', e.message);
    }
  },
  fetchResource: (filter: any) => async (
    dispatch: Dispatch<ResourceAction>
  ) => {
    dispatch(ResourceActionCreators.setLoading(true));
    // try {
    //   const response = await ResourceService.getResource(filter);
    //   dispatch(ResourceActionCreators.setResource(response));
    // } catch (e: any) {
    //   dispatch(ResourceActionCreators.setError(e.message));
    //   openErrorNotification('Ошибка', e.message);
    // }
  },
  fetchResourceDebounce: (filter: any) => async (
    dispatch: Dispatch<ResourceAction>,
    getState: () => RootState
  ) => {
    dispatch(ResourceActionCreators.setLoading(true));
    try {
      // const response = await ResourceService.getResourceDebounce(filter);
      // dispatch(ResourceActionCreators.setResource(response));
      // const summary = await ResourceService.getSummary();
      // dispatch(ResourceActionCreators.setSummary(summary));
      const { statusIds } = getState().resource.filter;
      // dispatch(
      //   ResourceActionCreators.updateSummaryAfterFilter(
      //     Number(statusIds),
      //     response.total
      //   )
      // );
    } catch (e: any) {
      dispatch(ResourceActionCreators.setError(e.message));
    }
  },
  fetchMeta: () => async (dispatch: Dispatch<ResourceAction>) => {
    dispatch(ResourceActionCreators.setMetaLoading(true));
    try {
      // const meta = await ResourceService.getMeta();
      // const summary = await ResourceService.getSummary();
      // dispatch(ResourceActionCreators.setMetaSummary(meta, summary));
    } catch (e: any) {
      // openErrorNotification('Ошибка', e.message);
      dispatch(ResourceActionCreators.setError(e.message));
    }
  },
  fetchSummary: () => async (dispatch: Dispatch<ResourceAction>) => {
    try {
      // const summary = await ResourceService.getSummary();
      // dispatch(ResourceActionCreators.setSummary(summary));
      // const result: DataSet[] = [];
      const monday = moment().month('January').week(1).day(1);
      const thisYear = moment().year();
      // do {
      //   result.push({
      //     weekNumber: monday.week(),
      //     label: `${monday.format('DD.MM')} - ${monday
      //       .add(6, 'd')
      //       .format('DD.MM')}`,
      //     count: 0,
      //   });
      //   monday.add(1, 'd');
      // } while (monday.year() === thisYear);

      // summary.stat.forEach((item) => {
      //   const indexItem = result.findIndex(
      //     (week) => week.weekNumber === item.week && thisYear === item.year
      //   );
      //   if (indexItem > -1) result[indexItem].count = item.countOfConnections;
      // });
      // dispatch(ResourceActionCreators.setStat(result));
    } catch (e: any) {
      // openErrorNotification('Ошибка', e.message);
      dispatch(ResourceActionCreators.setError(e.message));
    }
  },
  fetchPresaleStats: () => async (dispatch: Dispatch<ResourceAction>) => {

  },
  putComment: (comment: string, resourceId: number) => async (
    dispatch: Dispatch<ResourceAction>
  ) => {
    const resourceDTO = { id: resourceId, managerComment: comment };

  },

  deleteUserfromTable: (resource: any) => async (
    dispatch: Dispatch<ResourceAction>
  ) => {

  },
};
