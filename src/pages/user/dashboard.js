import React from 'react'
import Layout from '../../components/layouts/Layout'
import UserMenu from '../../components/layouts/UserMenu'
import { useAuth } from '../../context/auth'

const Dashboard = () => {

 const [auth] = useAuth();

  return (
    <Layout title={'Dashboard - U-Look'}>
         <div className="container-flui p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu/>
          </div>
          <div className="col-md-9">
            <div className='card w-75 p-3'>
              <h3>Your name:- {auth?.user?.name}</h3>
              <h3>Your email:- {auth?.user?.email}</h3>
              <h3>Your address:- {auth?.user?.address}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard