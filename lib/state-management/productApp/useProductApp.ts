import create from "zustand";

export const useStore = create<{
  customiseBox: boolean;
  hideCustomiseBox: () => void;
  showCustomiseBox: () => void;
}>((set) => ({
  customiseBox: true,
  hideCustomiseBox: () =>
    set((state) => ({
      customiseBox: (state.customiseBox = false),
    })),
  showCustomiseBox: () =>
    set((state) => ({
      customiseBox: (state.customiseBox = true),
    })),
}));
