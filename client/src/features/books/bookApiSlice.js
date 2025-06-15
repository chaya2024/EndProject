import apiSlice from "../../app/apiSlice"

const bookApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        addBook: build.mutation({
            query: (book) => ({
                url: '/book',
                method: 'POST',
                body: book
            }),
            // invalidatesTags: ['Book']
        }),
        getBooks: build.query({
            query: () => ({ url: "book" }),
            // providesTags: ['Book']
        }),
        getBookById: build.query({
            query: (id) => `/book/id/${id}`,
            //  providesTags: (result, error, id) => [{ type: 'Book', id }]
        }),
        getBookByName: build.query({
            query: (name) => `/book/name/${name}`,
            //  providesTags: (result, error, id) => [{ type: 'Book', id }]
        }),
        getBookByCode: build.query({
            query: (code) => `/book/name/${code}`,
            //  providesTags: (result, error, id) => [{ type: 'Book', id }]
        }),
        getBookByCategory: build.query({
            query: (category) => `/book/category/${category}`,
            //  providesTags: (result, error, id) => [{ type: 'Book', id }]
        }),
        getBookBySubject: build.query({
            query: (subject) => `/book/subject/${subject}`,
            //  providesTags: (result, error, id) => [{ type: 'Book', id }]
        }),
        getBookByAuthor: build.query({
            query: (author) => `/book/author/${author}`,
            //  providesTags: (result, error, id) => [{ type: 'Book', id }]
        }),
        updateBook: build.mutation({
            query: ({ id, ...book }) => ({
                url: `/book`,
                method: 'PUT',
                body: book
            }),
            //  invalidatesTags: (result, error, { id }) => [{ type: 'Book', id }]
        }),
        deleteBook: build.mutation({
            query: (id) => ({
                url: `/books/${id}`,
                method: 'DELETE'
            }),
            //  invalidatesTags: (result, error, id) => [{ type: 'Book', id }]
        })

    })
});
export const {
    useAddBookMutation,
    useGetBooksQuery,
    useGetBookByIdQuery,
    useGetBookByNameQuery,
    useGetBookByCodeQuery,
    useGetBookByCategoryQuery,
    useGetBookBySubjectQuery,
    useGetBookByAuthorQuery,
    useUpdateBookMutation,
    useDeleteBookMutation,
} = bookApiSlice;
