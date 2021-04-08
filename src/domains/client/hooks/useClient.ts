import { ProfileState } from 'bus/profile/profile.reducer';
import { useSelector } from 'react-redux';

type TempState = Record<'profile', ProfileState>;

export const useClient = () => {
    const profile = useSelector<TempState, ProfileState>((state) => state.profile);

    return {
        ...profile,
    };
};
