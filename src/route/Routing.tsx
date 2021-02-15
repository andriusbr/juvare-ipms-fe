import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomePage from '../view/page/HomePage';
import Login from '../view/page/Login';
import { Routes } from '../constant/Routes';

const Routing: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path={Routes.HOME_PAGE} exact>
                    <HomePage />
                </Route>
                <Route path={Routes.LOGIN} exact>
                    <Login />
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

export default Routing;
