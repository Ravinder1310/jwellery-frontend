import React, { useEffect, useState } from "react";
import Layout from "../components/layouts/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { Link, NavLink, useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
import "../style/cart.css"

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };
  //detele item
  const deleteCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/braintree/token`);
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/braintree/payment`, {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      if(auth?.user?.role === 1){
        navigate("/dashboard/admin/orders");
      }else{
        navigate("/dashboard/user/orders");
      }
      
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const baseURL = process.env.REACT_APP_API;

  return (
    <Layout>
      <div className="cartContainer">
        <div className="cartTitle">
            <h1>
              {`Hello ${auth?.token ? auth?.user?.name : "User"}`}... ,  {cart?.length
                ? `You Have ${cart.length} items in your cart ${
                    auth?.token ? "" : "please login to checkout"
                  }`
                : " Your Cart Is Empty"}
            </h1>
        </div>
        <div className="row">
          {cart?.length > 0 ? 
          <div className="cartPrdct">
        <div className="col-md-8">
        {cart?.map((p) => (
          <div className="singleCart" key={p._id}>
            <div className="cartSingleImage">
              <img
               src={`${baseURL}/${p.photo1}`}
                className="card-img-top"
                alt={p.name}
                width="100px"
                height={"100px"}
              />
            </div>
            <div className="col-md-8">
              <p>{p.name}</p>
              <p>{p.description.substring(0, 30)}...</p>
              <p>Price :- Rs.{Math.floor(p.price - (p.price*p.offer)/100)}</p>
              <button
                className="btn btn-danger"
                onClick={() => deleteCartItem(p._id)}
              >
                Remove Product
              </button>
            </div>
          </div>
        ))}
      </div>
    <div className="paymentCheck">
    <h2>Cart Summary</h2>
    <p>Total | Checkout | Payment</p>
    <hr />
    <h4>Total : {totalPrice()} </h4>
    {auth?.user?.address ? (
      <>
        <div className="mb-3">
          <h4>Current Address</h4>
          <h5>{auth?.user?.address}</h5>
          <button
            className="btn btn-outline-warning"
            onClick={() => navigate("/dashboard/user/profile")}
          >
            Update Address
          </button>
        </div>
      </>
    ) : (
      <div className="mb-3">
        {auth?.token ? (
          <button
            className="btn btn-outline-warning"
            onClick={() => navigate("/dashboard/user/profile")}
          >
            Update Address
          </button>
        ) : (
          <button
            className="btn btn-outline-warning"
            onClick={() =>
              navigate("/login", {
                state: "/cart",
              })
            }
          >
            Plase Login to checkout
          </button>
        )}
      </div>
    )}
    <div className="mt-2">
      {!clientToken || !cart?.length ? (
        ""
      ) : (
        <>
          <DropIn
            options={{
              authorization: clientToken,
              paypal: {
                flow: "vault",
              },
            }}
            onInstance={(instance) => setInstance(instance)}
          />

          <button
            className="btn btn-primary"
            onClick={handlePayment}
            disabled={loading || !instance || !auth?.user?.address}
          >
            {loading ? "Processing ...." : "Make Payment"}
          </button>
        </>
      )}
    </div>
  
</div>
</div>
      : <div className="emptyImage">  <img src="/images/ec.png" width={'400px'} height={'300px'} alt="Image not found"/><br/>
      <NavLink to={"/"} className="nav-link">
            <button className="cartButton">Continue Shopping</button>
      </NavLink>
      </div>
        }
        </div>
          
          
      </div>
    </Layout>
  );
};

export default CartPage;