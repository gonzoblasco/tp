export interface Deliverable {
  id: string;
  name: string;
  actualName: string;
  clientName: string;
  clientNumber: string;
  statusId: string;
  endDate: string;
}

export interface DeliverableFormData {
  name: string;
  actualName: string;
  clientName: string;
  clientNumber: string;
  statusId: string;
  endDate: string;
}