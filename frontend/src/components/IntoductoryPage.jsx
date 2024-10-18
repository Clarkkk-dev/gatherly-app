import React from "react";
import { useNavigate } from "react-router-dom";

const IntroductoryPage = () => {
  const navigate = useNavigate();

  const handleJoinFamily = () => {
    // Navigate to the page for joining a family
    navigate("/join-family"); // Create a Join Family component/page
  };

  const handleCreateFamily = () => {
    // Navigate to the page for creating a family
    navigate("/create-family"); // Create a Create Family component/page
  };

  const handleSkip = () => {
    // Navigate to the dashboard directly
    navigate("/dashboard");
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex">
          <div>
            <img
              src="/assets/images/Group discussion-cuate.svg"
              alt="Login Illustration"
              className="w-[800px]"
            />
          </div>
          <div>
            <h2 className="text-7xl font-bold mb-8 ">
              Let's get <br />
              started! <br /> <span className="text-[#FF6F00]">
                Build
              </span> your <br />
              Family Group or
              <br />
              <span className="text-[#FF6F00]">Join</span> One!
            </h2>

            <div>
              <button
                onClick={handleJoinFamily}
                className="bg-[#FF6F00] p-5 text-white font-bold mr-5 rounded-md"
              >
                Join a Family
              </button>
              <button
                onClick={handleCreateFamily}
                className="bg-[#FF6F00] p-5 text-white font-bold rounded-md"
              >
                Create a Family
              </button>
            </div>
          </div>
        </div>

        <button onClick={handleSkip} className="text-3xl font-bold text-gray-200 hover:text-gray-950">Skip</button>
      </div>
    </>
  );
};

export default IntroductoryPage;
