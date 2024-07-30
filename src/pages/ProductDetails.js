import React, { useEffect, useState } from 'react'
import Layout from '../components/layouts/Layout'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useCart } from '../context/cart'
import toast from 'react-hot-toast'
import ProductImages from '../components/ProductImage'
import "../style/details.css"

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if(params?.slug) getProduct();
  },[params?.slug])

 // get products
 const getProduct = async() => {
  try {
    const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`);
    setProduct(data?.product)
    getSimilarProducts(data?.product._id, data?.product.category._id)
  } catch (error) {
    console.log(error);
  }
 }

// get similar product
const getSimilarProducts = async(pid,cid) => {
  try {
    const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/similar-product/${pid}/${cid}`)
    setSimilarProducts(data?.products)
  } catch (error) {
    console.log(error);
  }
}

  return (
    <Layout>
      <div className='product-details-container'>
        <div className='row container mt-2'>
          <ProductImages product={product}/>
          <div className='col-md-5 product-details-info'>
            <h1 className='text-center product-title'>{product.name}</h1>
            <div className='d-flex flex-wrap justify-content-center align-items-center'>
              <div className='product-rating'>
                <i className='fas fa-star'></i>
                <i className='fas fa-star'></i>
                <i className='fas fa-star'></i>
                <i className='fas fa-star'></i>
                <i className='far fa-star'></i>
              </div>
              <span className='px-2'>4.3 (516 reviews)</span>
            </div>
            <h4 className='mt-3'>Price: ${product.price}</h4>
            <h4>Category: {product.category?.name}</h4>
            <p className='mt-3'>{product.description}</p>
            <button className='btn btn-secondary ms-1'
            onClick={() => {
              setCart([...cart, product]);
              localStorage.setItem('cart',JSON.stringify([...cart, product]))
              toast.success("Item added to Cart");
            }}
            >Add to Cart</button>
          </div>
        </div>
        <hr/>
        <div className='row container'>
          <h6>Similar products</h6>
          {similarProducts.length < 1 && (<p className='text-center'>No similar product found</p>)}
          <div className="d-flex flex-wrap">
            {similarProducts?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  height={'250px'}
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 40)}...
                  </p>
                  <p className="card-text">Price:- ${p.price}</p>
                  <button className="btn btn-primary ms-1" onClick={() => navigate(`/product/${p.slug}`)}>
                    More Details
                  </button>
                  <button className="btn btn-secondary ms-1"
                  onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem('cart',JSON.stringify([...cart, p]))
                    toast.success("Item added to Cart");
                  }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ProductDetails