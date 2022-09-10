/* eslint-disable no-case-declarations */
import { Dispatch } from 'redux';
import ResourceService from '@/core/api/resource-service';
import {
  IPresaleStats,
  IResource,
  IStat,
  Item,
  StatusItem,
} from '@/model/resources';
import { IResourceFormData } from '@/components/resourceForm/type';
import {
  openErrorNotification,
  openSuccessNotification,
} from '@/components/notification/notification';
import { EntityName } from '@/pages/resource-table/columns';
import _ from 'lodash';
import moment from 'moment';
import { DataSet } from '@/pages/statistic/connection-statistic/connection-statistic';
import { IGetResourceParams } from '@/core/api/resource-service-types';
import {
  ResourceAction,
  ResourceActionTypes,
  SetResourceAction,
  SetMetaSummaryAction,
  UpdateSummaryAction,
  DeleteFromSummaryAction,
  UpdateSummaryAfterFilterAction,
  SetFilterAction,
  ResetFilterAction,
  SetErrorAction,
  SetLoadingAction,
  SetMetaLoadingAction,
  SetEditingAction,
  UpdateResourceAction,
  DeleteResourceAction,
  SetSummaryAction,
  SetPresaleStatsAction,
  SetStatAction,
} from './type';
import { RootState } from '..';

export const ResourceActionCreators = {
  setResource: (resource: any): SetResourceAction => ({
    type: ResourceActionTypes.SET_RESOURCE,
    payload: resource,
  }),
  updateResource: (resource: IResource): UpdateResourceAction => ({
    type: ResourceActionTypes.UPDATE_RESOURCE,
    payload: resource,
  }),
  setMetaSummary: (meta: any, summary: any): SetMetaSummaryAction => ({
    type: ResourceActionTypes.SET_META_SUMMARY,
    payload: { meta, summary },
  }),

  setSummary: (summary: any): SetSummaryAction => ({
    type: ResourceActionTypes.SET_SUMMARY,
    payload: summary,
  }),

  setPresaleStats: (presaleStats: IPresaleStats[]): SetPresaleStatsAction => ({
    type: ResourceActionTypes.SET_PRESALE_STATS,
    payload: presaleStats,
  }),

  setStat: (stat: IStat[]): SetStatAction => ({
    type: ResourceActionTypes.SET_STAT,
    payload: stat,
  }),

  updateSummary: (status: StatusItem): UpdateSummaryAction => ({
    type: ResourceActionTypes.UPDATE_SUMMARY,
    payload: status,
  }),

  deleteFromSummary: (status: Item): DeleteFromSummaryAction => ({
    type: ResourceActionTypes.DELETE_FROM_SUMMARY,
    payload: status,
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
    resource: IResourceFormData,
    filter: IGetResourceParams
  ) => async (
    dispatch: Dispatch<ResourceAction>
    // eslint-disable-next-line consistent-return
  ) => {
    try {
      dispatch(ResourceActionCreators.setEditing(false));
      if (resource.id) {
        await ResourceService.updateResourceFromFormData(resource);
      } else {
        await ResourceService.addResource(resource);
      }
      const summary = await ResourceService.getSummary();
      dispatch(ResourceActionCreators.setSummary(summary));
      const response = await ResourceService.getResource(filter);
      dispatch(ResourceActionCreators.setResource(response));
      dispatch(ResourceActionCreators.setEditing(false));

      if (resource.id)
        openSuccessNotification(
          'Редактирование сотрудника',
          'Данные были успешно обновлены.'
        );
      else
        openSuccessNotification(
          'Добавление сотрудника',
          'Данные были успешно добавлены'
        );
    } catch (e: any) {
      // todo: get all error from e console.dir(e);
      // dispatch(ResourceActionCreators.setError(e.message));
      openErrorNotification('Ошибка при обновлении', e.message);
    }
  },
  fetchResource: (filter: IGetResourceParams) => async (
    dispatch: Dispatch<ResourceAction>
  ) => {
    dispatch(ResourceActionCreators.setLoading(true));
    try {
      const response = await ResourceService.getResource(filter);
      dispatch(ResourceActionCreators.setResource(response));
    } catch (e: any) {
      dispatch(ResourceActionCreators.setError(e.message));
      openErrorNotification('Ошибка', e.message);
    }
  },
  fetchResourceDebounce: (filter: IGetResourceParams) => async (
    dispatch: Dispatch<ResourceAction>,
    getState: () => RootState
  ) => {
    dispatch(ResourceActionCreators.setLoading(true));
    try {
      const response = await ResourceService.getResourceDebounce(filter);
      dispatch(ResourceActionCreators.setResource(response));
      const summary = await ResourceService.getSummary();
      dispatch(ResourceActionCreators.setSummary(summary));
      const { statusIds } = getState().resource.filter;
      dispatch(
        ResourceActionCreators.updateSummaryAfterFilter(
          Number(statusIds),
          response.total
        )
      );
    } catch (e: any) {
      dispatch(ResourceActionCreators.setError(e.message));
    }
  },
  fetchMeta: () => async (dispatch: Dispatch<ResourceAction>) => {
    dispatch(ResourceActionCreators.setMetaLoading(true));
    try {
      const meta = await ResourceService.getMeta();
      const summary = await ResourceService.getSummary();
      dispatch(ResourceActionCreators.setMetaSummary(meta, summary));
    } catch (e: any) {
      openErrorNotification('Ошибка', e.message);
      dispatch(ResourceActionCreators.setError(e.message));
    }
  },
  fetchSummary: () => async (dispatch: Dispatch<ResourceAction>) => {
    try {
      const summary = await ResourceService.getSummary();
      dispatch(ResourceActionCreators.setSummary(summary));
      const result: DataSet[] = [];
      const monday = moment().month('January').week(1).day(1);
      const thisYear = moment().year();
      do {
        result.push({
          weekNumber: monday.week(),
          label: `${monday.format('DD.MM')} - ${monday
            .add(6, 'd')
            .format('DD.MM')}`,
          count: 0,
        });
        monday.add(1, 'd');
      } while (monday.year() === thisYear);

      summary.stat.forEach((item) => {
        const indexItem = result.findIndex(
          (week) => week.weekNumber === item.week && thisYear === item.year
        );
        if (indexItem > -1) result[indexItem].count = item.countOfConnections;
      });
      dispatch(ResourceActionCreators.setStat(result));
    } catch (e: any) {
      openErrorNotification('Ошибка', e.message);
      dispatch(ResourceActionCreators.setError(e.message));
    }
  },
  fetchPresaleStats: () => async (dispatch: Dispatch<ResourceAction>) => {
    try {
      const data = await ResourceService.getPresaleStats();
      dispatch(ResourceActionCreators.setPresaleStats(data));
    } catch (e: any) {
      openErrorNotification('Ошибка', e.message);
      dispatch(ResourceActionCreators.setError(e.message));
    }
  },

  deleteProject: (
    resourceId: number,
    projectId: string,
    targetField: EntityName
  ) => async (
    dispatch: Dispatch<ResourceAction>,
    getState: () => RootState
  ) => {
    const resource: IResource = getState().resource.data.items.find(
      (item) => item.id === resourceId
    )!;

    const targetArray = resource[targetField];
    const index = targetArray.findIndex((item) => item.id === projectId);
    targetArray.splice(index, 1);

    const resourceDTO = { id: resourceId, [targetField]: targetArray };

    try {
      await ResourceService.updateResourceFromObject(resourceDTO);
    } catch (e: any) {
      dispatch(ResourceActionCreators.setError(e.message));
    }
    dispatch(ResourceActionCreators.updateResource(resource));
  },

  putProject: ({ resourceId, entity, projectId, ...rest }) => async (
    dispatch: Dispatch<ResourceAction>,
    getState: () => RootState
  ) => {
    const resource: IResource = getState().resource.data.items.find(
      (item) => item.id === resourceId
    )!;

    let targetArray: any = [...resource[entity]];
    const projectItem: { id?: string; title?: string; [x: string]: any } = {
      ...rest,
    };

    // replace date value
    if (_.has(projectItem, 'date') && !_.isEmpty(projectItem.date))
      // should be refactored for date fields
      projectItem.date = moment(projectItem.date);

    if (_.has(projectItem, 'title') && !_.isEmpty(projectItem.title))
      projectItem.title = projectItem.title?.trim();

    // workaround for inconsistent backend ( extProjectStatusId -> statusId lol)
    if (
      _.has(projectItem, 'extProjectStatusId') &&
      !_.isEmpty(projectItem.extProjectStatusId)
    )
      projectItem.statusId = projectItem.extProjectStatusId;

    if (projectId) {
      targetArray = targetArray.map((item) =>
        item.id === projectId ? projectItem : item
      );
    } else {
      targetArray.push(projectItem);
    }

    const resourceDTO = {
      id: resourceId,
      [entity]: targetArray,
    };

    try {
      await ResourceService.updateResourceFromObject(resourceDTO);
      const summary = await ResourceService.getSummary();
      dispatch(ResourceActionCreators.setSummary(summary));

      const { statusIds, sortBy } = getState().resource.filter;
      const response = await ResourceService.getResource({ statusIds, sortBy });
      dispatch(ResourceActionCreators.setResource(response));

      openSuccessNotification(
        'Редактирование запланированных проектов',
        'Данные были успешно обновлены.'
      );
    } catch (e: any) {
      // todo: get all error from e console.dir(e);
      // dispatch(ResourceActionCreators.setError(e.message));
      openErrorNotification('Ошибка при обновлении', e.message);
    }
  },
  putComment: (comment: string, resourceId: number) => async (
    dispatch: Dispatch<ResourceAction>
  ) => {
    const resourceDTO = { id: resourceId, managerComment: comment };

    try {
      const response = await ResourceService.updateResourceFromObject(
        resourceDTO
      );
      dispatch(ResourceActionCreators.updateResource(response));
    } catch (e: any) {
      dispatch(ResourceActionCreators.setError(e.message));
    }
  },

  deleteUserfromTable: (resource: IResource) => async (
    dispatch: Dispatch<ResourceAction>
  ) => {
    try {
      await ResourceService.deleteResourceById(resource.id);
      dispatch(ResourceActionCreators.deleteResource(resource.id));
      dispatch(ResourceActionCreators.deleteFromSummary(resource.status));
      openSuccessNotification(
        'Удаление сотрудника',
        'Сотрудник был успешно удален из таблицы.'
      );
    } catch (e: any) {
      openErrorNotification('Ошибка при попытке удаления', e.message);
      dispatch(ResourceActionCreators.setError(e.message));
    }
  },
};
