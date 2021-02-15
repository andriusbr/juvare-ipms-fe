import axios, { AxiosError, AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios';

import { Routes } from '../constant/Routes';
import { JWTService } from '../service/JWTService';

export const BASE_URL = process.env.REACT_APP_API_URL;
/**
 * Formed axios request
 * @param options
 * @param contentType
 */
const request = async function (options: AxiosRequestConfig, contentType = '') {
    const token = JWTService.getAccessToken();
    const header = {
        'Content-Type': contentType === '' ? 'application/json' : contentType,
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${token}`,
    };

    const client = axios.create({
        baseURL: BASE_URL,
        headers: header,
    });

    const onSuccess = function (response: AxiosResponse) {
        return response;
    };

    const onError = async function (error: AxiosError) {
        if (error.response?.status === 401) {
            window.location.href = Routes.LOGIN;
        }
        return Promise.reject(error);
    };

    return client(options).then(onSuccess).catch(onError);
};

const getRequest = function (
    path: string,
    requestParams = '',
    withCredentials = false,
): AxiosPromise {
    return request({
        url: path + requestParams,
        method: 'GET',
        withCredentials: withCredentials,
    });
};

const postRequest = function (
    path: string,
    payload: string,
    requestParams = '',
    withCredentials = false,
): AxiosPromise {
    return request({
        url: path + requestParams,
        method: 'POST',
        data: payload,
        withCredentials: withCredentials,
    });
};

const putRequest = function (
    path: string,
    payload: string,
    requestParams = '',
    withCredentials = false,
): AxiosPromise {
    return request({
        url: path + requestParams,
        method: 'PUT',
        data: payload,
        withCredentials: withCredentials,
    });
};

const deleteRequest = function (
    path: string,
    requestParams = '',
    withCredentials = false,
): AxiosPromise {
    return request({
        url: path + requestParams,
        method: 'DELETE',
        withCredentials: withCredentials,
    });
};

const RequestType = {
    deleteRequest,
    getRequest,
    postRequest,
    putRequest,
};

export default RequestType;
