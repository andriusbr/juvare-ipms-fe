import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import HomePage from '../view/page/HomePage';
import Login from '../view/page/Login';
import { Routes } from '../constant/Routes';
import AuthenticatedRoute from './AuthenticatedRoute';
import UnauthenticatedRoute from './UnauthenticatedRoute';

const Routing: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <AuthenticatedRoute path={Routes.HOME_PAGE} exact>
                    <HomePage />
                </AuthenticatedRoute>
                <UnauthenticatedRoute path={Routes.LOGIN} exact>
                    <Login />
                </UnauthenticatedRoute>
            </Switch>
        </BrowserRouter>
    );
};

export default Routing;
