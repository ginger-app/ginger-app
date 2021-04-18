import { marketActions } from 'bus/market/market.actions';
import { useDispatch, useSelector } from 'react-redux';

export type SortingOptions = 'price-low' | 'price-high' | 'top' | null;
type MarketState = {
    categories: any[];
    categoryData: Record<string, any>;
    subcategoryData: Record<string, any>;
    productData: Record<string, any>;
    orderData: Record<string, any>;
    searchResults: any[];
    sortingOption: SortingOptions;
};

export const useMarket = () => {
    const dispatch = useDispatch();

    // @ts-ignore
    const marketData: MarketState = useSelector((state) => state.market);

    const setMarketSortingOption = (option: SortingOptions) =>
        dispatch(marketActions.setSortingOption(option));

    return {
        ...marketData,
        setMarketSortingOption,
    };
};
