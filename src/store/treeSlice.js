import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { $authHost, $host } from "../https/index";
import axios from "axios";


//для получения всех деревьев
export const fetchTrees = createAsyncThunk('trees/fetchTrees', async () => {
    const response = await axios.get('http://localhost:8080/api/tree');
    return response.data;
});

//для создания дерева
export const createTree = createAsyncThunk('trees/createTree', async (treeData, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            for (const key in treeData) {
                formData.append(key, treeData[key]);
            }
            // Отправляем formData, так как у вас есть загрузка файлов
             const response = await axios.post('http://localhost:8080/api/tree', formData, {
                 headers: {
                     'Content-Type': 'multipart/form-data',
                 },
             });
             return response.data;
           } catch (error) {
             return rejectWithValue(error.response.data);
          }
   }
);

const treeSlice = createSlice({
    name: 'trees',
    initialState: {
        trees: [],
        loading: false,
        error: null,
        creationSuccess: false
    },
    reducers: {
        resetCreationSuccess: (state) => {
            state.creationSuccess = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTrees.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTrees.fulfilled, (state, action) => {
                state.loading = false;
                state.trees = action.payload; 
            })
            .addCase(fetchTrees.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; 
            })
          .addCase(createTree.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.creationSuccess = false;
            })
          .addCase(createTree.fulfilled, (state, action) => {
                 state.loading = false;
                 state.creationSuccess = true;
                state.trees.push(action.payload);
            })
          .addCase(createTree.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? action.payload.message : action.error.message;
                state.creationSuccess = false;
            });
    },
});

export const {resetCreationSuccess} = treeSlice.actions;
export default treeSlice.reducer;
