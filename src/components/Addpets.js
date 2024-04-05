import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css";
import "./Pets.css";

const Addpets = () => {
  const [pet, setPet] = useState({
    name: "",
    category: "",
    gender: "",
    age: "",
    image: "",
    description: "",
  });

  const [errors, setErrors] = useState({}); // State to track validation errors
  const [loading, setLoading] = useState(false); // State to track loading state

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPet((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear validation error when user starts typing
  };
  const handleClick = async (e) => {
    e.preventDefault();
    const validationErrors = validate(pet);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      setLoading(true); // Start loading
      await axios.post("http://localhost:8804/pets", pet);
      // Display success message using Toastify
      toast.success("Pet Added Successfully", {
        autoClose: 1500 // Set autoClose to 1.5 seconds (1500 milliseconds)
      });
      setLoading(false); // Stop loading
      setTimeout(() => navigate("/pets"), 1000); // Delay navigation for 1.5 seconds to show progress bar
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
      setLoading(false); // Stop loading
    }
  };
  
  

  const validate = (pet) => {
    const errors = {};
    if (!pet.name) {
      errors.name = "Name is required";
    }
    if (!pet.category) {
      errors.category = "Category is required";
    }
    if (!pet.gender) {
      errors.gender = "Gender is required";
    }
    if (!pet.age) {
      errors.age = "Age is required";
    }
    if (!pet.image) {
      errors.image = "Image URL is required";
    }
    if (!pet.description) {
      errors.description = "Description is required";
    }
    return errors;
  };

  return (
    <div className="form">
      <h2>ADD NEW PET</h2>
      <input
        type="text"
        placeholder="Pet name"
        name="name"
        value={pet.name}
        onChange={handleChange}
      />
      {errors.name && <div className="error-message">{errors.name}</div>}{" "}
      {/* Display validation error message */}
      {/* Dropdown menu for category */}
      <select value={pet.category} onChange={handleChange} name="category">
        <option value="">Select Category</option>
        <option value="cat">Cat</option>
        <option value="dog">Dog</option>
        <option value="others">Others</option>
      </select>
      {errors.category && (
        <div className="error-message">{errors.category}</div>
      )}{" "}
      {/* Display validation error message */}
      {/* Dropdown menu for gender */}
      <select value={pet.gender} onChange={handleChange} name="gender">
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      {errors.gender && (
        <div className="error-message">{errors.gender}</div>
      )}{" "}
      {/* Display validation error message */}
      <input
        type="text"
        placeholder="Age"
        name="age"
        value={pet.age}
        onChange={handleChange}
      />
      {errors.age && <div className="error-message">{errors.age}</div>}{" "}
      {/* Display validation error message */}
      <input
        type="url"
        placeholder="Upload images"
        name="image"
        value={pet.image}
        onChange={handleChange}
      />
      {errors.image && (
        <div className="error-message">{errors.image}</div>
      )}{" "}
      {/* Display validation error message */}
      <input
        type="text"
        placeholder="Description"
        name="description"
        value={pet.description}
        onChange={handleChange}
      />
      {errors.description && (
        <div className="error-message">{errors.description}</div>
      )}{" "}
      {/* Display validation error message */}
      <button onClick={handleClick} disabled={loading}>
        {loading ? "Adding Pet..." : "SUBMIT"}
      </button>
      <Link to="/pets">See all pets</Link>
    </div>
  );
};

export default Addpets;
