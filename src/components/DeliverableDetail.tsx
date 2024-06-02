import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation } from 'react-query';
import { updateDeliverable } from '../api';
import { Deliverable, DeliverableFormData } from '../types';
import useDeliverables from '../hooks/useDeliverables';
import DeliverableView from './DeliverableView';
import DeliverableEdit from './DeliverableEdit';
import { Container, Typography, Button } from '@mui/material';

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
    if (id) {
      mutation.mutate({ ...data, id });
      setEditMode(false);
    } else {
      console.error('ID is undefined');
    }
  };

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {(error as Error).message}</Typography>;
  if (!deliverable) return <Typography>No deliverable found</Typography>;

  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom>
        Deliverable Details
      </Typography>
      {editMode ? (
        <DeliverableEdit formData={deliverable} onSave={handleSave} onCancel={() => setEditMode(false)} />
      ) : (
        <DeliverableView deliverable={deliverable} onEdit={() => setEditMode(true)} />
      )}
    </Container>
  );
};

export default DeliverableDetail;