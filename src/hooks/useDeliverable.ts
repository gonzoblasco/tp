import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { fetchDeliverableById, updateDeliverable } from '../api';
import { Deliverable, DeliverableFormData } from '../types';

export const useDeliverable = () => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  const { data: deliverable, error, isLoading } = useQuery<Deliverable, Error>(
    ['deliverable', id],
    () => fetchDeliverableById(id!),
    {
      enabled: !!id,
      initialData: () => {
        const cachedDeliverables = queryClient.getQueryData<Deliverable[]>('deliverables');
        return cachedDeliverables?.find((deliverable) => deliverable.id === id);
      },
    }
  );

  const mutation = useMutation(
    (data: DeliverableFormData) => updateDeliverable(id!, { ...data, id: id! }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['deliverable', id]);
        queryClient.invalidateQueries('deliverables');
      },
    }
  );

  return { deliverable, error, isLoading, mutation };
};