import { create } from "zustand";

interface InviteAgencyProps {
  agencyId: string;
  password: string;
  email: string;
}

interface InviteAgencyStore extends InviteAgencyProps {
  setInviteAgency: (data: InviteAgencyProps) => void;
}

export const useInviteAgencyStore = create<InviteAgencyStore>((set) => ({
  agencyId: "",
  password: "",
  email: "",
  setInviteAgency: (data) => set({ ...data }),
}));
