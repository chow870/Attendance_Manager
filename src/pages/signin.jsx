import React, { useState } from "react";

const RegistrationForm = () => {
  const [username, setUsername] = useState("");
  const [isUsernameUnique, setIsUsernameUnique] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Function to check if username is unique
  const checkUsername = async () => {
    try {
      // Replace this with your actual API call
      const response = await fetch(`/api/check-username?username=${username}`);
      const result = await response.json();

      if (result.isUnique) {
        setIsUsernameUnique(true);
        setErrorMessage("");
      } else {
        setIsUsernameUnique(false);
        setErrorMessage("Username is already taken. Please choose another one. Refresh the page !!! ");
      }
    } catch (error) {
      setErrorMessage("An error occurred while checking the username.");
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isUsernameUnique) {
      
      console.log("Form submitted successfully");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Username Input */}
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button type="button" onClick={checkUsername}>
            Check Username
          </button>
        </div>

        {/* Error Message */}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        {/* Additional Form Section */}
        {isUsernameUnique && (
          <div>
            {/* here i will now put the customised form data */}
          </div>
        )}
      </form>
    </div>
  );
};

export default RegistrationForm;
