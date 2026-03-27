import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../DisplayView.css";
import { getUserId } from "../../Services/LoginService";
import {
  generateLostItemId,
  saveLostItem,
} from "../../Services/LostItemService";

const LostItemRegistration = () => {
  let navigate = useNavigate();
  const [flag, setFlag] = useState(false);
  const [errors, setErrors] = useState({});
  let [newId, setNewId] = useState("");
  let [ldate, setLdate] = useState(new Date());
  const [userId, setUserId] = useState("");
  const [lostItem, setLostItem] = useState({
    lostItemId: "",
    lostItemName: "",
    color: "",
    brand: "",
    category: "",
    location: "",
    username: "",
    lostDate: new Date(),
    status: false,
  });

  const setLostItemId = () => {
    generateLostItemId().then((response) => {
      setNewId(response.data);
    });
  };

  const setUsername = () => {
    getUserId().then((response) => {
      setUserId(response.data);
    });
  };

  useEffect(() => {
    setLostItemId();
    setUsername();
    setFlag(false);
  }, []);

  const onChangeHandler = (event) => {
    event.persist();
    setFlag(false);
    const name = event.target.name;
    const value = event.target.value;
    setLostItem((values) => ({ ...values, [name]: value }));
  };
  const lostItemSubmit = (event) => {
    event.preventDefault();
    lostItem.lostItemId = newId;
    lostItem.username = userId;
    lostItem.lostDate = ldate;
    saveLostItem(lostItem).then((response) => {
      setFlag(true);
    });
  };
  const handleValidation = (event) => {
    event.preventDefault();
    let tempErrors = {};
    let isValid = true;

    if (!lostItem.lostItemName.trim()) {
      tempErrors.lostItemName = "Item Name is required";
      isValid = false;
    }

    if (!lostItem.color.trim()) {
      tempErrors.color = "Item color is required";
      isValid = false;
    }
    if (!lostItem.brand.trim()) {
      tempErrors.brand = "Item brand is required";
      isValid = false;
    }
    if (!lostItem.category.trim()) {
      tempErrors.category = "Item category is required";
      isValid = false;
    }

    if (!lostItem.location.trim()) {
      tempErrors.location = "Lost Location is required";
      isValid = false;
    }
    setErrors(tempErrors);
    if (isValid) {
      lostItemSubmit(event);
    }
  };
  const returnBack = () => {
    navigate("/student-menu");
  };
  const clearAll = () => {
    newId = "";
    lostItem.lostItemId = "";
    lostItem.lostItemName = "";
    lostItem.color = "";
    lostItem.brand = "";
    lostItem.category = "";
    lostItem.location = "";
    lostItem.lostDate = new Date();
    ldate = new Date();
  };
  //return back to the same page after submit
  let nextItem = () => {
    newId = "";
    lostItem.lostItemId = "";
    lostItem.lostItemName = "";
    lostItem.color = "";
    lostItem.brand = "";
    lostItem.category = "";
    lostItem.location = "";
    lostItem.lostDate = new Date();
    ldate = new Date();
    navigate("/lost-entry");
  }
  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100 bg-gradient-to-r from-purple-400 to-indigo-500">
      <div className="bg-pink-100 shadow-xl rounded-lg p-8 w-full max-w-lg">
        {!flag ? (
          <>
            <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
              Lost Item Submission
            </h2>

            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Item ID */}
                <div>
                  <label className="block font-medium mb-1">Item ID</label>
                  <input
                    className="w-full border rounded px-3 py-2 bg-gray-100"
                    value={newId}
                    readOnly
                  />
                </div>

                {/* Item Name */}
                <div>
                  <label>Lost Item Name</label>
                  <input
                    name="lostItemName"
                    className="w-full border rounded px-3 py-2 bg-gray-100"
                    value={lostItem.lostItemName}
                    onChange={onChangeHandler}
                  />
                  {errors.lostItemName && (
                    <p className="text-red-500 text-sm">
                      {errors.lostItemName}
                    </p>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label>Category</label>
                  <input
                    name="category"
                    className="w-full border rounded px-3 py-2 bg-gray-100"
                    value={lostItem.category}
                    onChange={onChangeHandler}
                  />
                </div>

                {/* Color */}
                <div>
                  <label>Color</label>
                  <input
                    name="color"
                    className="w-full border rounded px-3 py-2 bg-gray-100"
                    value={lostItem.color}
                    onChange={onChangeHandler}
                  />
                </div>

                {/* Brand */}
                <div>
                  <label>Brand</label>
                  <input
                    name="brand"
                    className="w-full border rounded px-3 py-2 bg-gray-100"
                    value={lostItem.brand}
                    onChange={onChangeHandler}
                  />
                </div>

                {/* Location */}
                <div>
                  <label>Lost Location</label>
                  <input
                    name="location"
                    className="w-full border rounded px-3 py-2 bg-gray-100"
                    value={lostItem.location}
                    onChange={onChangeHandler}
                  />
                </div>

                {/* Date */}
                <div className="md:col-span-2">
                  <label>Lost Date</label>
                  <input
                    type="date"
                    className="w-full border rounded px-3 py-2 bg-gray-100"
                    value={ldate}
                    onChange={(e) => setLdate(e.target.value)}
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-center gap-6 mt-6">
                <button
                  type="button"
                  onClick={handleValidation}
                  className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                >
                  Submit
                </button>

                <button
                  type="button"
                  onClick={returnBack}
                  className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
                >
                  Return
                </button>
              </div>
            </form>
          </>
        ) : (
          /* SUCCESS SCREEN */
          <div className="text-center">
            <h2 className="text-green-600 text-2xl font-bold">
              Lost Item Submitted Successfully !!
            </h2>

            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={nextItem}
                className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600"
              >
                Submit Another Item
              </button>

              <button
                onClick={returnBack}
                className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
              >
                Return
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default LostItemRegistration;
