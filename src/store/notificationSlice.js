import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { $authHost } from "../https/index";
import axios from "axios";

//асинхронное действие для получения уведомлений
export const fetchNotifications = createAsyncThunk(
    'notifications/fetchNotifications',
    async () => {
        const response = await axios.get('http://localhost:8080/api/notification'); // Use $authHost for authenticated requests!
        return response.data;
    }
);

//для добавления уведомления
export const addNotification = createAsyncThunk(
    'notifications/addNotification',
    async (formData) => { //FormData
        try {
            const response = await axios.post('http://localhost:8080/api/notification', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', 
                },
            });
            return response.data;
        } catch (error) {
            
            console.error("Ошибка при добавлении уведомления:", error);
            throw error;  
        }
    }
);


const notificationSlice = createSlice({
    name: 'notifications',
    initialState: {
        notifications: [],
        loading: false,
        error: null,
    },
    reducers: {
        // Можно добавить простые редьюсеры, не требующие асинхронных запросов, тут
        // Например, для ручного добавления уведомления (не через API)
        // addNotificationLocal: (state, action) => {
        //   state.notifications.push(action.payload);
        // }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotifications.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNotifications.fulfilled, (state, action) => {
                state.loading = false;
                state.notifications = action.payload;
            })
            .addCase(fetchNotifications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Обработчики для addNotification
            .addCase(addNotification.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addNotification.fulfilled, (state, action) => {
                state.loading = false;
                state.notifications.push(action.payload);  //новое уведомление в массив
            })
            .addCase(addNotification.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error?.message || "Неизвестная ошибка"; 
            });
    },
});

//export const { addNotificationLocal } = notificationSlice.actions; // если добавили reducer addNotificationLocal
export const selectNotifications = (state) => state.notifications.notifications;
export const selectLoading = (state) => state.notifications.loading;
export const selectError = (state) => state.notifications.error;

export default notificationSlice.reducer;
