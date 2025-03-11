export interface NtsTax {
  isSuccess?: string | null;
  ntsTaxId?: number;
  issueId: string;
  issueDate: string;
  suId: string;
  suName: string;
  ipId: string;
  ipName: string;
  grandTotal: string;
  chargeTotal: string;
  taxTotal: string;
  ar?: string;
  createdAt?: string;
  createdTime?: string;
  imageUrl?: string;
}
