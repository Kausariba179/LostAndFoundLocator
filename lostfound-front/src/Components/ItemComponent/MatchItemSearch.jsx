import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFoundItemsByLostItem } from "../../Services/FoundItemService";
import { saveMatchItem } from "../../Services/MatchItemService";
import { getAllLostItems, getLostItemsByUsername } from '../../Services/LostItemService';
const MatchItemSearch = () => {

  const { lostItemId } = useParams();
  const navigate = useNavigate();

  const [foundItems, setFoundItems] = useState([]);

  // Fetch matching found items
  useEffect(() => {
    getFoundItemsByLostItem(lostItemId)
      .then((response) => {
        setFoundItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching found items:", error);
        alert("Error loading matching items");
      });
  }, [lostItemId]);

  // Match button click
  const matchItemHandler = (item) => {

    const match = {
      lostItemId: lostItemId,
      foundItemId: item.foundItemId,

      itemName: item.foundItemName,

      category: item.category,
    //  lostUsername: "",  
      foundUsername: item.username
    };

    saveMatchItem(match)
      .then(() => {
        alert("Item Matched Successfully");

        // redirect after match
        navigate("/student-menu");
      })
      .catch((error) => {
        console.error("Error matching item:", error);
        alert("Error while matching item");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 to-indigo-500">

      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl">

        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Matching Found Items
        </h2>

        {
          foundItems.length === 0 ? (
            <p className="text-center text-red-500">
              No matching items found
            </p>
          ) : (
            <table className="table table-bordered text-center">

              <thead>
                <tr>
                  <th>Found Item Id</th>
                  <th>Item Name</th>
                  <th>Category</th>
                  <th>Color</th>
                  <th>Brand</th>
                  <th>Location</th>
                  <th>User</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {foundItems.map((item) => (

                  <tr key={item.foundItemId}>
                    <td>{item.foundItemId}</td>

                
                    <td>{item.foundItemName}</td>

                    <td>{item.category}</td>
                    <td>{item.color}</td>
                    <td>{item.brand}</td>
                    <td>{item.location}</td>
                    <td>{item.username}</td>

                    <td>
                      <button
                        className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                        onClick={() => matchItemHandler(item)}
                      >
                        Match
                      </button>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>
          )
        }

        <div className="text-center mt-4">
          <button
            onClick={() => navigate("/student-menu")}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Back
          </button>
        </div>

      </div>

    </div>
  );
};

export default MatchItemSearch;