import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    // send user data to backend
    const res = await axios.post("https://online-food-app-csne.onrender.com/api/user", credentials);

    console.log("Backend response:", res.data);

    if (res.data.success) {
      alert("Signup successful!");
    } else {
      alert("Signup failed: " + (res.data.message || "Invalid input"));
    }
  } catch (err) {
    console.error("Signup error:", err.response?.data || err.message);
    alert("Something went wrong!");
  }
};


  const onChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <section className="dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={credentials.name}
                  onChange={onChange}
                  id="name"
                  placeholder="Your name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  value={credentials.email}
                  onChange={onChange}
                  id="email"
                  placeholder="name@company.com"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2"
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={onChange}
                  id="password"
                  placeholder="Password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2"
                />
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className="block mb-2 text-sm font-medium">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={credentials.location}
                  onChange={onChange}
                  id="location"
                  placeholder="Your City"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2"
                />
              </div>

              {/* Terms */}
              <div className="flex items-start">
                <input id="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50" />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-500">
                  I accept the{" "}
                  <a href="#" className="font-medium text-blue-600 hover:underline">
                    Terms and Conditions
                  </a>
                </label>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-5 py-2.5"
              >
                Submit
              </button>

              <p className="text-sm font-light text-gray-500">
                Already have an account?{" "}
                <Link to="/Signin" className="font-medium text-blue-600 hover:underline">
                  Sign in here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;

