import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StudentForm() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/api/students', { name, age, gender })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" value={name} onChange={(event) => setName(event.target.value)} />
      <br />
      <label htmlFor="age">Age:</label>
      <input type="number" id="age" value={age} onChange={(event) => setAge(event.target.value)} />
      <br />
      <label htmlFor="gender">Gender:</label>
      <select id="gender" value={gender} onChange={(event) => setGender(event.target.value)}>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default StudentForm;