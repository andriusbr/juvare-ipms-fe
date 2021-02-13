import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomePage from '../view/page/HomePage';

const Routing: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact>
                    <HomePage />
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

export default Routing;
