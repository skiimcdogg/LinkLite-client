import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import authApiHandler from '../../services/authApiHandler';
import { useUser } from "../../context/UserContext";

type signInFormState = {
  email: string,
  password: string
}

function UserSignIn() {
  const [formData, setFormData] = useState<signInFormState>({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { saveUser } = useUser();

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
      const response = await authApiHandler.login(formData);
      saveUser(response)
      navigate("/");
    } catch(err) {
      setError('Credentials Error.');
      console.error(err);
    };
  }

  
  return (
    <div className="flex flex-col items-center justify-center top-0 left-0 right-0 bottom-0 pt-16 mx-auto my-auto max-w-lg max-h-screen">
      <h1 className='mb-6 text-xl'>Let's connect</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className='input-custom'
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
            className='input-custom'
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button 
        type="submit"
        className='btn-custom'
        >Connect</button>
      </form>
      <p>No account yet ? Create an account here: <Link to={"/signup"} className="hover:text-retroRed">Register</Link></p>
    </div>
  );
};

export default UserSignIn;