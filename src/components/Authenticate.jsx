import React from "react";
import { useState } from "react";

export default function Authenticate({ token }) {
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [username, setUsername] = useState(null);

  async function handleClick() {
    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      setSuccessMessage(result.message);
      setUsername(result.data.username);
      setError(null);
    } catch (error) {
      setError(error.message);
      setSuccessMessage(null);
    }
  }
  return (
    <div>
      <h2>Token Form</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {username && <p>Good job, {username}</p>}
      <button onClick={handleClick} type="submit">
        Authenticate
      </button>
    </div>
  );
}
