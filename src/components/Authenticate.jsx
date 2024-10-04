import React from "react";
import { useState } from "react";

export default function Authenticate({ token }) {

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

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
      setError(null);
    } catch (error) {
      setError(error.message);
      setSuccessMessage(null);
    }
  }
  return (
    <div>
      <h2>Authenticate!</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <button onClick={handleClick} />
    </div>
  );
}
