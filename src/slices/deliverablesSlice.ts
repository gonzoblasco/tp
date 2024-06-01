// deliverablesSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchDeliverables, fetchDeliverableById, updateDeliverable } from '../api';
import { Deliverable } from '../types';

interface DeliverablesState {
  deliverables: Deliverable[];
  deliverable: Deliverable | null;
  loading: boolean;
  error: string | null | undefined;  // Permitir que el error sea string, null o undefined
}

const initialState: DeliverablesState = {
  deliverables: [],
  deliverable: null,
  loading: false,
  error: null,
};

export const getDeliverables = createAsyncThunk('deliverables/getDeliverables', async () => {
  const response = await fetchDeliverables();
  return response;
});

export const getDeliverableById = createAsyncThunk('deliverables/getDeliverableById', async (id: string) => {
  const response = await fetchDeliverableById(id);
  return response;
});

export const updateDeliverableById = createAsyncThunk('deliverables/updateDeliverableById', async ({ id, data }: {
  id: string,
  data: Deliverable
}) => {
  const response = await updateDeliverable(id, data);
  return response;
});

const deliverablesSlice = createSlice({
  name: 'deliverables',
  initialState,
  reducers: {
    setDeliverables(state, action: PayloadAction<Deliverable[]>) {
      state.deliverables = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDeliverables.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDeliverables.fulfilled, (state, action: PayloadAction<Deliverable[]>) => {
        state.loading = false;
        state.deliverables = action.payload;
      })
      .addCase(getDeliverables.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getDeliverableById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDeliverableById.fulfilled, (state, action: PayloadAction<Deliverable | undefined>) => {
        state.loading = false;
        state.deliverable = action.payload ?? null;  // Manejar el caso de undefined
      })
      .addCase(getDeliverableById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateDeliverableById.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateDeliverableById.fulfilled, (state, action: PayloadAction<Deliverable | undefined>) => {
        state.loading = false;
        if (action.payload) {
          const index = state.deliverables.findIndex(deliverable => deliverable.id === action.payload?.id);
          if (index !== -1) {
            state.deliverables[index] = action.payload;
          }
        }
      })
      .addCase(updateDeliverableById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setDeliverables } = deliverablesSlice.actions;
export default deliverablesSlice.reducer;