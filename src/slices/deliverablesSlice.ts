import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Deliverable } from '../types';

interface DeliverablesState {
  deliverables: Deliverable[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: DeliverablesState = {
  deliverables: [],
  status: 'idle',
  error: null,
};

export const fetchDeliverables = createAsyncThunk(
  'deliverables/fetchDeliverables',
  async () => {
    const response = await fetch('https://marketplace.d1.ey.com/api/use/deliverables/v1/deliverables', {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch deliverables');
    }
    const data = await response.json();
    return data.data as Deliverable[];
  }
);

const deliverablesSlice = createSlice({
  name: 'deliverables',
  initialState,
  reducers: {
    addDeliverable(state, action: PayloadAction<Deliverable>) {
      state.deliverables.push(action.payload);
    },
    updateDeliverable(state, action: PayloadAction<Deliverable>) {
      const index = state.deliverables.findIndex(del => del.id === action.payload.id);
      if (index !== -1) {
        state.deliverables[index] = action.payload;
      }
    },
    deleteDeliverable(state, action: PayloadAction<string>) {
      state.deliverables = state.deliverables.filter(del => del.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeliverables.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDeliverables.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.deliverables = action.payload;
      })
      .addCase(fetchDeliverables.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch deliverables';
      });
  },
});

export const { addDeliverable, updateDeliverable, deleteDeliverable } = deliverablesSlice.actions;
export default deliverablesSlice.reducer;