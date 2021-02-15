import React, { useState } from 'react';
import { FormikErrors, useFormik } from 'formik';
import { Alert } from '@material-ui/lab';
import { Button, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { AxiosError } from 'axios';

import { ILoginForm } from '../../store/login/loginForm';
import { Auth } from '../../networking/authApi';
import { JWTService } from '../../service/JWTService';
import { Routes } from '../../constant/Routes';
import PageWrapper from '../component/Wrapper/PageWrapper';
import CustomTextField from '../component/Input/CustomTextField';

const validate = (values: ILoginForm) => {
    const errors: FormikErrors<ILoginForm> = {};
    if (!values.username) {
        errors.username = 'Username is required';
    }
    if (!values.password) {
        errors.password = 'Password is required';
    }

    return errors;
};

const Login: React.FC = () => {
    const history = useHistory();
    const [error, setError] = useState<string>();

    const initialValues: ILoginForm = {
        username: '',
        password: '',
    };

    const submitLoginForm = (values: ILoginForm) => {
        Auth.login(values)
            .then((response) => {
                JWTService.setAccessToken(
                    response.data.access_token,
                    response.data.expiration_in_minutes,
                );
                history.replace(Routes.HOME_PAGE);
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
        onSubmit: submitLoginForm,
    });

    return (
        <Grid justify="center" container>
            <Grid md={4} sm={8} xs={12} item>
                <PageWrapper title="Login">
                    <form id="loginForm" onSubmit={formik.handleSubmit}>
                        {error && (
                            <div className="row">
                                <Alert severity="error">{error}</Alert>
                            </div>
                        )}
                        <div className="row">
                            <CustomTextField
                                error={!!formik.errors.username}
                                helperText={formik.errors.username}
                                id="username"
                                label="Username"
                                name="username"
                                value={
                                    formik.values.username
                                        ? formik.values.username
                                        : initialValues.username
                                }
                                variant="outlined"
                                onChange={formik.handleChange}
                            />
                        </div>

                        <div className="row">
                            <CustomTextField
                                error={!!formik.errors.password}
                                helperText={formik.errors.password}
                                id="password"
                                label="Password"
                                name="password"
                                type="password"
                                value={
                                    formik.values.password
                                        ? formik.values.password
                                        : initialValues.password
                                }
                                variant="outlined"
                                onChange={formik.handleChange}
                            />
                        </div>

                        <Grid justify="center" container>
                            <Button
                                color="default"
                                form="loginForm"
                                type="submit"
                                variant="contained"
                            >
                                Login
                            </Button>
                        </Grid>
                    </form>
                </PageWrapper>
            </Grid>
        </Grid>
    );
};

export default Login;
