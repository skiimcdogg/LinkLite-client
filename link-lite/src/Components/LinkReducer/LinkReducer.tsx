import React, { useState } from "react";
import apiHandler from "../../services/apiHandler";

function LinkReducer() {
  const [originalUrl, setOriginalUrl] = useState<string>("");
  const [newUrl, setNewUrl] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setOriginalUrl(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await apiHandler.shortenUrl(originalUrl);
      setNewUrl(response.data);
    } catch (err) {
      setError("Error during the process. Please retry later.");
      console.error(err);
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
      {error ? <p style={{ color: "red" }}>{error}</p> : <p>{newUrl}</p>}
    </div>
  );
}

export default LinkReducer;
