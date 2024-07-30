import React, { useState } from 'react';
import "./images.css"



const ProductImages = ({product}) => {

  const baseURL = process.env.REACT_APP_API;

  const images = [
    { name: `${baseURL}/${product.photo1}`, vw: '355w' },
    { name: `${baseURL}/${product.photo2}`, vw: '481w' },
    { name: `${baseURL}/${product.photo3}`, vw: '584w' },
    { name: `${baseURL}/${product.photo4}`, vw: '687w' },
    { name: `${baseURL}/${product.photo5}`, vw: '770w' },
  ];


  const [selectedImage, setSelectedImage] = useState(images[0].name);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const srcSet = images.map((image) => {
    return `${image.name} ${image.vw}`;
  }).join(', ');



  return (
    <div className="product-images">
     
      <div className="thumbnails">
        {images.map((image, index) => (
          <div
            key={index}
            className={`thumbnail ${selectedImage.name === image.name ? 'active' : ''}`}
            onMouseEnter={() => handleImageClick(image)}
          >
            <img src={image.name} alt={`Thumbnail ${index}`}/>
          </div>
        ))}
      </div>
      <div className="main-image">
       
      </div>
    </div>
  );
};

export default ProductImages;