import { authActions } from 'bus/auth/actions';
import { useDispatch } from 'react-redux';

export const useAuth = () => {
    const dispatch = useDispatch();

    return {
        logoutAsync: () => dispatch(authActions.logoutAsync()),
    };
};
