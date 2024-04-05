import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./SinglePet.css"; // Import CSS file for styling
import { Link } from "react-router-dom";

const SinglePet = () => {
  const [pet, setPet] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false); // State for showing delete confirmation dialog
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const res = await axios.get(`http://localhost:8803/pets/${id}`);
        setPet(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPet();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8803/pets/${id}`);
      // Redirect to the pets list page after deletion
      navigate('/pets'); // Use navigate for navigation
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = () => {
    console.log("Navigating to update page with ID:", id);
    navigate(`/update/${id}`); // Navigate to the update page for the specific pet
  };

  return (
    <div className="single-pet-container">
      {pet ? (
        <div className="single-pet-content">
          <div className="pet-image">
            <img src={pet.image} alt={pet.name} />
          </div>

          <div className="pet-details">
            <h2>{pet.name}</h2>
            <p>Age: {pet.age} years</p>
            <p>Gender: {pet.gender}</p>
            <p>Category: {pet.category}</p>
            <button onClick={() => setShowDeleteDialog(true)} className="delete-btn">Delete</button>
            <button className="update" onClick={handleUpdate}>Update</button>
           
            <Link to="/adoptform">
                <button className="adopt-now-btn">ADOPT NOW  <span className="slide"></span> </button>
                </Link>
            <p className="desc-text">Description:</p>
            <p className="description"> {pet.description}</p>
          </div>
        </div>
      ) : (
        <p>Loading pet details...</p>
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="delete-dialog">
          <div className="delete-dialog-content">
            <p>Are you sure you want to delete this pet?</p>
            <div className="delete-buttons">
              <button onClick={() => setShowDeleteDialog(false)} className="cancel-btn">Cancel</button>
              <button onClick={handleDelete} className="confirm-delete-btn">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SinglePet;
