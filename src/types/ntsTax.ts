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
  status?: string;
}

export interface NtsTaxData {
  listSize: number;
  ntsTaxList: NtsTax[];
  successElements: number;
  failedElements: number;
  totalPage: number;
}

export interface NtsTaxHubData {
  listSize: number;
  ntsTaxList: NtsTax[];
  totalElements: number;
  successElements: number;
  failedElements: number;
  totalPage: number;
}
