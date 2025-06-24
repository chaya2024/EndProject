import apiSlice from "../../app/apiSlice"

const bookNeededApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        addBookNeeded: build.mutation({
            query: (bookNeeded) => ({
                url: '/bookNeeded',
                method: 'POST',
                body: bookNeeded
            }),
            invalidatesTags: ['BookNeeded']
        }),
        getBookNeeded: build.query({
            query: () => ({ url: "/bookNeeded" }),
            providesTags: ['BookNeeded']
        }),
        getBookNeededById: build.query({
            query: (id) => `/bookNeeded/id/${id}`,
            providesTags: (result, error, id) => [{ type: 'BookNeeded', id }]
        }),
        getBookNeededByName: build.query({
            query: (name) => `/bookNeeded/name/${name}`,
            providesTags: (result, error, name) => [{ type: 'getBookNeeded', id: name }]
        }),
        getBookNeededByPrice: build.query({
            query: (minPrice, maxPrice) => `/bookNeeded/price?min=${minPrice}&max=${maxPrice}`,
            providesTags: ['BookNeeded']
        }),
        updateBookNeeded: build.mutation({
            query: (bookNeeded) => ({
                url: '/bookNeeded',
                method: 'PUT',
                body: bookNeeded
            }),
            invalidatesTags: ['BookNeeded']
        }),
        deleteBookNeeded: build.mutation({
            query: (id) => ({
                url: `/bookNeeded/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, id) => [{ type: 'BookNeeded', id }]
        })
    })
});

export const {
    useAddBookNeededMutation,
    useGetBookNeededQuery,
    useGetBookNeededByIdQuery,      
    useGetBookNeededByNameQuery,
    useGetBookNeededByPriceQuery,   
    useUpdateBookNeededMutation,
    useDeleteBookNeededMutation
} = bookNeededApiSlice;