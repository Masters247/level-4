import create from "zustand";

export const useStore = create<{
  customiseBox: boolean;
  hideCustomiseBox: () => void;
}>((set) => ({
  customiseBox: true,
  hideCustomiseBox: () =>
    set((state) => ({
      ...state,
      customiseBox: (state.customiseBox = false),
    })),
}));
