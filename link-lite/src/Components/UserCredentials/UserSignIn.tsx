import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import authApiHandler from '../../services/authApiHandler';

type signInFormState = {
  email: string,
  password: string
}

function UserSignIn() {
  const [formData, setFormData] = useState<signInFormState>({
    email: "",
    password: ""
  })
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await authApiHandler.signup(formData);
      navigate("/");
    } catch(err) {
      setError('Credentials Error.');
      console.error(err);
    };
  }

  
  return (
    <div>
      <h1>UserSignIn</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Connect</button>
      </form>
    </div>
  );
};

export default UserSignIn;