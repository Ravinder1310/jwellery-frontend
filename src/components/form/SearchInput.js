import React from "react";
import { useSearch } from "../../context/Search";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SearchInput = () => {
    const [values, setValue] = useSearch();
    const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault()
      try {
         const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/search/${values.keyword}`)
         setValue({ ...values, results: data, keyword: '' });
         navigate('/search');
      } catch (error) {
        console.log(error);
      }
  }

  return (
    <div style={{ marginRight: "190px", marginTop: "7px" }}>
  <form className="d-flex" role="search" onSubmit={handleSubmit} style={{ position: "relative" }}>
    <input
      className="form-control me-2"
      type="search"
      style={{ color: "grey", paddingRight: "40px" }}
      placeholder="Search"
      aria-label="Search"
      value={values.keyword}
      onChange={(e) => setValue({ ...values, keyword: e.target.value })}
    />
    <button
      className="btn btn-outline-success"
      style={{
        fontSize: "13px",
        background: 'rgb(224,225,231)',
        background: 'linear-gradient(90deg, rgba(224,225,231,1) 1%, rgba(221,209,24,1) 99%)',
        color: "red",
        border: "transparent",
        position: "absolute",
        right: "10px",
        top: "50%",
        transform: "translateY(-50%)"
      }}
      type="submit"
    >
      Search
    </button>
  </form>
</div>

  );
};

export default SearchInput;
