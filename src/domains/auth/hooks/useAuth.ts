import { authActions } from 'bus/auth/auth.actions';
import { useDispatch, useSelector } from 'react-redux';

type AuthState = Record<'isAuthenticated', boolean>;
type TempState = Record<'auth', AuthState>;

export const useAuth = () => {
    const dispatch = useDispatch();

    const authState = useSelector<TempState, AuthState>((state) => state.auth);

    return {
        ...authState,
        logoutAsync: () => dispatch(authActions.logoutAsync()),
    };
};
