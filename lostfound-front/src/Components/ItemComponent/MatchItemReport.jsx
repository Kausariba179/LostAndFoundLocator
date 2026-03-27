import React, { useEffect, useState } from "react";
import { getAllMatches } from "../../Services/MatchItemService";
import { useNavigate } from "react-router-dom";
const MatchItemReport = () => {

  const [matchList, setMatchList] = useState([]);
    
const navigate = useNavigate();
  useEffect(() => {
    getAllMatches().then((response) => {
      setMatchList(response.data);
    });
  }, []);
  const returnBack = () => {
   
      navigate('/admin-menu');
    
  };
  return (

    <div className="text-center">

      <h2>Matched Items</h2>

      <table className="table table-striped table-bordered">

        <thead>
          <tr>
            <th>Lost Item Id</th>
            <th>Found Item Id</th>
            <th>Item Name</th>
            <th>Category</th>
           {/* <th>Lost User</th>*/}
            <th>Found User</th>
          </tr>
        </thead>

        <tbody>

          {matchList.map((item, index) => (

            <tr key={index}>
              <td>{item.matchItemId.lostItemId}</td>
              <td>{item.matchItemId.foundItemId}</td>
              <td>{item.itemName}</td>
              <td>{item.category}</td>
              {/*<td>{item.lostUsername}</td>*/}
              <td>{item.foundUsername}</td>
            </tr>

          ))}

        </tbody>

      </table>
<br/>
  <button
            onClick={returnBack}
            className="btn btn-success">
            Return
          </button>
    </div>

  );
};

export default MatchItemReport;