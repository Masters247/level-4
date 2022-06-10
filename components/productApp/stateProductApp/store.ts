import create from "zustand";

export const useStore = create<{
  downloadCustomImage: number;
  setDownloadCustomImage: () => void;
}>((set) => ({
  downloadCustomImage: 1,
  setDownloadCustomImage: () =>
    set((state) => ({
      downloadCustomImage: state.downloadCustomImage,
    })),
}));
