import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getDeliverableById, updateDeliverableById } from '../slices/deliverablesSlice';
import { Deliverable } from '../types';

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
  const dispatch = useAppDispatch();
  const deliverable = useAppSelector(state => state.deliverables.deliverable);
  const loading = useAppSelector(state => state.deliverables.loading);
  const error = useAppSelector(state => state.deliverables.error);

  /**
   * Fetches the deliverable details when the component is mounted.
   */
  useEffect(() => {
    if (id) {
      dispatch(getDeliverableById(id));
    }
  }, [dispatch, id]);

  /**
   * Sets form values when deliverable data is loaded.
   */
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

  /**
   * Handles form submission to update the deliverable.
   * @param {Deliverable} data - The deliverable data to update.
   */
  const onSubmit = async (data: Deliverable) => {
    if (id) {
      await dispatch(updateDeliverableById({ id, data }));
      navigate('/');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Deliverable Detail</h2>
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