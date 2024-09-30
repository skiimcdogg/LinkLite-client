import React, { useState } from "react";
import apiHandler from "../../services/apiHandler";
import { useUser } from '../../context/UserContext';
import { AxiosError } from "axios";

interface ErrorResponse {
  details: string;
}


function LinkReducer() {
  const [originalUrl, setOriginalUrl] = useState<string>("");
  const [newUrl, setNewUrl] = useState<string>("");
  const [error, setError] = useState<string>("");
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
            setError(axiosError.response.data.details);
        } else {
            setError("Error during the process. Please retry later.");
        }
    } else {
        setError("Network error or server is unreachable.");
    }
    }
  };

  return (
    <div>
      <h1>LinkReducer</h1>
      <p>Connect to list all your urls and handle them.</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Fill your URL:</label>
          <input
            type="text"
            name="first_name"
            value={originalUrl}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Shorten</button>
      </form>
      {error ? <p style={{ color: "red" }}>{error}</p> : 
      <a href={newUrl} target="_blank" rel="noopener noreferrer">{newUrl}</a>
      }
    </div>
  );
}

export default LinkReducer;
