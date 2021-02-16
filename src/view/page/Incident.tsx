import React, { useState } from 'react';
import { FormikErrors, useFormik } from 'formik';
import { Alert } from '@material-ui/lab';
import { Box, Button, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { AxiosError } from 'axios';

import { Incidents } from '../../networking/incidentApi';
import { Routes } from '../../constant/Routes';
import PageWrapper from '../component/Wrapper/PageWrapper';
import CustomTextField from '../component/Input/CustomTextField';
import { IIncident } from '../../store/incident/incident';

const validate = (values: IIncident) => {
    const errors: FormikErrors<IIncident> = {};
    if (!values.name) {
        errors.name = 'Incident name is required';
    }
    if (!values.start_date) {
        errors.start_date = 'Start date is required';
    } else {
        const currDate = new Date();
        currDate.setHours(23, 59, 59);
        if (new Date(values.start_date) > currDate) {
            errors.start_date = 'Start date cannot be greater than the current date';
        }
    }

    return errors;
};

const Incident: React.FC = () => {
    const history = useHistory();
    const [error, setError] = useState<string>();

    const initialValues: IIncident = {
        name: '',
        start_date: '',
    };

    const submitIncidentForm = (values: IIncident) => {
        Incidents.create(values)
            .then(() => {
                history.push(Routes.INCIDENTS);
            })
            .catch((err: AxiosError<Error>) => {
                setError(
                    err.response && err.response.data && err.response.data.message
                        ? err.response.data.message
                        : err.message,
                );
            });
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        validateOnChange: false,
        validate,
        onSubmit: submitIncidentForm,
    });

    return (
        <Grid justify="center" container>
            <Grid md={4} sm={8} xs={12} item>
                <PageWrapper title="New Incident">
                    <form id="incidentForm" onSubmit={formik.handleSubmit}>
                        {error && (
                            <div className="row">
                                <Alert severity="error">{error}</Alert>
                            </div>
                        )}
                        <div className="row">
                            <CustomTextField
                                error={!!formik.errors.name}
                                helperText={formik.errors.name}
                                id="name"
                                label="Incident name"
                                name="name"
                                value={formik.values.name ? formik.values.name : initialValues.name}
                                variant="outlined"
                                onChange={formik.handleChange}
                            />
                        </div>

                        <div className="row">
                            <CustomTextField
                                error={!!formik.errors.start_date}
                                helperText={formik.errors.start_date}
                                id="start_date"
                                label="Start date"
                                name="start_date"
                                type="date"
                                value={
                                    formik.values.start_date
                                        ? formik.values.start_date
                                        : initialValues.start_date
                                }
                                variant="outlined"
                                onChange={formik.handleChange}
                            />
                        </div>

                        <Grid justify="center" container>
                            <Box mx={1}>
                                <Button
                                    color="primary"
                                    form="incidentForm"
                                    type="submit"
                                    variant="contained"
                                >
                                    Create
                                </Button>
                            </Box>
                            <Box mx={1}>
                                <Button color="default" href={Routes.INCIDENTS} variant="contained">
                                    Cancel
                                </Button>
                            </Box>
                        </Grid>
                    </form>
                </PageWrapper>
            </Grid>
        </Grid>
    );
};

export default Incident;
