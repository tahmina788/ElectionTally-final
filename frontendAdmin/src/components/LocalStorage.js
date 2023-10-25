import React, { useState, useEffect } from 'react';

export default function LocalStorage() {
  // Define state variables for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Define a function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with form data, e.g. submit to server
  };

  // Retrieve the form data from localStorage when the component mounts
  useEffect(() => {
    const candidateData = JSON.parse(localStorage.getItem('candidateData'));
    if (candidateData) {
      setName(candidateData.name);
      setEmail(candidateData.email);
      setPhone(candidateData.phone);
    }
  }, []);

  // Save the form data to localStorage when the form fields change
  useEffect(() => {
    const candidateData = { name, email, phone };
    localStorage.setItem('candidateData', JSON.stringify(candidateData));
  }, [name, email, phone]);

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
      </label>
      <label>
        Phone:
        <input type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

