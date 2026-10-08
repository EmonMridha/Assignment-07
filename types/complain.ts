export interface IComplaint {
  title: string;
  description: string;
  outageId?: string;
}

export interface ComplaintState {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}