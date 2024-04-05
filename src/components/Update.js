import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import "./Pets.css";

const Update = () => {
  const { id } = useParams(); // Extracting pet id from URL
  const navigate = useNavigate();

  const [pet, setPet] = useState({
    name: "",
    category: "",
    gender: "",
    age: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const res = await axios.get(`http://localhost:8803/pets/${id}`);
        setPet(res.data); // Update state with the data of the specific pet
      } catch (err) {
        console.log(err);
      }
    };
    fetchPet();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPet((prev) => ({ ...prev, [name]: value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    
    try {
      await axios.put(`http://localhost:8803/pets/${id}`, { ...pet, id });
      toast.success("Pet updated successfully", {
        autoClose: 1500 // Set autoClose to 1.5 seconds (1500 milliseconds)
      });
      setTimeout(() => {
        navigate("/pets");
      }, 1500);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
    }
  };
  
  
  return (
    <div className="form">
      <h1>Update the Pet</h1>
      <input
        type="text"
        placeholder="Pet name"
        name="name"
        value={pet.name}
        onChange={handleChange}
      />
      <select
        value={pet.category}
        onChange={handleChange}
        name="category"
      >
        <option value="">Select Category</option>
        <option value="cat">Cat</option>
        <option value="dog">Dog</option>
        <option value="others">Others</option>
      </select>
      <select
        value={pet.gender}
        onChange={handleChange}
        name="gender"
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <input
        type="text"
        placeholder="Age"
        name="age"
        value={pet.age}
        onChange={handleChange}
      />
      <input
        type="url"
        placeholder="Image URL"
        name="image"
        value={pet.image}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Description"
        name="description"
        value={pet.description}
        onChange={handleChange}
      />
      <button onClick={handleClick} >Update</button>
      <Link to="/pets">See all pets</Link>
    </div>
  );
};

export default Update;
