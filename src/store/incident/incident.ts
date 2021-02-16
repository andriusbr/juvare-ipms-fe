import { PagedResponse } from '../paging/pagedResponse';

export interface IIncident {
    name: string;
    start_date: string;
}

export interface IIncidentList {
    incidents: PagedResponse<IIncident>;
}
