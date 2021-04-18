import { UiState } from 'bus/ui/ui.reducer';
import { useSelector } from 'react-redux';

export const useUi = () => {
    const uiState = useSelector<any, UiState>((state) => state.ui);

    return {
        ...uiState,
    };
};
