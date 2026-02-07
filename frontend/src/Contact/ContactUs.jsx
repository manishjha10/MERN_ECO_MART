import React, { useState, useEffect } from 'react';
import '../Contact/ContactUs.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ContactUs() {
  const { user, isAuthenticated } = useSelector((state) => state.user || {});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      setName(user.name || '');
      setEmail(user.email || '');
    }
  }, [isAuthenticated, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/v1/contact', { name, email, mobile, message }, { withCredentials: true });
        toast.success('Your message has been successfully submitted.', { position: 'top-center' });
      setMessage('');
      setMobile('');
      // redirect to home after short delay so toast is visible
      setTimeout(() => navigate('/'), 800);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send message', { position: 'top-center' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="contact-container">
        <h1>Contact Us</h1>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <label>Mobile</label>
            <input type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="e.g. +1234567890" />

          <label>Message</label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={6} required />

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Sending...' : 'Submit'}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}
