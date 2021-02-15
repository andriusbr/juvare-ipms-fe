import React, { useEffect } from 'react';
import { Route, RouteProps } from 'react-router-dom';

import { Routes } from '../constant/Routes';
import MainLayout from '../layout/MainLayout';
import { JWTService } from '../service/JWTService';

const AuthenticatedRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
    useEffect(() => {
        const token = JWTService.getAccessToken();
        if (!token) {
            window.location.href = Routes.LOGIN;
        }
    }, []);

    return (
        <Route {...rest}>
            <MainLayout authenticated>{children}</MainLayout>
        </Route>
    );
};

export default AuthenticatedRoute;
