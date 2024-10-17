import React, { useState, useEffect } from "react";
import apiHandler from "../../services/apiHandler";
import { useUser } from '../../context/UserContext';
import { AxiosError } from "axios";

interface ErrorResponse {
  details: string;
  result: string
}


function LinkReducer() {
  const [originalUrl, setOriginalUrl] = useState<string>("");
  const [newUrl, setNewUrl] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [warning, setWarning] = useState<string>("");
  const { user } = useUser();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;    
    setOriginalUrl(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) {
      setError("You need to be logged in to shorten a URL.");
      return;
    }

    try {
      const response = await apiHandler.shortenUrl(originalUrl, user.id);      
      setNewUrl(response["result"]);
    } catch (err) {
      const axiosError = err as AxiosError<ErrorResponse>
      if (axiosError.response) {
        if (axiosError.response.status === 409) {
            setWarning(axiosError.response.data.details);
            setNewUrl(axiosError.response.data.result || "");
        } else {
            setError("Error during the process. Please retry later.");
        }
    } else {
        setError("Network error or server is unreachable.");
    }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center pt-16 mx-auto my-auto w-full max-w-2xl">
      <p className="mb-5">LinkLite: Simplify your URLs. Join us to manage and shorten your links effortlessly.</p>
      { 
      user ? 
      <form onSubmit={handleSubmit}>
        <div>
          <label>Fill your URL:</label>
          <input
            type="text"
            name="first_name"
            value={originalUrl}
            onChange={handleChange}
            className="input-custom"
            required
          />
        </div>
        <button type="submit"
        className="btn-custom"
        >Shorten</button>
      </form> :
      <p className="text-m">Connect or use the test-email on my Linkedin post to reduce your Urls.</p>
      }
      {error && <p style={{ color: "red" }}>{error}</p>}
      {warning ?
        <div>
          <p style={{ color: "orange" }}>{warning}</p>
          <a href={newUrl} target="_blank" rel="noopener noreferrer">{newUrl}</a>
        </div> :
        <a href={newUrl} target="_blank" rel="noopener noreferrer">{newUrl}</a>
    }
    </div>
  );
}

export default LinkReducer;
