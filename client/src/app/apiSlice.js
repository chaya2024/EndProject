import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:1234"
    }),
    tagTypes: ['Book', 'Donor', 'Message', 'BookNeeded'],
    endpoints: () => ({})
})

export default apiSlice;