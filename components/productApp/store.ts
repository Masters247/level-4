import create from "zustand";

interface ProductAppState {
  productName: string;
  setProductName: (string: string) => void;
  downloadCustomImage: number;
  setDownloadCustomImage: (number: number) => void;
  saveCustomImage: number;
  setSaveCustomImage: (number: number) => void;
  productEmbelishment: string;
  setProductEmbelishment: (string: string) => void;
  productColour: number;
  setProductColour: (number: number) => void;
  productColourVariations: number;
  setProductColourVariations: (number: number) => void;
  imageUploader: boolean;
  setImageUploader: (boolean: boolean) => void;
}

export const useStore = create<ProductAppState>((set) => ({
  productName: "",
  setProductName: (string: string) =>
    set(() => ({
      productName: string,
    })),
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
  productColourVariations: 0,
  setProductColourVariations: (number: number) =>
    set(() => ({
      productColour: number,
    })),
  imageUploader: false,
  setImageUploader: (boolean: boolean) =>
    set(() => ({
      imageUploader: boolean,
    })),
}));
