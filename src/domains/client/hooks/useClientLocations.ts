import { profileActions } from 'bus/profile/profile.actions';
import { useDispatch } from 'react-redux';
import { ClientApi } from '../api';

export const useClientLocations = () => {
    const dispatch = useDispatch();

    const removeClientLocationAsync = async (id: string): Promise<void> => {
        try {
            const { data, status, statusText } = await ClientApi.removeLocation(id);

            if (status >= 400) throw statusText;

            dispatch(profileActions.fillClientLocations(data.locations));
        } catch (err) {
            console.log('Error removing client location');
            console.log(err);
        }
    };

    return {
        removeClientLocationAsync,
    };
};
