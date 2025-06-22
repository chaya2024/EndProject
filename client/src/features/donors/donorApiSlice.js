import apiSlice from "../../app/apiSlice"

const donorApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        addDonor: build.mutation({
            query: (donor) => ({
                url: '/donor',
                method: 'POST',
                body: donor
            }),
            invalidatesTags: ['Donor']
        }),
        getDonors: build.query({
            query: () => ({ url: "/donor" }),
            providesTags: ['Donor']
        }),
        getDonorById: build.query({
            query: (id) => `/donor/id/${id}`,
            providesTags: (result, error, id) => [{ type: 'Donor', id }]
        }),
        getDonorByName: build.query({
            query: (name) => `/donor/name/${name}`,
            providesTags: (result, error, name) => [{ type: 'Donor', id: name }]
        }),
        updateDonor: build.mutation({
            query: (donor) => ({
                url: '/donor',
                method: 'PUT',
                body: donor
            }),
            invalidatesTags: ['Donor']
        }),
        deleteDonor: build.mutation({
            query: (id) => ({
                url: `/donor/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Donor', id }]
        })
    })
});

export const {
    useAddDonorMutation,
    useGetDonorsQuery,
    useGetDonorByIdQuery,
    useGetDonorByNameQuery,
    useUpdateDonorMutation,
    useDeleteDonorMutation,
} = donorApiSlice;