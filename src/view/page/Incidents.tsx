import React, { useEffect, useState } from 'react';
import { Button, Grid } from '@material-ui/core';
import { AxiosError } from 'axios';

import PageWrapper from '../component/Wrapper/PageWrapper';
import { Incidents as IncidentsAPI } from '../../networking/incidentApi';
import { Routes } from '../../constant/Routes';
import EnhancedTable, { Header } from '../component/Table/EnchancedTable';
import { PagedResponse } from '../../store/paging/pagedResponse';
import { IIncident } from '../../store/incident/incident';
import { DEFAULT_TABLE_SIZE } from '../../constant/TableConfig';

const headCells: Header[] = [
    { id: 'name', label: 'Incident name' },
    { id: 'start_date', label: 'Start date' },
];

const Incidents: React.FC = () => {
    const [incidents, setIncidents] = useState<PagedResponse<IIncident>>();
    const [isLoading, setLoading] = useState<boolean>(false);

    const [pageValues, setPageValues] = useState({
        size: DEFAULT_TABLE_SIZE,
        page: 0,
        keyword: '',
        sortCol: 'name',
        sortDir: 'asc',
    });

    useEffect(() => {
        setLoading(true);
        IncidentsAPI.getIncidents(
            `?size=${pageValues.size}&page=${pageValues.page}&query=${pageValues.keyword}&sort=${pageValues.sortCol},${pageValues.sortDir}`,
        )
            .then((response) => {
                setIncidents(response.data);
                setLoading(false);
            })
            .catch((err: AxiosError<Error>) => {
                setLoading(false);
                alert(
                    err.response && err.response.data && err.response.data.message
                        ? err.response.data.message
                        : err.message,
                );
            });
    }, [pageValues]);

    const getPagedIncidents = (page: number, newKeyWord = '', sortCol = '', sortDir = '') => {
        setPageValues({
            ...pageValues,
            page: page,
            keyword: newKeyWord,
            sortCol: fixColNameForRequest(sortCol),
            sortDir: sortDir,
        });
    };

    // convert from snake to camel case
    const fixColNameForRequest = (colName: string) => {
        return colName.replace(/([-_][a-z])/g, (group) =>
            group.toUpperCase().replace('-', '').replace('_', ''),
        );
    };

    const Actions: JSX.Element = (
        <Button color="default" href={Routes.INCIDENT} variant="contained">
            New Incident
        </Button>
    );

    return (
        <Grid justify="center" container>
            <Grid md={8} sm={10} xs={12} item>
                <PageWrapper title="Incidents">
                    <EnhancedTable
                        Actions={Actions}
                        data={incidents}
                        defSortCol="name"
                        defSortDir="asc"
                        header={headCells}
                        isLoading={isLoading}
                        onPageChange={getPagedIncidents}
                    />
                </PageWrapper>
            </Grid>
        </Grid>
    );
};

export default Incidents;
