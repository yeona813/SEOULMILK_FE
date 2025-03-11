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
  taxTotal: string;
  status: "APPROVAL" | "REJECTION" | "WAITING";
}
