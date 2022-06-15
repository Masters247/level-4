import create from "zustand";

type productVariants = [
  {
    color: {
      hex?: string;
    };
    // customImage: {
    //   url: string;
    // };
    // secondaryColour: {
    //   hex: string;
    // };
    // shape: null | string;
  }
];

interface ProductAppState {
  productName: string;
  downloadCustomImage: number;
  saveCustomImage: number;
  productEmbelishment: string;
  productColour: number;
  productColourVariations: number;
  imageUploader: boolean;
  showHideDragResizeDiv: boolean;
  productCategory: string;
  // productVariants: productVariants;
  // setProductVaraints: (array: any) => void;
  setProductCategory: (string: string) => void;
  setProductName: (string: string) => void;
  setDownloadCustomImage: (number: number) => void;
  setSaveCustomImage: (number: number) => void;
  setProductEmbelishment: (string: string) => void;
  setProductColour: (number: number) => void;
  setProductColourVariations: (number: number) => void;
  setImageUploader: (boolean: boolean) => void;
  setShowHidDragResizeDiv: (boolean: boolean) => void;
}

export const useStore = create<ProductAppState>((set) => ({
  productName: "",
  downloadCustomImage: 0,
  saveCustomImage: 0,
  productEmbelishment: "",
  productColour: 0,
  productColourVariations: 0,
  imageUploader: false,
  showHideDragResizeDiv: true,
  productCategory: "",

  setProductCategory: (string: string) =>
    set(() => ({
      productCategory: string,
    })),
  setProductName: (string: string) =>
    set(() => ({
      productName: string,
    })),
  setDownloadCustomImage: (number: number) =>
    set(() => ({
      downloadCustomImage: number,
    })),
  setSaveCustomImage: (number: number) =>
    set(() => ({
      saveCustomImage: number,
    })),
  setProductEmbelishment: (string: string) =>
    set(() => ({
      productEmbelishment: string,
    })),
  setProductColour: (number: number) =>
    set(() => ({
      productColour: number,
    })),
  setProductColourVariations: (number: number) =>
    set(() => ({
      productColour: number,
    })),
  setImageUploader: (boolean: boolean) =>
    set(() => ({
      imageUploader: boolean,
    })),
  setShowHidDragResizeDiv: (boolean: boolean) =>
    set(() => ({
      showHideDragResizeDiv: boolean,
    })),
}));
