import { api } from 'api/v2';
import { AxiosResponse } from 'axios';
import { Location } from '../hooks/useClientLocations';
import { ClientDto } from '../redux/client.types';

export const ClientApi = {
    updateClient: async (userData: Partial<ClientDto>): Promise<AxiosResponse<ClientDto>> =>
        api.put('/clients/update/me', userData),

    // Update locations
    removeLocation: async (id: string): Promise<AxiosResponse<ClientDto>> =>
        api.delete(`/clients/locations/${id}`),

    updateLocation: async (
        id: string,
        locationData: Partial<Omit<Location, 'image' | 'itemsList' | 'orders'>>,
    ): Promise<AxiosResponse<Location>> => api.put(`/clients/locations/${id}`, locationData),
};
