import Env from "./env";

export const BASE_URL = `${Env.BACKEND_URL}/api`;
export const LOGIN_URL = `${BASE_URL}/auth/login`;
export const REGISTER_URL = `${BASE_URL}/auth/register`;
export const FORGOT_PASSWORD_URL = `${BASE_URL}/password/forget-password`;
export const RESET_PASSWORD_URL = `${BASE_URL}/password/reset-password`;
export const CHECK_CREDENTIALS_URL = `${BASE_URL}/auth/check/credentials`;

// CLASH PROJECT
export const CLASH_URL = BASE_URL + "/clash";
export const CLASH_ITEM_URL = BASE_URL + "/api/clash/items";