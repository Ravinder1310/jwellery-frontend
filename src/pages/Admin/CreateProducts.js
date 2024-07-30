import React, { useState, useEffect } from "react";
import Layout from "./../../components/layouts/Layout";
import AdminMenu from "./../../components/layouts/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [offer, setOffer] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo1, setPhoto1] = useState("");
  const [photo2, setPhoto2] = useState("");
  const [photo3, setPhoto3] = useState("");
  const [photo4, setPhoto4] = useState("");
  const [photo5, setPhoto5] = useState("");


  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = constructProductData();
      console.log("Product Data:", productData);
      const { data } = axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/create-product`,
        productData
      );
      // setPrData(productData)
      if (data?.success) {  
        toast.error(data?.message);
      } else {
        toast.success("Product Created Successfully");
        console.log(productData);
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  const constructProductData = () => {
    const productData = new FormData();
    productData.append("name", name);
    productData.append("description", description);
    productData.append("price", price);
    productData.append("offer", offer);
    productData.append("quantity", quantity);
    productData.append("category", category);
    productData.append("photo1", photo1);
    productData.append("photo2", photo2);
    productData.append("photo3", photo3);
    productData.append("photo4", photo4);
    productData.append("photo5", photo5);


    return productData;
  };

  const handlePhotoUpload1 = (event) => {
    setPhoto1(event.target.files[0]);
 };

const handlePhotoUpload2 = (event) => {
  setPhoto2(event.target.files[0]);
};

const handlePhotoUpload3 = (event) => {
  setPhoto3(event.target.files[0]);
};

const handlePhotoUpload4 = (event) => {
  setPhoto4(event.target.files[0]);
};

const handlePhotoUpload5 = (event) => {
  setPhoto5(event.target.files[0]);
};
  

    // useEffect(() => {
    //   console.log(prData);
    // },[prData])

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Product</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label>
                  Upload Photo1:- 
                  <input
                    type="file"
                    name="photo1"
                    accept="image/*"
                    onChange={handlePhotoUpload1}
                  />
                </label>
              </div>
              <div className="mb-3">
                <label>
                  Upload Photo2
                  <input
                    type="file"
                    name="photo2"
                    accept="image/*"
                    multiple="multiple"
                    onChange={handlePhotoUpload2}
                  />
                </label>
              </div>
              <div className="mb-3">
                <label>
                  Upload Photo3
                  <input
                    type="file"
                    name="photo3"
                    accept="image/*"
                    multiple="multiple"
                    onChange={handlePhotoUpload3}
                  />
                </label>
              </div>
              <div className="mb-3">
                <label>
                  Upload Photo4
                  <input
                    type="file"
                    name="photo4"
                    accept="image/*"
                    multiple="multiple"
                    onChange={handlePhotoUpload4}
                  />
                </label>
              </div>
              <div className="mb-3">
                <label>
                  Upload Photo5
                  <input
                    type="file"
                    name="photo5"
                    accept="image/*"
                    multiple="multiple"
                    onChange={handlePhotoUpload5}
                  />
                </label>
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="write a Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={offer}
                  placeholder="write a offer"
                  className="form-control"
                  onChange={(e) => setOffer(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="write a quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>
                  CREATE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
