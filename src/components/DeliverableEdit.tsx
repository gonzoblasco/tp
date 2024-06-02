import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Deliverable, DeliverableFormData } from '../types';
import { deliverableSchema } from '../validationSchema';

interface DeliverableEditProps {
  formData: DeliverableFormData;
  onSave: (data: DeliverableFormData) => void;
  onCancel: () => void;
}

const DeliverableEdit: React.FC<DeliverableEditProps> = ({ formData, onSave, onCancel }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<DeliverableFormData>({
    defaultValues: formData,
    resolver: yupResolver(deliverableSchema),
  });

  const onSubmit: SubmitHandler<DeliverableFormData> = (data) => {
    onSave(data);
  };

  return (
    <div>
      <div className="mb-4">
        <button onClick={onCancel} className="bg-blue-500 text-white px-4 py-2 rounded">Cancel</button>
        <button onClick={handleSubmit(onSubmit)} className="bg-green-500 text-white px-4 py-2 rounded ml-2">Save</button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <table className="min-w-full bg-white">
          <tbody>
          <tr>
            <td className="border px-4 py-2 font-bold">Name</td>
            <td className="border px-4 py-2">
              <input
                type="text"
                {...register('name')}
                className="border px-2 py-1 w-full"
              />
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-bold">Actual Name</td>
            <td className="border px-4 py-2">
              <input
                type="text"
                {...register('actualName')}
                className="border px-2 py-1 w-full"
              />
              {errors.actualName && <p className="text-red-500">{errors.actualName.message}</p>}
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-bold">Client Name</td>
            <td className="border px-4 py-2">
              <input
                type="text"
                {...register('clientName')}
                className="border px-2 py-1 w-full"
              />
              {errors.clientName && <p className="text-red-500">{errors.clientName.message}</p>}
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-bold">Client Number</td>
            <td className="border px-4 py-2">
              <input
                type="text"
                {...register('clientNumber')}
                className="border px-2 py-1 w-full"
              />
              {errors.clientNumber && <p className="text-red-500">{errors.clientNumber.message}</p>}
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-bold">Status ID</td>
            <td className="border px-4 py-2">
              <input
                type="text"
                {...register('statusId')}
                className="border px-2 py-1 w-full"
              />
              {errors.statusId && <p className="text-red-500">{errors.statusId.message}</p>}
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-bold">End Date</td>
            <td className="border px-4 py-2">
              <input
                type="date"
                {...register('endDate')}
                className="border px-2 py-1 w-full"
              />
              {errors.endDate && <p className="text-red-500">{errors.endDate.message}</p>}
            </td>
          </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default DeliverableEdit;