import { api } from 'api/v2';
import { AxiosResponse } from 'axios';
import { ClientDto } from '../redux/client.types';

export const ClientApi = {
    updateClient: async (userData: Partial<ClientDto>): Promise<AxiosResponse<ClientDto>> =>
        api.put('/clients/update/me', userData),

    removeLocation: async (id: string): Promise<AxiosResponse<ClientDto>> =>
        api.delete(`/clients/locations/${id}`),
};
