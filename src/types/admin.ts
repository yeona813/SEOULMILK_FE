export interface Employee {
  employeeNum: string;
  name: string;
  email: string;
}

export interface Shop {
  agencyName: string;
  email: string;
}

export interface Agency {
  id: number;
  agencyName: string;
  agencyId: string;
  email: string;
  status: string;
}

export interface AgencyData {
  agencyList: Agency[];
  listSize: number;
  totalPage: number;
  totalElements: number;
}
