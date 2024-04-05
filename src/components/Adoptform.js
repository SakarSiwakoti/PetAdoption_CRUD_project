import React, { useState } from 'react';
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./allforms.css";

const Adoptform = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '', 
    address: '',
    message: ''
  });
  const [messageSent, setMessageSent] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.message) {
      toast.error("Please fill in all fields.");
      return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Phone number validation
    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(formData.phone)) {
      toast.error("Please enter a valid phone number (10 digits).");
      return;
    }

    // Display Toastify progress bar
    toast.info("Sending message...", {
      autoClose: 2000
    });

    emailjs.sendForm('service_oyphy1l', 'template_rrqsv53', e.target, 'KO-47x98Dy5rUThzP')
      .then((result) => {
        console.log(result.text);
        // Clear form data after successful submission
        setFormData({
          name: '',
          email: '',
          phone: '',
          address: '',
          message: ''
        });
        setMessageSent(true);
        toast.success("Message sent!", {
          autoClose: 2000
        });
      }, (error) => {
        console.log(error.text);
        toast.error("Error sending message");
      });
  };

  return (
    <div>
      <ToastContainer />
      <form className='container' onSubmit={handleSubmit}>
        <div className='form-card'>
          <input type="text" placeholder='Enter your full name' name="name" value={formData.name} onChange={handleChange} />
          <input type="email" placeholder='Enter your email address' name="email" value={formData.email} onChange={handleChange} />
          <input type="tel"  placeholder='Enter your phone number' name="phone" value={formData.phone} onChange={handleChange} />
          <textarea name="address" placeholder='Enter your full address' value={formData.address} onChange={handleChange} />
          <textarea name="message" placeholder='Tell us why you want to adopt this pet ...' value={formData.message} onChange={handleChange} />
          <button type="submit" className='submit-btn'>SUBMIT </button>
        </div>
      </form>
    </div>
  );
};

export default Adoptform;
