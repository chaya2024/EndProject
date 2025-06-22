import apiSlice from "../../app/apiSlice"

const bookApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        addBook: build.mutation({
            query: (book) => ({
                url: '/book',
                method: 'POST',
                body: book
            }),
            invalidatesTags: ['Book']
        }),
        getBooks: build.query({
            query: () => ({ url: "book" }),
            providesTags: ['Book']
        }),
        getBookById: build.query({
            query: (id) => `/book/id/${id}`,
            providesTags: (result, error, id) => [{ type: 'Book', id }]
        }),
        getBookByName: build.query({
            query: (name) => `/book/name/${name}`,
            providesTags: (result, error, name) => [{ type: 'Book', id: name }]
        }),
        getBookByCode: build.query({
            query: (code) => `/book/code/${code}`,
            providesTags: (result, error, code) => [{ type: 'Book', id: code }]
        }),
        getBookByCategory: build.query({
            query: (category) => `/book/category/${category}`,
            providesTags: (result, error, category) => [{ type: 'Book', id: category }]
        }),
        getBookBySubject: build.query({
            query: (subject) => `/book/subject/${subject}`,
            providesTags: (result, error, subject) => [{ type: 'Book', id: subject }]
        }),
        getBookByAuthor: build.query({
            query: (author) => `/book/author/${author}`,
            providesTags: (result, error, author) => [{ type: 'Book', id: author }]
        }),
        updateBook: build.mutation({
            query: (book) => ({
                url: '/book',
                method: 'PUT',
                body: book
            }),
            invalidatesTags: ['Book']
        }),
        deleteBook: build.mutation({
            query: (id) => ({
                url: `/book/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Book', id }]
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