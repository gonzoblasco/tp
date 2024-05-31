import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getDeliverableById, updateDeliverable } from '../api';

interface Deliverable {
  id: string;
  name: string;
  actualName: string;
  clientName: string;
  clientNumber: string;
  endDate: string;
}

const formatDate = (date: string) => {
  const d = new Date(date);
  const month = `0${d.getMonth() + 1}`.slice(-2);
  const day = `0${d.getDate()}`.slice(-2);
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
};

const DeliverableDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<Deliverable>();
  const [deliverable, setDeliverable] = useState<Deliverable | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeliverable = async (deliverableId: string) => {
      try {
        const data = await getDeliverableById(deliverableId);
        setDeliverable(data);
        setValue('endDate', formatDate(data.endDate)); // Formatear la fecha correctamente
      } catch (error) {
        console.error('Failed to fetch deliverable', error);
      }
    };

    if (id) {
      fetchDeliverable(id);
    }
  }, [id, setValue]);

  const onSubmit = async (data: Deliverable) => {
    try {
      if (id) {
        console.log('Sending data to server:', data);
        await updateDeliverable(id, data);
        navigate('/');
      }
    } catch (error) {
      setServerError('Failed to update deliverable');
      console.error('Failed to update deliverable', error);
    }
  };

  if (!deliverable) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Deliverable Detail</h2>
      {serverError && <div className="text-red-600">{serverError}</div>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            defaultValue={deliverable.name}
            {...register('name', { required: true })}
          />
          {errors.name && <span className="text-red-600">This field is required</span>}
        </div>

        <div>
          <label className="block text-sm font-medium">Actual Name</label>
          <input
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            defaultValue={deliverable.actualName}
            {...register('actualName', { required: true })}
          />
          {errors.actualName && <span className="text-red-600">This field is required</span>}
        </div>

        <div>
          <label className="block text-sm font-medium">Client Name</label>
          <input
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            defaultValue={deliverable.clientName}
            {...register('clientName', { required: true })}
          />
          {errors.clientName && <span className="text-red-600">This field is required</span>}
        </div>

        <div>
          <label className="block text-sm font-medium">Client Number</label>
          <input
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            defaultValue={deliverable.clientNumber}
            {...register('clientNumber', { required: true })}
          />
          {errors.clientNumber && <span className="text-red-600">This field is required</span>}
        </div>

        <div>
          <label className="block text-sm font-medium">End Date</label>
          <input
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            type="date"
            defaultValue={formatDate(deliverable.endDate)} // Asegurarse de que la fecha esté formateada
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
