import React, { useState } from 'react';
import { Container, Typography, CircularProgress, Grid, Box } from '@mui/material';
import { useDeliverable } from '../hooks/useDeliverable';
import DeliverableView from './DeliverableView';
import DeliverableEdit from './DeliverableEdit';
import { DeliverableFormData } from '../types';

/**
 * Component to display the details of a deliverable.
 */
const DeliverableDetail: React.FC = () => {
  const { deliverable, error, isLoading, mutation } = useDeliverable();
  const [editMode, setEditMode] = useState(false);

  /**
   * Handles the save action when the form is submitted.
   * @param data - The data from the form.
   */
  const handleSave = (data: DeliverableFormData) => {
    mutation.mutate(data, {
      onSuccess: () => {
        setEditMode(false);
      },
    });
  };

  if (isLoading) {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
        <CircularProgress />
      </Grid>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography variant="h6" color="error" gutterBottom>
          Error: {error.message}
        </Typography>
      </Container>
    );
  }

  if (!deliverable) {
    return (
      <Container>
        <Typography variant="h6" gutterBottom>
          No deliverable found
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Box mt={4} mb={2}>
        <Typography variant="h4" component="h2" gutterBottom>
          Deliverable Details
        </Typography>
      </Box>
      {editMode ? (
        <DeliverableEdit formData={deliverable} onSave={handleSave} onCancel={() => setEditMode(false)} />
      ) : (
        <DeliverableView deliverable={deliverable} onEdit={() => setEditMode(true)} />
      )}
    </Container>
  );
};

export default DeliverableDetail;