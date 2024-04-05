import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "./Pets.css";
import Footer from "./Footer";

const Pets = () => {
  const [pets, setPets] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All pets");

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await axios.get("http://localhost:8804/pets");
        setPets(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPets();
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredPets =
    selectedCategory === "All pets"
      ? pets
      : selectedCategory === "others"
      ? pets.filter((pet) => pet.category !== "dog" && pet.category !== "cat")
      : pets.filter((pet) => pet.category === selectedCategory);

  return (
    <div>
      <Navbar />
      
      <div className="select-category">
        <label htmlFor="category">Select Category:</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="All pets">All pets</option>
          <option value="dog">Dogs</option>
          <option value="cat">Cats</option>
          <option value="others">Others</option>
        </select>
      </div>
      
      <button className="add-pet-btn">
        <Link to="/addpets" style={{ color: "inherit", textDecoration: "none" }}>
        ➕ ADD PET 
        </Link>
      </button>

      <div className="pet-page">
      <h1>
  Meet Our Adorable Pets Available for Adoption{' '}
  <span role="img" aria-label="paw prints" style={{ fontSize: '1.5em' }}>
    🐾
  </span>
</h1>

        <div className="pets-container">
          {filteredPets.map((pet) => (
            <div key={pet.id} className="pet">
            
              <img src={pet.image} alt="" />
              <h2>{pet.name}</h2>
              <p>{pet.gender}</p>
              <p>{pet.age} years old</p>
              
              <div className="button-group">
              
                <Link to={`/pets/${pet.id}`}>
                  <button className="adopt">Adopt Me <i className="fa-solid fa-paw" style={{ marginLeft: '5px' }}></i></button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <Footer/>
      </div>
    </div>

  );
};

export default Pets;
