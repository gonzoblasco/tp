import { Deliverable } from './types';
import { env } from './env';

export const fetchDeliverables = async (): Promise<Deliverable[]> => {
  try {
    const response = await fetch('https://marketplace.d1.ey.com/api/use/deliverables/v1/deliverables', {
      headers: {
        Authorization: `Bearer ${env.VITE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.data; // Asume que la respuesta tiene una propiedad `data` que contiene los deliverables
  } catch (error) {
    console.error('Fetch failed, using mock data:', error);

    // Fetch mock data
    const mockResponse = await fetch('/mockData.json');
    const mockData = await mockResponse.json();
    return mockData.data; // Asume que la respuesta mock tiene una propiedad `data` que contiene los deliverables
  }
};

export const fetchDeliverableById = async (id: string): Promise<Deliverable> => {
  try {
    const response = await fetch(`https://marketplace.d1.ey.com/api/use/deliverables/v1/deliverables/${id}`, {
      headers: {
        Authorization: `Bearer ${env.VITE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch deliverable');
    }

    const data = await response.json();

    if (!data.data) {
      throw new Error('Deliverable not found');
    }

    return data.data as Deliverable;
  } catch (error) {
    console.error('Fetch failed, using mock data:', error);

    // Fetch mock data
    const mockResponse = await fetch('/mockData.json');
    const mockData = await mockResponse.json();
    const deliverable = mockData.data.find((deliverable: Deliverable) => deliverable.id === id);

    if (!deliverable) {
      throw new Error('Deliverable not found in mock data');
    }

    return deliverable;
  }
};

/**
 * Updates a deliverable by its ID on the server.
 * @param {string} id - The ID of the deliverable.
 * @param {Deliverable} data - The deliverable data to update.
 * @returns {Promise<Deliverable>} The updated deliverable.
 */
export const updateDeliverable = async (id: string, data: Deliverable): Promise<Deliverable> => {
  try {
    const response = await fetch(`https://marketplace.d1.ey.com/api/use/deliverables/v1/deliverables/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${env.VITE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const updatedData = await response.json();
    return updatedData.data; // Asume que la respuesta tiene una propiedad `data` que contiene el deliverable actualizado
  } catch (error) {
    console.error('Update failed:', error);
    throw error;
  }
};