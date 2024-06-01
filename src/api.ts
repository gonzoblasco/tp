import {Deliverable} from './types';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const token = import.meta.env.VITE_API_TOKEN;

/**
 * Fetches the list of deliverables from the server.
 * If the fetch fails, it falls back to mock data.
 * @returns {Promise<Deliverable[]>} The list of deliverables.
 */
export const fetchDeliverables = async (): Promise<Deliverable[]> => {
  try {
    const response = await fetch('https://marketplace.d1.ey.com/api/use/deliverables/v1/deliverables', {
      headers: {
        Authorization: `Bearer ${token}`,
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
    return await mockResponse.json();
  }
};

/**
 * Fetches a deliverable by its ID from the server.
 * If the fetch fails, it falls back to mock data.
 * @param {string} id - The ID of the deliverable.
 * @returns {Promise<Deliverable | undefined>} The deliverable, or undefined if not found.
 */
export const fetchDeliverableById = async (id: string): Promise<Deliverable | undefined> => {
  try {
    const response = await fetch(`https://marketplace.d1.ey.com/api/use/deliverables/v1/deliverables/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.data; // Asume que la respuesta tiene una propiedad `data` que contiene el deliverable
  } catch (error) {
    console.error('Fetch failed, using mock data:', error);

    // Fetch mock data
    const mockResponse = await fetch('/mockData.json');
    const mockData: Deliverable[] = await mockResponse.json();
    return mockData.find((deliverable) => deliverable.id === id);
  }
};

/**
 * Updates a deliverable by its ID on the server.
 * @param {string} id - The ID of the deliverable.
 * @param {Deliverable} data - The deliverable data to update.
 * @returns {Promise} The updated deliverable.
 */
export const updateDeliverable = async (id: string, data: Deliverable): Promise<Deliverable> => {
  try {
    const response = await fetch(`https://marketplace.d1.ey.com/api/use/deliverables/v1/deliverables/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
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