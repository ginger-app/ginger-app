export type AuthData =
    | {
          phoneNumber: number;
          name: string;
          companyName: string;
          email: string;
          signup: boolean;
      }
    | Record<'phoneNumber', number>;

export type AccessToken = {
    accessToken: string;
    expiresAt: string;
};

export type SigninData = {
    phoneNumber: number;
    code: string;
};

export type SignupUserData = {
    phoneNumber: number;
    companyName: string;
    email: string;
    name: string;
};

export type SignupData = { phoneNumber: number; code: string; userData: SignupUserData };
