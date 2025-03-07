import { create } from "zustand";

export type Role = "headquarters" | "dealership" | "admin";

interface UserState {
  role: Role;
  name: string;
  setUser: (user: Partial<UserState>) => void;
  setRole: (role: Role) => void; // Renamed to setRole for clarity
  getDisplayName: () => string;
}

export const roleNames: Record<Role, string> = {
  headquarters: "사원",
  dealership: "대리점",
  admin: "관리자",
};

const getRoleDisplayName = (role: Role, name: string): string => {
  if (role === "dealership") {
    return `${name} 대리점`;
  }
  return roleNames[role];
};

export const useUserStore = create<UserState>((set, get) => ({
  role: "headquarters",
  name: "안연아",
  setUser: (user) => set((state) => ({ ...state, ...user })),
  setRole: (role) => set({ role }),
  getDisplayName: () => {
    const { role, name } = get();
    return getRoleDisplayName(role, name);
  },
}));
