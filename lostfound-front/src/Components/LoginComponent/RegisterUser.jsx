import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerNewUser } from "../../Services/LoginService";
import "../../DisplayView.css";

const RegisterUser = () => {
  const [lostFoundUser, setLostFoundUser] = useState({
    username: "",
    password: "",
    personalName: "",
    email: "",
    role: "",
  });
  const [flag, setFlag] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  let navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const createNewUser = (event) => {
    event.preventDefault();
    if (lostFoundUser.password === confirmPassword) {
      registerNewUser(lostFoundUser).then((response) => {
        setFlag(true);
      });
    }
  };
  useEffect(() => {
    setFlag(false);
  }, []);

  const onChangeHandler = (event) => {
    event.persist();
    setFlag(false);
    const name = event.target.name;
    const value = event.target.value;
    setLostFoundUser((values) => ({ ...values, [name]: value }));
  };

  const returnBack = () => {
    navigate("/");
  };

  const handleValidation = (event) => {
    event.preventDefault();
    let tempErrors = {};
    let isValid = true;

    if (!lostFoundUser.username.trim()) {
      tempErrors.username = "User Name is required";
      isValid = false;
    }

    if (!lostFoundUser.password.trim()) {
      tempErrors.password = "Password is required";
      isValid = false;
    } else if (
      lostFoundUser.password.length < 5 ||
      lostFoundUser.password.length > 10
    ) {
      tempErrors.password = "Password must be 5-10 characters long";
      isValid = false;
    } else if (lostFoundUser.password !== confirmPassword) {
      tempErrors.password = "Both the passwords are not matched";
      isValid = false;
    }

    if (!lostFoundUser.personalName.trim()) {
      tempErrors.personalName = "Personal Name is required";
      isValid = false;
    }
    if (!lostFoundUser.email.trim()) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!emailPattern.test(lostFoundUser.email)) {
      tempErrors.email = "Invalid Email Format";
      isValid = false;
    }
    if (!lostFoundUser.role.trim()) {
      tempErrors.role = "Role is required";
      isValid = false;
    }
    if (!confirmPassword.trim()) {
      tempErrors.confirmPassword = "Confirm Password is required";
      isValid = false;
    }

    setErrors(tempErrors);
    if (isValid) {
      createNewUser(event);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 to-indigo-500 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-4xl">
        {!flag ? (
          <>
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
              New User Registration
            </h2>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Username */}
              <div>
                <label className="block font-semibold mb-1">Username</label>
                <input
                  name="username"
                  value={lostFoundUser.username}
                  onChange={onChangeHandler}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                />
                {errors.username && (
                  <p className="text-red-500">{errors.username}</p>
                )}
              </div>

              {/* Personal Name */}
              <div>
                <label className="block font-semibold mb-1">
                  Personal Name
                </label>
                <input
                  name="personalName"
                  value={lostFoundUser.personalName}
                  onChange={onChangeHandler}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block font-semibold mb-1">Email</label>
                <input
                  name="email"
                  value={lostFoundUser.email}
                  onChange={onChangeHandler}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Role */}
              <div>
                <label className="block font-semibold mb-1">Role</label>
                <select
                  name="role"
                  value={lostFoundUser.role}
                  onChange={onChangeHandler}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select Role</option>
                  <option value="Student">Student</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              {/* Password */}
              <div>
                <label className="block font-semibold mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={lostFoundUser.password}
                  onChange={onChangeHandler}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block font-semibold mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Submit Button Full Width */}
              <div className="md:col-span-2 text-center mt-4">
                <span >
                  <button
                    type="button"
                    onClick={handleValidation}
                    className="bg-indigo-600 text-white px-10 py-3 rounded-lg hover:bg-indigo-700 transition"
                  >
                    Register
                  </button>
                  </span>
                  &ensp;
                  <span>
                  <button
                    type="button"
                    onClick={returnBack}
                    className="bg-green-600 text-white px-10 py-3 rounded-lg hover:bg-green-700 transition"
                  >
                    Return
                  </button>
                </span>
              </div>
            </form>
          </>
        ) : (
          <p className="text-green-600 text-center mt-6">
            User Created Successfully
            <br />
            <button
              onClick={returnBack}
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition mt-4"
            >
              Go To Login
            </button>
          </p>
        )}
      </div>
    </div>
  );
};
export default RegisterUser;
