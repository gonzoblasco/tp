// DeliverableDetail.tsx
import React, { useState, useEffect, ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation } from 'react-query';
import { updateDeliverable } from '../api';
import { Deliverable } from '../types';
import useDeliverables from '../hooks/useDeliverables';
import DeliverableView from './DeliverableView';
import DeliverableEdit from './DeliverableEdit';

const DeliverableDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: deliverables, error, isLoading } = useDeliverables();
  const [deliverable, setDeliverable] = useState<Deliverable | null>(null);

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

  useEffect(() => {
    if (deliverables && id) {
      const foundDeliverable = deliverables.find((d) => d.id === id);
      setDeliverable(foundDeliverable || null);
      if (foundDeliverable) {
        setFormData(foundDeliverable);
      }
    }
  }, [deliverables, id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
      {editMode ? (
        <DeliverableEdit
          formData={formData}
          onChange={handleChange}
          onSave={handleSave}
          onCancel={() => setEditMode(false)}
        />
      ) : (
        <DeliverableView deliverable={deliverable} onEdit={() => setEditMode(true)} />
      )}
    </div>
  );
};

export default DeliverableDetail;