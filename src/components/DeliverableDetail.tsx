import React, { useState } from 'react';
import { Container, Typography, CircularProgress, Grid } from '@mui/material';
import { useDeliverable } from '../hooks/useDeliverable';
import DeliverableView from './DeliverableView';
import DeliverableEdit from './DeliverableEdit';
import { DeliverableFormData } from '../types';

const DeliverableDetail: React.FC = () => {
  const { deliverable, error, isLoading, mutation } = useDeliverable();
  const [editMode, setEditMode] = useState(false);

  const handleSave = (data: DeliverableFormData) => {
    mutation.mutate(data, {
      onSuccess: () => {
        setEditMode(false);
      },
    });
  };

  if (isLoading) return <Grid container justifyContent="center"><CircularProgress /></Grid>;
  if (error) return <Typography>Error: {error.message}</Typography>;
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