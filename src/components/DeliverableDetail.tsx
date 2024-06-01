// DeliverableDetail.tsx
import React, { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { useParams } from 'react-router-dom';
import { fetchDeliverableById, updateDeliverable } from '../api';
import { Deliverable } from '../types';

const DeliverableDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: deliverable, error, isLoading } = useQuery(['deliverable', id], () => {
    if (id) {
      return fetchDeliverableById(id);
    }
    return Promise.reject(new Error('ID is undefined'));
  });

  const mutation = useMutation((updatedDeliverable: Deliverable) => {
    return updateDeliverable(updatedDeliverable.id, updatedDeliverable);
  });

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<Deliverable>({
    id: '',
    name: '',
    actualName: '',
    clientName: '',
    clientNumber: '',
    statusId: '',
    endDate: '',
  });

  React.useEffect(() => {
    if (deliverable) {
      setFormData(deliverable);
    }
  }, [deliverable]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = () => {
    if (id) {
      mutation.mutate(formData);
      setEditMode(false);
    } else {
      console.error('ID is undefined');
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {(error as Error).message ?? 'Unknown error'}</p>;

  if (!deliverable) return <p>No deliverable found</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Deliverable Details</h2>
      <div className="mb-4">
        <button onClick={() => setEditMode(!editMode)} className="bg-blue-500 text-white px-4 py-2 rounded">
          {editMode ? 'Cancel' : 'Edit'}
        </button>
        {editMode && (
          <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded ml-2">
            Save
          </button>
        )}
      </div>
      <table className="min-w-full bg-white">
        <tbody>
        <tr>
          <td className="border px-4 py-2 font-bold">Name</td>
          <td className="border px-4 py-2">
            {editMode ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border px-2 py-1 w-full"
              />
            ) : (
              deliverable.name
            )}
          </td>
        </tr>
        <tr>
          <td className="border px-4 py-2 font-bold">Actual Name</td>
          <td className="border px-4 py-2">
            {editMode ? (
              <input
                type="text"
                name="actualName"
                value={formData.actualName}
                onChange={handleChange}
                className="border px-2 py-1 w-full"
              />
            ) : (
              deliverable.actualName
            )}
          </td>
        </tr>
        <tr>
          <td className="border px-4 py-2 font-bold">Client Name</td>
          <td className="border px-4 py-2">
            {editMode ? (
              <input
                type="text"
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
                className="border px-2 py-1 w-full"
              />
            ) : (
              deliverable.clientName
            )}
          </td>
        </tr>
        <tr>
          <td className="border px-4 py-2 font-bold">Client Number</td>
          <td className="border px-4 py-2">
            {editMode ? (
              <input
                type="text"
                name="clientNumber"
                value={formData.clientNumber}
                onChange={handleChange}
                className="border px-2 py-1 w-full"
              />
            ) : (
              deliverable.clientNumber
            )}
          </td>
        </tr>
        <tr>
          <td className="border px-4 py-2 font-bold">Status ID</td>
          <td className="border px-4 py-2">
            {editMode ? (
              <input
                type="text"
                name="statusId"
                value={formData.statusId}
                onChange={handleChange}
                className="border px-2 py-1 w-full"
              />
            ) : (
              deliverable.statusId
            )}
          </td>
        </tr>
        <tr>
          <td className="border px-4 py-2 font-bold">End Date</td>
          <td className="border px-4 py-2">
            {editMode ? (
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="border px-2 py-1 w-full"
              />
            ) : (
              deliverable.endDate
            )}
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DeliverableDetail;