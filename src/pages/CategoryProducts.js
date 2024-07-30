import React, { useEffect, useState } from 'react'
import Layout from '../components/layouts/Layout'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/loader';
import { useCart } from '../context/cart';
import toast from 'react-hot-toast';

const CategoryProducts = () => {
   const params = useParams();
   const [products, setProducts] = useState([]);
   const [category, setCategory] = useState([]);
   const [loading, setLoading] = useState(false);
  const [cart, setCart] = useCart();
   const navigate = useNavigate()

  const min = 10;
  const max = 75;
   
  useEffect(() => {
   if(params?.slug) getProductByCategory()
  },[params?.slug])

   const getProductByCategory = async() => {
    try {
      setLoading(true);
        const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`);
        setLoading(false);
        setProducts(data?.products);
        setCategory(data?.category)
    } catch (error) {
      setLoading(false);
        console.log(error);
    }
   }

  return (
    <Layout title={'Category - Healet'}>
      <h1 className='text-center mt-2' style={{color:"blue"}}>{category?.name}</h1>
      {
            loading ? <div style={{textAlign:"center"}}> <img width={'300px'} height={'300px'} src='/images/spinner.gif'/></div> : 
            <div className='container mt-3'>
            <h6 className='text-center'>{products?.length} {products?.length > 1 ? 'results' : 'result'} found</h6>
            <div className='row'>
            <div className="col-md-9 offset-1">
            <div className="d-flex flex-wrap">
                {products?.map((p) => (
                  <div className="card m-2" style={{ width: "15rem" }}>
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      height={'170px'}
                      alt={p.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name.substring(0, 21)}</h5>
                      <p className="card-text">
                        {p.description.substring(0, 30)}...
                      </p>
                      <div style={{display:"flex",justifyContent:"space-between"}}>
                        <p className="card-text offer">Offer: {Math.floor(Math.random() * (max - min + 1)) + min}%</p>
                      <p className="card-text price">Price:- ${p.price}</p>
                      </div>
                      <button className="btn btn-primary" style={{fontSize:"11px"}} onClick={() => navigate(`/product/${p.slug}`)}>
                        More Details
                      </button>
                      <button className="btn btn-secondary"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem('cart',JSON.stringify([...cart, p]))
                        toast.success("Item added to Cart");
                        
                      }}
                      style={{fontSize:"11px",marginLeft:"25px"}}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
            </div>
            {/* <div className="m-2 p-3">
              {products && products.length < total && (
                <button
                  className="btn btn-warning"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? "Loading..." : "Loadmore"}
                </button>
              )}
            </div> */}
          </div>
            </div>
        </div>
          }
        
    </Layout>
  )
}

export default CategoryProducts