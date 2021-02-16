import { AxiosPromise } from 'axios';

import { IIncident } from '../store/incident/incident';
import RequestType from './networkLayerCentral';

const create = (incident: IIncident): AxiosPromise<any> =>
    RequestType.postRequest('/incident', JSON.stringify(incident));

export const Incidents = { create };
