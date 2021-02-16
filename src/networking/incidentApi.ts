import { AxiosPromise } from 'axios';

import { IIncident } from '../store/incident/incident';
import RequestType from './networkLayerCentral';

const create = (incident: IIncident): AxiosPromise<any> =>
    RequestType.postRequest('/incident', JSON.stringify(incident));

const getIncidents = (requestParams: string): AxiosPromise<any> =>
    RequestType.getRequest('/incident', requestParams);

export const Incidents = { create, getIncidents };
