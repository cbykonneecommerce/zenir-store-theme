/* eslint-disable no-console */
export const cartItem = (product: any) => {
  const productContext = product?.product;

  const itemCurrent =
    product.items?.find((el: any) => el.itemId === product.productId) ||
    product.items[0];

  const item = {
    aditionalInfo: {
      brandName: product.brand,
      __typename: "ItemAdditionalIndo",
    },
    availability: true,
    id: itemCurrent?.itemId,
    imageUrls: {
      at1x: itemCurrent?.images[0].imageUrl,
      __typename: "ImageUrls",
    },
    listPrice: itemCurrent?.sellers[0].commertialOffer.ListPrice,
    measurementUnit: itemCurrent?.measurementUnit,
    name: itemCurrent?.name,
    price: itemCurrent?.sellers[0].commertialOffer.Price,
    productId: product?.productId,
    quantity: 1,
    seller: itemCurrent?.sellers[0].sellerId,
    sellingPrice: itemCurrent?.sellers[0].commertialOffer.Price,
    skuName: itemCurrent?.name,
    unitMultiplier: itemCurrent?.unitMultiplier,
    uniqueId: itemCurrent?.itemId,
    isGift: false,
    __typename: "Item",
  };

  // const category = skuItem.category ? skuItem.category.slice(1, -1) : ''

  const pixelEventItems = [
    {
      skuId: itemCurrent?.itemId,
      ean: itemCurrent?.ean,
      // variant: itemCurrent?.variant,
      price: itemCurrent?.sellers[0].commertialOffer.Price,
      // sellingPrice: itemCurrent?.sellingPrice,
      priceIsInt: true,
      name: itemCurrent?.nameComplete,
      quantity: 1,
      productId: productContext?.productId,
      productRefId: productContext?.productReference,
      brand: productContext?.brand,
      // category,
      // detailUrl: itemCurrent?.detailUrl,
      imageUrl: itemCurrent?.images[0].imageUrl,
      referenceId: itemCurrent?.referenceId?.[0]?.Value,
      seller: itemCurrent?.sellers[0].sellerId,
      sellerName: itemCurrent?.sellers[0].sellerName,
    },
  ];

  return {
    data: item,
    pixelEventItems,
  };
};
