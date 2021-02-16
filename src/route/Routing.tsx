import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import Incidents from '../view/page/Incidents';
import Login from '../view/page/Login';
import { Routes } from '../constant/Routes';
import AuthenticatedRoute from './AuthenticatedRoute';
import UnauthenticatedRoute from './UnauthenticatedRoute';
import Incident from '../view/page/Incident';

const Routing: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <AuthenticatedRoute path={Routes.INCIDENTS} exact>
                    <Incidents />
                </AuthenticatedRoute>
                <AuthenticatedRoute path={Routes.INCIDENT} exact>
                    <Incident />
                </AuthenticatedRoute>
                <UnauthenticatedRoute path={Routes.LOGIN} exact>
                    <Login />
                </UnauthenticatedRoute>
            </Switch>
        </BrowserRouter>
    );
};

export default Routing;
