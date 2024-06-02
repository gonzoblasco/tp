import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation } from 'react-query';
import { updateDeliverable } from '../api';
import { Deliverable, DeliverableFormData } from '../types';
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

  useEffect(() => {
    if (deliverables && id) {
      const foundDeliverable = deliverables.find((d) => d.id === id);
      setDeliverable(foundDeliverable || null);
    }
  }, [deliverables, id]);

  const handleSave = (data: DeliverableFormData) => {
    if (id && deliverable) {
      const updatedDeliverable: Deliverable = { ...deliverable, ...data };
      mutation.mutate(updatedDeliverable);
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
          formData={deliverable}
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