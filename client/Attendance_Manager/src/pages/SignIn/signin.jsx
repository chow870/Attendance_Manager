import React, { useState } from "react";
import CustomisedSigninForm from "./SigninForm";

const RegistrationForm = () => {
  const [username, setUsername] = useState("");
  const [isUsernameUnique, setIsUsernameUnique] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Function to check if username is unique
  const checkUsername = async () => {
    try {
      
      const response = await fetch(`/signin/check-username?username=${username}`,{
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method:"GET"
      });
      console.log(response);
      const result = await response.json();
      console.log(result);

      
      if (result.isUnique) {
        setIsUsernameUnique(true);
        setErrorMessage("");
      } else {
        setIsUsernameUnique(false);
        setErrorMessage("Username is already taken. Please choose another one. Refresh the page !!! ");
      }
    } catch (error) {
      setErrorMessage("An error occurred while checking the username.");
      console.log(error);
    }
  };

  return (
    <div>
      <div>
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
            <CustomisedSigninForm username={username}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;
