

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateUser } from "../../Services/LoginService";

const LoginPage = () => {
  let navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [flag, setFlag] = useState(true);

  const validateLogin = (e) => {
    e.preventDefault();

    validateUser(loginData.username, loginData.password).then((response) => {
      let role = String(response.data);

      //  store username from input (NOT from response)
      sessionStorage.setItem("username", loginData.username);

      if (role === "Admin") navigate("/admin-menu");
      else if (role === "Student") navigate("/student-menu");
      else setFlag(false);
    });
  };

  const onChangeHandler = (event) => {
    setFlag(true);
    const { name, value } = event.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleValidation = (event) => {
    event.preventDefault();

    let tempErrors = {};
    let isValid = true;

    if (!loginData.username.trim()) {
      tempErrors.username = "User Name is required";
      isValid = false;
    }

    if (!loginData.password.trim()) {
      tempErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(tempErrors);

    if (isValid) {
      validateLogin(event);
    }
  };

  const registerNewUser = () => {
    navigate("/register");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 to-indigo-500 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          User Login
        </h2>

        <form className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Username
            </label>

            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={loginData.username}
              onChange={onChangeHandler}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />

            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={loginData.password}
              onChange={onChangeHandler}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />

            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {/* Login Button */}
          <button
            type="button"
            onClick={handleValidation}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Error */}
        {!flag && (
          <p className="text-red-600 text-center mt-4">
            Invalid Username or Password
          </p>
        )}

        {/* Register */}
        <div className="text-center mt-6">
          <p className="text-gray-600 mb-2">New User?</p>

          <button
            onClick={registerNewUser}
            className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg transition"
          >
            Register Here
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

