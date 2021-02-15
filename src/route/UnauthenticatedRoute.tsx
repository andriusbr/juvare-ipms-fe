import React from 'react';
import { Route, RouteProps } from 'react-router-dom';

import MainLayout from '../layout/MainLayout';

const UnauthenticatedRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
    return (
        <Route {...rest}>
            <MainLayout authenticated={false}>{children}</MainLayout>
        </Route>
    );
};

export default UnauthenticatedRoute;
