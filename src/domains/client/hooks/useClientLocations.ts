import { profileActions } from 'bus/profile/profile.actions';
import { ProfileState } from 'bus/profile/profile.reducer';
import { MarketItem, Order } from 'domains/market/types';
import { useDispatch, useSelector } from 'react-redux';
import { ClientApi } from '../api';

type TempState = Record<'profile', ProfileState>;

export type Location = {
    _id: string;
    parentId: string;
    locationName: string;
    address: string;
    schedule: {
        start: string;
        end: string;
    };
    managerName: string;
    phoneNumber: string;
    image: string;
    itemsList: MarketItem[];
    orders: Order[];
};

export const useClientLocations = () => {
    const dispatch = useDispatch();
    const { locations } = useSelector<TempState, ProfileState>((state) => state.profile);

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

    const updateClientLocationAsync = async (
        id: string,
        locationData: Partial<Omit<Location, 'image' | 'itemsList' | 'orders'>>,
    ): Promise<void> => {
        try {
            const { data, status, statusText } = await ClientApi.updateLocation(id, locationData);

            if (status >= 400) throw statusText;

            dispatch(
                profileActions.fillClientLocations(
                    locations.map((item) => (item._id === id ? data : item)),
                ),
            );
        } catch (err) {
            console.log('Error updating client location');
            console.log(err);
        }
    };

    return {
        removeClientLocationAsync,
        updateClientLocationAsync,
    };
};
