export interface employeeTax {
  ntsTaxId: number;
  issueId: string;
  issueDate: string;
  suId: string;
  suName: string;
  ipId: string;
  ipName: string;
  grandTotal: string;
  chargeTotal: string;
  createdTime: string;
  createdAt: string;
  taxTotal: string;
  ar: string;
  status: "APPROVAL" | "REJECTION" | "WAITING";
}
