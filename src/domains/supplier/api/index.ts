import { api } from 'api/v2';
import { AxiosResponse } from 'axios';
import { SupplierDto } from '../redux/supplier.types';

export const SupplierApi = {
    updateClient: async (userData: Partial<SupplierDto>): Promise<AxiosResponse<SupplierDto>> =>
        api.put('/suppliers/update/me', userData),
};
