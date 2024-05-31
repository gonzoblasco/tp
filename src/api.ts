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
  statusId: string;
  endDate: string;
}

export const fetchDeliverables = async (): Promise<Deliverable[]> => {
  const response = await fetch(API_BASE_URL, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch deliverables');
  }

  const data = await response.json();
  return data.data;
};

export const fetchDeliverableById = async (id: string): Promise<Deliverable> => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch deliverable');
  }

  const data = await response.json();
  return data.data;
};

export const updateDeliverable = async (id: string, data: Deliverable): Promise<Deliverable> => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Failed to update deliverable:', errorData);
    throw new Error(errorData.message || 'Failed to update deliverable');
  }

  const responseData = await response.json();
  return responseData.data;
};
