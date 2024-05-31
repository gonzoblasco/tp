import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchDeliverableById, updateDeliverable } from '../api';

interface Deliverable {
  id: string;
  name: string;
  actualName: string;
  clientName: string;
  clientNumber: string;
  statusId: string;
  endDate: string;
}

/**
 * Formats a date string into YYYY-MM-DD format.
 * @param {string} date - The date string to format.
 * @returns {string} The formatted date string.
 */
const formatDate = (date: string): string => {
  const d = new Date(date);
  const month = `0${d.getMonth() + 1}`.slice(-2);
  const day = `0${d.getDate()}`.slice(-2);
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
};

/**
 * Component for displaying and editing a deliverable's details.
 * @returns {JSX.Element} The DeliverableDetail component.
 */
const DeliverableDetail: React.FC = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<Deliverable>();
  const queryClient = useQueryClient();

  const { data: deliverable, error, isLoading } = useQuery<Deliverable>(
    ['deliverable', id],
    () => fetchDeliverableById(id!)
  );

  const mutation = useMutation(
    (data: Deliverable) => updateDeliverable(id!, data), {
      onSuccess: () => {
        queryClient.invalidateQueries('deliverables');
        navigate('/');
      },
    }
  );

  useEffect(() => {
    if (deliverable) {
      setValue('name', deliverable.name);
      setValue('actualName', deliverable.actualName);
      setValue('clientName', deliverable.clientName);
      setValue('clientNumber', deliverable.clientNumber);
      setValue('statusId', deliverable.statusId);
      setValue('endDate', formatDate(deliverable.endDate));
    }
  }, [deliverable, setValue]);

  const onSubmit = async (data: Deliverable) => {
    await mutation.mutateAsync(data);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error instanceof Error ? error.message : 'An error occurred'}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Deliverable Detail</h2>
      {mutation.isError && <div className="text-red-600">{mutation.error instanceof Error ? mutation.error.message : 'An error occurred'}</div>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            {...register('name', { required: true })}
          />
          {errors.name && <span className="text-red-600">This field is required</span>}
        </div>

        <div>
          <label className="block text-sm font-medium">Actual Name</label>
          <input
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            {...register('actualName', { required: true })}
          />
          {errors.actualName && <span className="text-red-600">This field is required</span>}
        </div>

        <div>
          <label className="block text-sm font-medium">Client Name</label>
          <input
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            {...register('clientName', { required: true })}
          />
          {errors.clientName && <span className="text-red-600">This field is required</span>}
        </div>

        <div>
          <label className="block text-sm font-medium">Client Number</label>
          <input
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            {...register('clientNumber', { required: true })}
          />
          {errors.clientNumber && <span className="text-red-600">This field is required</span>}
        </div>

        <div>
          <label className="block text-sm font-medium">Status ID</label>
          <input
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            {...register('statusId', { required: true })}
          />
          {errors.statusId && <span className="text-red-600">This field is required</span>}
        </div>

        <div>
          <label className="block text-sm font-medium">End Date</label>
          <input
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            type="date"
            {...register('endDate', { required: true })}
          />
          {errors.endDate && <span className="text-red-600">This field is required</span>}
        </div>

        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md">Save</button>
      </form>
    </div>
  );
};

export default DeliverableDetail;
