import React, { useEffect, useState } from 'react';
import { Image } from 'vtex.store-image';

const ImageRotator = () => {
  const [ currentImage, setCurrentImage ] = useState(() => {
    const randomIndex = Math.floor(Math.random() * 10);
    return randomIndex;
  });

  const images = [
    'https://tfcvih.vtexassets.com/assets/vtex.file-manager-graphql/images/6830d7a2-c97c-4d86-a69e-70a80a106646___f0b7cb0174e2347157b289819a0cec77.svg',
    'https://tfcvih.vtexassets.com/assets/vtex.file-manager-graphql/images/a2c95c8b-42c7-463d-8009-e6cb213f7e9f___3770728aa4abbf5bf68aef97c3c2e876.svg',
    'https://tfcvih.vtexassets.com/assets/vtex.file-manager-graphql/images/7dcedb3b-0b14-4cbd-b489-818aa11e119e___98fd6662d00e25af9a0e5c586e9d7911.svg',
    'https://tfcvih.vtexassets.com/assets/vtex.file-manager-graphql/images/5ff0881f-4ea2-4e92-adae-4e533ae92f31___64ccba2b2c430d7cca9bc3d3d3ad206e.svg',
    'https://tfcvih.vtexassets.com/assets/vtex.file-manager-graphql/images/0e139a5a-602c-490a-9993-8bc7f4ce1bf4___f9b56c9c0427f69927f419997b95c339.svg',
    'https://tfcvih.vtexassets.com/assets/vtex.file-manager-graphql/images/d53314fa-8d0f-492f-82e6-7b5b1d52a4f5___bde30091e706cdb839770b229d39b753.svg',
    'https://tfcvih.vtexassets.com/assets/vtex.file-manager-graphql/images/4109ec7c-20b9-4d68-8f99-da6002dd24ec___66ad7dd6f2d0bf9ad004a1c8a8af542b.svg',
    'https://tfcvih.vtexassets.com/assets/vtex.file-manager-graphql/images/63fc2c1f-d508-4943-9a6d-45f136ea4e89___ea215d810ce47b09563fe5e39dc03c86.svg',
    'https://tfcvih.vtexassets.com/assets/vtex.file-manager-graphql/images/4869702a-157d-4a17-95d0-5cde7447955d___26af4d5012fb45abe87f5223a16d72ae.svg',
    'https://tfcvih.vtexassets.com/assets/vtex.file-manager-graphql/images/221212d5-a855-4197-a5e0-14b6f204b6ea___f94066f2acbbeb2622b5cda435fc0857.svg',
  ];

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * 10);
    setCurrentImage(randomIndex);
  }, []);

  return (
    <Image
      src={images[currentImage]}
      alt={`Imagem ${currentImage + 1}`}
    />
  );
};

export default ImageRotator;