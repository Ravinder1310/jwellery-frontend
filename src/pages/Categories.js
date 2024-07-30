import React from 'react'
import Layout from '../components/layouts/Layout'
import useCategory from '../hooks/useCategory'
import { Link } from 'react-router-dom';

const Categories = () => {
    const categories = useCategory();
  return (
    <Layout title={'Categories - Healet'}>
      <div className='container'>
        <div className='row text-center'>
          {categories?.map((c) => (
            <div className='col-md-3 mt-5 mb-3' key={c._id}>
              <button className='btn btn-primary text-light w-100 p-4 btn-lg'
              style={{
                backgroundImage: 'linear-gradient(to bottom, #000066, #cc66ff)'
              }}
              >
                <Link to={`/category/${c.slug}`} className='text-light text-decoration-none'>{c.name}</Link>
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Categories