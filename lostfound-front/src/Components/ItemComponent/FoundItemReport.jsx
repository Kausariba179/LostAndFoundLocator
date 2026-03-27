import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { getRole } from '../../Services/LoginService';
import { getAllFoundItems, getFoundItemsByUsername } from '../../Services/FoundItemService';
import '../../DisplayView.css';

const FoundItemReport = () => {

  const navigate = useNavigate();
  const [itemList, setItemList] = useState([]);
  const [role, setRole] = useState("");

  const showFoundItems = () => {
    getRole().then((response) => {
      setRole(response.data);

      if (response.data === 'Admin') {
        getAllFoundItems().then((res1) => {
          setItemList(res1.data);
        });
      }
      else if (response.data === 'Student') {
        getFoundItemsByUsername().then((res2) => {
          setItemList(res2.data);
        });
      }
    });
  };

  useEffect(() => {
    showFoundItems();
  }, []);

  const returnBack = () => {
    if (role === 'Admin')
      navigate('/admin-menu');
    else if (role === 'Student')
      navigate('/student-menu');
  };

  return (
    <div className="text-center">
      <div>
        {
          role === 'Admin'
            ? <h2>Admin Found Item List</h2>
            : <h2>Student Found Item List</h2>
        }

        <hr style={{ height: "3px", borderWidth: 0, backgroundColor: "red" }} />

        <div className="row">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Item Id</th>
                <th>Item Name</th>
                <th>Category</th>
                <th>Color</th>
                <th>Brand</th>
                <th>Location</th>
                <th>Found Date</th>
                <th>User Id</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {
                itemList.map((item) => (
                  <tr key={item.foundItemId}>
                    <td>{item.foundItemId}</td>
                    <td>{item.foundItemName}</td>
                    <td>{item.category}</td>
                    <td>{item.color}</td>
                    <td>{item.brand}</td>
                    <td>{item.location}</td>
                    <td>{item.foundDate}</td>
                    <td>{item.username}</td>
                    {
                      item.status
                        ? <td style={{ color: 'blue' }}>Returned</td>
                        : <td style={{ color: 'red' }}>Not Returned</td>
                    }
                  </tr>
                ))
              }
            </tbody>
          </table>

          <br />

          <button
            onClick={returnBack}
            className="btn btn-success">
            Return
          </button>

        </div>
      </div>
    </div>
  );
};

export default FoundItemReport;