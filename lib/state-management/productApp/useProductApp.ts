import create from "zustand";

const useProductApp = create((set) => ({
  customiseBox: true,
  hideCustomiseBox: () =>
    set((state: any) => {
      state.customiseBox = false;
    }),
}));

export const useCustomiseBox = () =>
  useProductApp((state: any) => state.customiseBox);
export const useHideCustomiseBox = () =>
  useProductApp((state: any) => state.toggleCustomiseBox);
