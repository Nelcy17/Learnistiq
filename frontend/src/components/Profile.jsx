import React, { useEffect, useState } from "react";

const Profile = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const userBio = localStorage.getItem("bio");

    if (userData) {
      const parsedData = JSON.parse(userData);
      const firstName = parsedData?.user?.firstName || "User";
      const lastName = parsedData?.user?.lastName || "";
      setUserName(`${firstName} ${lastName}`.trim());
      setEmail(parsedData?.user?.email || "user email");
    }

    if (userBio) {
      setBio(userBio);
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleSave = () => {
    localStorage.setItem("bio", bio);
    alert("Profile updated!");
  };

  return (
    <div className="bg-white shadow-2xl rounded-2xl border border-gray-200 max-w-3xl mx-auto mt-16 p-10">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
        {/* Profile Image Section */}
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32 rounded-full bg-gray-200 overflow-hidden shadow-md border-4 border-blue-500">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl text-gray-600 font-bold">
                {userName.charAt(0)}
              </div>
            )}
          </div>

          <label className="mt-4 block w-fit">
            <div className="border-2 border-dashed border-gray-400 px-4 py-2 rounded-lg text-gray-600 text-sm cursor-pointer hover:border-blue-500 hover:text-blue-600 transition flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16v-4m0 0V8m0 4h4m-4 0H8m12 4.5V6.75A2.25 2.25 0 0017.75 4.5H6.25A2.25 2.25 0 004 6.75v10.5A2.25 2.25 0 006.25 19.5h11.5A2.25 2.25 0 0020 17.25z"
                />
              </svg>
              <span>Upload Photo</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </label>
        </div>


        <div className="flex-1 w-full">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">User Profile</h2>
          <p className="text-sm text-gray-500 mb-6">Account Details</p>

          <div className="space-y-4">
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500 font-medium">Full Name</span>
              <span className="text-gray-900">{userName}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500 font-medium">Email Address</span>
              <span className="text-gray-900">{email}</span>
            </div>
            <div className="border-b pb-2">
              <label className="text-gray-500 font-medium block mb-1">
                About
              </label>
              <textarea
                value={bio}
                onChange={handleBioChange}
                rows="3"
                placeholder="Write about yourself..."
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500 font-medium">Phone Number</span>
              <input
                type="text"
                placeholder="Enter your phone number"
                className="text-gray-900 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500 font-medium">Address</span>
              <input
                type="text"
                placeholder="Enter your address"
                className="text-gray-900 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mt-6 text-right">
            <button
              onClick={handleSave}
              className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Save Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

