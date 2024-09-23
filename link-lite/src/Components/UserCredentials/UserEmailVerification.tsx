import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import authApiHandler from '../../services/authApiHandler';


function UserEmailVerification() {
  const [status, setStatus] = useState<string>("");
  const [error, setError] = useState("")
  const query = new URLSearchParams(useLocation().search);
  const token = query.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async() => {
      try {
        const response = await authApiHandler.verifyEmail(token);
          setStatus(response?.data.detail || "Verification Done.");
          setTimeout(() => {
            navigate("/login")
          }, 3000)
      } catch(err) {
        if(axios.isAxiosError(err)) {
          setError(err.response?.data || 'Error')
        } else {
          setError('Verification link error or expired.');
        }
      };
    };

    if(token) {
      verifyEmail()
    } else {
      setError("Missing Token.")
    }
  }, [token, navigate]);
  return (
    <div>
      <h1>UserEmailVerification</h1>
      { status ? <p style={{ color: 'green' }}>{status}</p> :
      <p style={{ color: 'red' }}>{error}</p> }
    </div>
  );
};

export default UserEmailVerification;