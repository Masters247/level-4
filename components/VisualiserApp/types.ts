export interface ImageType {
  data_url: string;
}
export interface ImageList {
  data_url: string;
}

export type Product = {
  name: string;
  productCategory: string;
  productEmbelishment: null | string;
  productVariantColours: [];
};

export type BasicImage = {
  url: string;
};

// state

export interface ActionsObject {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

// functions
export type handleColourClick = (e: any, i: any) => void;
