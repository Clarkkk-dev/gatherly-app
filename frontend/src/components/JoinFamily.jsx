import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const JoinFamily = () => {
  const [uniqueCode, setUniqueCode] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Reset message

    try {
      const response = await axios.post(
        "https://gatherly-app.onrender.com/api/family-group/join", // Updated Render URL
        { unique_code: uniqueCode },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you're storing the token
          },
        }
      );

      if (response.status === 200) {
        setMessage(
          `Successfully joined the family group: ${response.data.familyGroup.family_name}`
        );
        // Navigate to the dashboard after successfully joining
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response) {
        setMessage(`Error: ${error.response.data.message}`);
      } else {
        setMessage(`Error: ${error.message}`);
      }
    }
  };

  const handleBackButtonClick = () => {
    navigate(-1); 
  };

  return (
    <div className="flex flex-col ">
      <button
        onClick={handleBackButtonClick}
        className="text-3xl font-bold text-gray-200 hover:text-gray-950"
      >
        Back
      </button>

      <div className="flex">
        <div>
          <img
            src="/assets/images/Group discussion-cuate.svg"
            alt="Login Illustration"
            className="w-[800px]"
          />
        </div>
        <div className="w-[400px]">
          <h2 className="text-5xl font-bold mb-5">
            Enter <span className="text-[#FF6F00]">code</span>
          </h2>
          <p className="text-2xl mb-5">
            Enter the group code or link to connect with family or friends and
            stay organized!
          </p>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                id="uniqueCode"
                value={uniqueCode}
                onChange={(e) => setUniqueCode(e.target.value)}
                required
                className="mb-5"
              />
            </div>
            <button
              type="submit"
              className="bg-[#FF6F00] p-5 text-white font-bold rounded-md"
            >
              Join Family
            </button>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default JoinFamily;
