import { create } from "zustand";

type Store = {
  maxMint: number;
  setMaxMint: (value: number) => void;
};

export const useMaxStore = create<Store>((set) => ({
  maxMint: 10,
  setMaxMint: (value: number) => set(() => ({ maxMint: value })),
}));
