import { useSelector } from 'react-redux';

type UiState = {
    [key: string]: any;
    isFetching: boolean;
    cartIsOpened: boolean;
    searchOpened: boolean;
    marketFiltersOverlay: boolean;
    ordersFiltersOverlay: boolean;
    codeConfirmationOverlay: boolean;
    signupOverlay: boolean;
    loginOverlay: boolean;
    newLocationOverlay: boolean;
    newListItemOverlay: boolean;
    supplierUploadOverlay: boolean;
    cartIconVisible: boolean;
    orderPlacedSuccesfully: boolean;
    orderPlacementError: boolean;
    supplierUploadPreviewOverlay: boolean;
    orderCombinationsOverlay: boolean;

    backButtonPath: string | null;
    newListItemOverlayData: {
        name: string;
        category: string;
        unit: string;
        price: string;
        amount: string;
        img: string;
        id: string;
    };
    orderCombinations: any[];
    clientListsSelectedLocation: string | null;
    deliveryDate: Record<string, any>;
    logs: string;
};

export const useUi = () => {
    // @ts-ignore
    const uiState: UiState = useSelector((state) => state.ui.toJS());

    // const checkIfOverlayIsOpened = () => {
    //     const overlayKeys = [
    //         'cartIsOpened',
    //         'searchOpened',
    //         'marketFiltersOverlay',
    //         'ordersFiltersOverlay',
    //         'codeConfirmationOverlay',
    //         'signupOverlay',
    //         'loginOverlay',
    //         'newLocationOverlay',
    //         'newListItemOverlay',
    //         'supplierUploadOverlay',
    //         'orderPlacedSuccesfully',
    //         'orderPlacementError',
    //         'supplierUploadPreviewOverlay',
    //         'orderCombinationsOverlay',
    //     ];

    //     console.log(overlayKeys.map((key) => uiState[key]));

    //     return overlayKeys.some((key) => Boolean(uiState[key]));
    // };

    return {
        ...uiState,
    };
};
