import create from "zustand";

interface ProductAppState {
  downloadCustomImage: number;
  setDownloadCustomImage: (number: number) => void;
  saveCustomImage: number;
  setSaveCustomImage: (number: number) => void;
  productEmbelishment: string;
  setProductEmbelishment: (string: string) => void;
  productColour: number;
  setProductColour: (number: number) => void;
}

export const useStore = create<ProductAppState>((set) => ({
  downloadCustomImage: 0,
  setDownloadCustomImage: (number: number) =>
    set(() => ({
      downloadCustomImage: number,
    })),
  saveCustomImage: 0,
  setSaveCustomImage: (number: number) =>
    set(() => ({
      saveCustomImage: number,
    })),
  productEmbelishment: "",
  setProductEmbelishment: (string: string) =>
    set(() => ({
      productEmbelishment: string,
    })),
  productColour: 0,
  setProductColour: (number: number) =>
    set(() => ({
      productColour: number,
    })),
}));
