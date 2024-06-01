// useDeliverables.ts
import { useQuery } from 'react-query';
import { fetchDeliverables } from '../api';
import { Deliverable } from '../types';

const useDeliverables = () => {
  return useQuery<Deliverable[], Error>('deliverables', fetchDeliverables);
};

export default useDeliverables;