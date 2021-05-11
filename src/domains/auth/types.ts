export type AuthData = {
    phoneNumber: string;
    name: string;
    companyName: string;
    email: string;
    signup: boolean;
};

export type AccessToken = {
    accessToken: string;
    expiresAt: string;
};

export type SigninData = {
    phoneNumber: string;
    code: string;
};

export type SignupUserData = {
    phoneNumber: string;
    companyName: string;
    email: string;
    name: string;
};

export type SignupData = { phoneNumber: string; code: string; userData: SignupUserData };
