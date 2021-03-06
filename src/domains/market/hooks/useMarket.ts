import { marketActions } from 'bus/market/actions';
import { useDispatch, useSelector } from 'react-redux';

type SortingOptions = 'price-low' | 'price-high' | 'top' | null;
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
    const marketData: MarketState = useSelector((state) => state.market.toJS());

    const setMarketSortingOption = (option: SortingOptions) =>
        dispatch(marketActions.setSortingOption(option));

    return {
        ...marketData,
        setMarketSortingOption,
    };
};
