export interface Deliverable {
  id: string;
  name: string;
  actualName: string;
  clientName: string;
  clientNumber: string;
  statusId: string;
  endDate: string;
}

export type DeliverableFormData = Omit<Deliverable, 'id'>;