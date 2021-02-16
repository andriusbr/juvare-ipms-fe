import { ACCESS_TOKEN_COOKIE, ACCESS_TOKEN_COOKIE_EXPIRE } from '../constant/CookieConfig';

const getCookie = (cname: string): string => {
    const name = cname + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
};

const setCookie = (cname: string, cvalue: string, exminutes: number): void => {
    const d = new Date();
    d.setTime(d.getTime() + exminutes * 60 * 1000);
    const expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/;samesite=strict';
};

const getAccessToken = (): string => {
    return getCookie(ACCESS_TOKEN_COOKIE);
};

const setAccessToken = (
    cookieValue: string,
    expirationInMinutes: number = ACCESS_TOKEN_COOKIE_EXPIRE,
): void => {
    setCookie(ACCESS_TOKEN_COOKIE, cookieValue, expirationInMinutes);
};

const clearCookie = (cookieName: string): void => {
    if (getCookie(cookieName)) {
        document.cookie = cookieName + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT';
    }
};

const clearAccessToken = (): void => {
    clearCookie(ACCESS_TOKEN_COOKIE);
};

export const JWTService = {
    getAccessToken,
    setAccessToken,
    clearAccessToken,
};
