import create from "zustand";

export const useStore = create<{
  downloadCustomImage: number;
  saveCustomImage: number;
  setDownloadCustomImage: (number: number) => void;
  setSaveCustomImage: (number: number) => void;
}>((set) => ({
  downloadCustomImage: 0,
  saveCustomImage: 0,
  setDownloadCustomImage: (number: number) =>
    set(() => ({
      downloadCustomImage: number,
    })),
  setSaveCustomImage: (number: number) =>
    set(() => ({
      saveCustomImage: number,
    })),
}));
