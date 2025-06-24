import apiSlice from "../../app/apiSlice"

const messageApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        addMessage: build.mutation({
            query: (message) => ({
                url: '/message',
                method: 'POST',
                body: message
            }),
            invalidatesTags: ['Message']
        }),
        getMessage: build.query({
            query: () => ({ url: "/message" }),
            providesTags: ['Message']
        }),
        getMessageById: build.query({
            query: (id) => `/message/id/${id}`,
            providesTags: (result, error, id) => [{ type: 'Message', id }]
        }),
        getmessageBySubject: build.query({
            query: (subject) => `/message/subject/${subject}`,
            providesTags: (result, error, subject) => [{ type: 'Message', id: subject }]
        }),
        deleteMessage: build.mutation({
            query: (id) => ({
                url: `/message/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Message', id }]
        })
    })
});

export const {
    useAddMessageMutation,
    useGetMessageQuery,
    useGetMessageByIdQuery,
    useGetmessageBySubjectQuery,
    useDeleteMessageMutation
} = messageApiSlice;