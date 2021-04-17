export const authTypes = {
    AUTHENTICATE_USER: 'AUTHENTICATE_USER',
    OPEN_CODE_CONFIRMATION: 'OPEN_CODE_CONFIRMATION',
    CLOSE_CODE_CONFIRMATION: 'CLOSE_CODE_CONFIRMATION',
    LOG_OUT: 'LOG_OUT',
    SET_AUTH_DATA: 'SET_AUTH_DATA',
    SET_ACCESS_TOKEN: 'SET_ACCESS_TOKEN',
    CLEAR_ACCESS_TOKEN: 'CLEAR_ACCESS_TOKEN',

    // Async
    GET_SIGNIN_CONFIRMATION_CODE_ASYNC: 'GET_SIGNIN_CONFIRMATION_CODE_ASYNC',
    SIGNIN_ASYNC: 'SIGNIN_ASYNC',
    GET_SIGNUP_CONFIRMATION_CODE_ASYNC: 'GET_SIGNUP_CONFIRMATION_CODE_ASYNC',
    SEND_SIGNUP_DATA_ASYNC: 'SEND_SIGNUP_DATA_ASYNC',
    LOG_OUT_ASYNC: 'LOG_OUT_ASYNC',
};

type Authenticate = { type: typeof authTypes.AUTHENTICATE_USER };

type OpenCodeConfirmation = { type: typeof authTypes.OPEN_CODE_CONFIRMATION };

type CloseCodeConfirmation = { type: typeof authTypes.CLOSE_CODE_CONFIRMATION };

type Logout = { type: typeof authTypes.LOG_OUT };

export type AuthData =
    | {
          phoneNumber: number;
          name?: string;
          companyName?: string;
          email?: string;
          signup?: boolean;
      }
    | Record<'phoneNumber', number>;

type SetAuthData = {
    type: typeof authTypes.SET_AUTH_DATA;
    payload: AuthData;
};

export type AccessToken = {
    accessToken: string;
    expiresAt: string;
};

type SetAccessToken = {
    type: typeof authTypes.SET_ACCESS_TOKEN;
    payload: AccessToken;
};

type ClearAccessToken = {
    type: typeof authTypes.CLEAR_ACCESS_TOKEN;
};

type LogoutAsync = {
    type: typeof authTypes.LOG_OUT_ASYNC;
};

type GetSigninConfirmationCodeAsync = {
    type: typeof authTypes.GET_SIGNIN_CONFIRMATION_CODE_ASYNC;
    payload: number;
};

export type Signin = {
    phoneNumber: number;
    code: string;
};

type SigninAsync = {
    type: typeof authTypes.SIGNIN_ASYNC;
    payload: Signin;
};

type GetSignupConfirmationCodeAsync = {
    type: typeof authTypes.GET_SIGNUP_CONFIRMATION_CODE_ASYNC;
    payload: number;
};

export type SignupUserData = {
    phoneNumber: number;
    companyName: string;
    email: string;
    name: string;
};

export type SignupData = { phoneNumber: number; code: string; userData: SignupUserData };

type SendSignupDataAsync = {
    type: typeof authTypes.SEND_SIGNUP_DATA_ASYNC;
    payload: SignupData;
};

export type AuthActionsType =
    // Sync
    | Authenticate
    | OpenCodeConfirmation
    | CloseCodeConfirmation
    | Logout
    | SetAuthData
    | SetAccessToken
    | ClearAccessToken
    // Async
    | LogoutAsync
    | GetSigninConfirmationCodeAsync
    | SigninAsync
    | GetSignupConfirmationCodeAsync
    | SendSignupDataAsync;
