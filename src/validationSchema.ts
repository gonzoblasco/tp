import * as yup from 'yup';

export const deliverableSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  actualName: yup.string().required('Actual Name is required'),
  clientName: yup.string().required('Client Name is required'),
  clientNumber: yup.string().required('Client Number is required'),
  statusId: yup.string().required('Status ID is required'),
  endDate: yup.string().required('End Date is required'), // Cambiado a string
});