import create from "zustand";

interface authStoreType {
  user: null | undefined | object;
  singIn: (state: object) => void;
  singOut: () => void;
}

export const useAuthStore = create<authStoreType>((set) => ({
  user: null,
  singIn: (state: object) => set({ user: state }),
  singOut: () => set({ user: null }),
}));
