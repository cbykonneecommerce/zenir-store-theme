export interface Product {
  productName: string;
  productId: string;
  brand: string;
  description: string;
  categoryId: string;
  link: string;
  categoryTree: [
    {
      id: string;
    }
  ];
  priceRange: PriceRange;
  items: Item[];
}

export interface PriceRange {
  sellingPrice: SellingPrice;
  listPrice: ListPrice;
}

export interface SellingPrice {
  highPrice: number;
  lowPrice: number;
}

export interface ListPrice {
  highPrice: number;
  lowPrice: number;
}

export interface Item {
  itemId: string;
  measurementUnit: string;
  unitMultiplier: number;
  name: string;
  images: Image[];
  sellers: Seller[];
}

export interface Image {
  imageUrl: string;
}

export interface Seller {
  sellerId: string;
  commertialOffer: CommertialOffer;
}

export interface CommertialOffer {
  Price: number;
  ListPrice: number;
  spotPrice: number;
  discountHighlights: any[];
  PriceWithoutDiscount: number;
  teasers: any[];
}
