import React from 'react';
import { Button, Grid } from '@material-ui/core';

import PageWrapper from '../component/Wrapper/PageWrapper';
import { Routes } from '../../constant/Routes';

const Incidents: React.FC = () => {
    return (
        <Grid justify="center" container>
            <Grid md={8} sm={10} xs={12} item>
                <PageWrapper title="Incidents">
                    <Button color="default" href={Routes.INCIDENT} variant="contained">
                        New Incident
                    </Button>
                </PageWrapper>
            </Grid>
        </Grid>
    );
};

export default Incidents;
