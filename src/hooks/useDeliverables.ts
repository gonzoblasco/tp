import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getDeliverables } from '../slices/deliverablesSlice';

export const useDeliverables = () => {
  const dispatch = useAppDispatch();
  const deliverables = useAppSelector(state => state.deliverables.deliverables);
  const loading = useAppSelector(state => state.deliverables.loading);
  const error = useAppSelector(state => state.deliverables.error);

  useEffect(() => {
    dispatch(getDeliverables());
  }, [dispatch]);

  return { deliverables, loading, error };
};