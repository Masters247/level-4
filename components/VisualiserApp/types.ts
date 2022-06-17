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

// functions
export type handleColourClick = (e: any, i: any) => void;
