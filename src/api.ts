import axios from 'axios';

const API_BASE_URL = 'https://marketplace.d1.ey.com/api/use/deliverables/v1/deliverables';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

interface Deliverable {
  id: string;
  name: string;
  actualName: string;
  clientName: string;
  clientNumber: string;
  endDate: string;
}

export const getDeliverables = async (): Promise<Deliverable[]> => {
  const response = await axios.get(API_BASE_URL, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data.data;
};

export const getDeliverableById = async (id: string): Promise<Deliverable> => {
  const response = await axios.get(`${API_BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data.data;
};

export const updateDeliverable = async (id: string, data: Deliverable): Promise<Deliverable> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/${id}`, data, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Failed to update deliverable:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || error.message);
    } else {
      console.error('Unexpected error:', error);
      throw new Error('Unexpected error occurred');
    }
  }
};
