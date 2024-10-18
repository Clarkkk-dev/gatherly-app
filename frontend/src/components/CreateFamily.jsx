import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const CreateFamily = () => {
  const [familyName, setFamilyName] = useState("");
  const [photo, setPhoto] = useState("");
  const [uniqueCode, setUniqueCode] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // State for loading
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true); // Start loading

    const familyData = {
      family_name: familyName,
      photo,
      unique_code: uniqueCode,
    };

    try {
      const response = await axios.post(
        "https://gatherly-app.onrender.com/api/family-group/create", // Updated Render URL
        familyData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you're storing the token
          },
        }
      );

      if (response.status === 201) {
        setMessage(
          `Family group created successfully: ${response.data.familyGroup.family_name}`
        );
        setFamilyName("");
        setPhoto("");
        setUniqueCode("");

        // Navigate to the dashboard after successful family creation
        navigate("/dashboard"); // Update the path according to your routing
      }
    } catch (error) {
      if (error.response) {
        setMessage(`Error: ${error.response.data.message}`);
      } else {
        // No response received or network error
        setMessage(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false); // Stop loading
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

        <div className="w-[500px]">
          <h2 className="text-5xl font-bold mb-5 "><span className="text-[#FF6F00]">Create</span> a Family</h2>
          <p className="text-2xl mb-5 text-gray-800">Create Your Family Group and Share the Moments with Friends!</p>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                id="familyName"
                value={familyName}
                onChange={(e) => setFamilyName(e.target.value)}
                placeholder="Family Name"
                required
              />
            </div>
            <div>
              <input
                type="text"
                id="photo"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
                placeholder="Photo URL"
                required
              />
              {photo && (
                <img src={photo} alt="Family Preview" className="mt-2 w-40 h-40 object-cover" />
              )}
            </div>
            <div>
              <input
                type="text"
                id="uniqueCode"
                value={uniqueCode}
                onChange={(e) => setUniqueCode(e.target.value)}
                placeholder="Unique Code"
                required
              />
            </div>
            <button
              type="submit"
              className={`bg-[#FF6F00] p-5 text-white font-bold rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading} // Disable button while loading
            >
              {loading ? "Creating..." : "Create Family"}
            </button>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default CreateFamily;
