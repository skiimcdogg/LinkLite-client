import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams  } from 'react-router-dom';
import axios from 'axios';
import authApiHandler from '../../services/authApiHandler';


function UserEmailVerification() {
  const [status, setStatus] = useState<string>("");
  const [error, setError] = useState("")
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token")

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
          setError(
            typeof err.response?.data === 'string' ?
            err.response?.data : JSON.stringify(err.response?.data)
          )
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