import React, { useEffect, useState } from "react";
import Layout from "../../components/layouts/Layout";
import AdminMenu from "../../components/layouts/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";

const User = () => {
  const [users, setUsers] = useState([]);

  //get all users
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/get-user`
      );
      if (data?.success) {
        setUsers(data?.users);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting user");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Layout title={"All Users - Admin Dashboard"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>All users</h1>
            <div className="border shadow">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Address</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((u, i) => {
                    return (
                      <tr>
                        <td>{i + 1}</td>
                        <td>{u?.role === 1 ? "You" : u?.name}</td>
                        <td>{u?.email}</td>
                        <td>{u?.phone}</td>
                        <td>{u?.address}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default User;
