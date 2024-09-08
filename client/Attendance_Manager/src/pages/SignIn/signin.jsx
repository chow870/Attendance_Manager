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
    <div className="min-h-screen bg-black flex justify-center items-center">
      <div className="bg-[#ffedd5] w-full max-w-md p-6 rounded-lg shadow-lg space-y-6">
        {/* Username Check Section */}
        <div>
          <label className="block text-lg font-bold mb-2">Username:</label>
          <div className="flex space-x-4 items-center">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded"
              placeholder="Enter Username"
            />
            <button
              type="button"
              onClick={checkUsername}
              className="p-2 bg-black text-white rounded hover:bg-gray-800 transition duration-200"
            >
              Check Username
            </button>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <p className="text-red-500 mt-2">{errorMessage}</p>
          )}
        </div>

        {/* Customised Sign-In Form if Username is Unique */}
        {isUsernameUnique && (
          <div className="mt-4">
            <CustomisedSigninForm username={username} />
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;
