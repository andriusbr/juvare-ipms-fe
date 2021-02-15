import { AxiosPromise } from 'axios';

import { ILoginForm } from '../store/login/loginForm';
import RequestType from './networkLayerCentral';

const login = (loginForm: ILoginForm): AxiosPromise<any> =>
    RequestType.postRequest('/auth', JSON.stringify(loginForm));

export const Auth = { login };
