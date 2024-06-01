import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {fetchDeliverables, fetchDeliverableById, updateDeliverable} from '../api';

interface Deliverable {
  id: string;
  name: string;
  actualName: string;
  clientName: string;
  clientNumber: string;
  statusId: string;
  endDate: string;
}

interface DeliverablesState {
  deliverables: Deliverable[];
  deliverable: Deliverable | null;
  loading: boolean;
  error: string | null;
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

export const updateDeliverableById = createAsyncThunk('deliverables/updateDeliverableById', async ({id, data}: {
  id: string,
  data: Deliverable
}) => {
  const response = await updateDeliverable(id, data);
  return response;
});

const deliverablesSlice = createSlice({
  name: 'deliverables',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDeliverables.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDeliverables.fulfilled, (state, action) => {
        state.loading = false;
        state.deliverables = action.payload;
      })
      .addCase(getDeliverables.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch deliverables';
      })
      .addCase(getDeliverableById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDeliverableById.fulfilled, (state, action) => {
        state.loading = false;
        state.deliverable = action.payload;
      })
      .addCase(getDeliverableById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch deliverable';
      })
      .addCase(updateDeliverableById.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateDeliverableById.fulfilled, (state, action) => {
        state.loading = false;
        const updatedDeliverable = action.payload;
        state.deliverables = state.deliverables.map(deliverable =>
          deliverable.id === updatedDeliverable.id ? updatedDeliverable : deliverable
        );
        state.deliverable = updatedDeliverable;
      })
      .addCase(updateDeliverableById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update deliverable';
      });
  },
});

export default deliverablesSlice.reducer;