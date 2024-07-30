import React, { useState } from 'react'
import Layout from '../components/layouts/Layout'
import { useSearch } from '../context/Search'
import { useCart } from '../context/cart';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Search = () => {

    const [values, setValues] = useSearch();
    const [cart, setCart] = useCart();
    const navigate = useNavigate()
    console.log(values);

  return (
    <Layout title={"Search Results - Healet"}>
        <div className='container'>
            <div className='text-center'>
                <h1>Search results</h1>
                 <h6>{
                    values?.results.length < 1 ? 'No Products Found' : `Found ${values?.results.length}`
                    }</h6>
                    <div className="d-flex flex-wrap mt-4">
                {values?.results.map((p) => (
                  <div className="card m-2" style={{ width: "18rem" }}>
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      height={'290px'}
                      alt={p.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">
                        {p.description.substring(0, 40)}...
                      </p>
                      <p className="card-text">Price:- {p.price}</p>
                      <button className="btn btn-primary ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                      style={{fontSize:"11px"}}
                      >
                        More Details
                      </button>
                      <button className="btn btn-secondary ms-1"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem('cart',JSON.stringify([...cart, p]))
                        toast.success("Item added to Cart");
                      }}
                      style={{fontSize:"11px"}}
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

export default Search