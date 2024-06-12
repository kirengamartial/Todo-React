import { apiSlice } from "../apiSlice";
const BASE_URL = "/todo"

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTodo: builder.query({
            query: () => ({
                url: `${BASE_URL}`,
                method: 'GET'
            })
        }),
        createTodo: builder.mutation({
            query: (data) => ({
                url: `${BASE_URL}/create`,
                method: 'POST',
                body: data
            })
        }),
        editTodo: builder.mutation({
            query: (data) => ({
                url: `${BASE_URL}/edit/${data.id}`,
                method: 'PUT',
                body: data
            })
        }), 
        deleteTodo: builder.mutation({
            query: (id) => ({
                url: `${BASE_URL}/delete/${id}`,
                method: 'DELETE'
            })
        })
    })
})

export const {useGetTodoQuery, useCreateTodoMutation, useEditTodoMutation, useDeleteTodoMutation} = userApiSlice