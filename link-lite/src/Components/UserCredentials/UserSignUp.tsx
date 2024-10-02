import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import authApiHandler from '../../services/authApiHandler';

type createUserFormState = {
  first_name: string,
  email: string,
  password: string
}

function UserSignUp() {
  const [formData, setFormData] = useState<createUserFormState>({
    first_name: "",
    email: "",
    password: ""
  });
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
      navigate("/verify-email");
    } catch(err) {
      setError('Error during user creation.');
      console.error(err);
    };
  }

  return (
    <div>
      <h1>UserSignUp</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>
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
        <button type="submit">Sign Up!</button>
      </form>
    </div>
  );
};

export default UserSignUp;

