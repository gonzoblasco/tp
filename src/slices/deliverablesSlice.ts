// deliverablesSlice.ts
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchDeliverableById, fetchDeliverables, updateDeliverable} from '../api';
import {Deliverable} from '../types';

interface DeliverablesState {
  deliverables: Deliverable[];
  deliverable: Deliverable | null;
  loading: boolean;
  error: string | null | undefined;
}

const initialState: DeliverablesState = {
  deliverables: [],
  deliverable: null,
  loading: false,
  error: null,
};

export const getDeliverables = createAsyncThunk('deliverables/getDeliverables', async () => {
  return await fetchDeliverables();
});

export const getDeliverableById = createAsyncThunk('deliverables/getDeliverableById', async (id: string) => {
  return await fetchDeliverableById(id);
});

export const updateDeliverableById = createAsyncThunk('deliverables/updateDeliverableById', async ({ id, data }: {
  id: string,
  data: Deliverable
}) => {
  return await updateDeliverable(id, data);
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
      .addCase(getDeliverables.fulfilled, (state, action: PayloadAction<Deliverable[] | undefined>) => {
        state.loading = false;
        state.deliverables = action.payload ?? [];
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
        state.deliverable = action.payload ?? null;
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
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          const index = state.deliverables.findIndex(deliverable => deliverable.id === action.payload.id);
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