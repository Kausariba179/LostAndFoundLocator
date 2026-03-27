import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../DisplayView.css';
import { getUserId } from '../../Services/LoginService';
import { generateFoundItemId, saveFoundItem } from '../../Services/FoundItemService';

const FoundItemRegistration = () => {

  let navigate = useNavigate();
  const [flag, setFlag] = useState(false);
  const [errors, setErrors] = useState({});
  const [newId, setNewId] = useState("");
  let [fdate, setFdate] = useState(new Date());
  const [userId, setUserId] = useState("");

  const [foundItem, setFoundItem] = useState({
    foundItemId: "",
    foundItemName: "",
    color: "",
    brand: "",
    category: "",
    location: "",
    username: "",
    foundDate: new Date(),
    status: false,
  });

  const setFoundItemId = () => {
    generateFoundItemId().then(response => {
      setNewId(response.data);
    });
  };

  const setUsername = () => {
    getUserId().then(response => {
      setUserId(response.data);
    });
  };

  useEffect(() => {
    setFoundItemId();
    setUsername();
    setFlag(false);
  }, []);

  const onChangeHandler = (event) => {
    event.persist();
    setFlag(false);
    const name = event.target.name;
    const value = event.target.value;
    setFoundItem(values => ({ ...values, [name]: value }));
  };

  const foundItemSubmit = (event) => {
    event.preventDefault();
    foundItem.foundItemId = newId;
    foundItem.username = userId;
    foundItem.foundDate = fdate;

    saveFoundItem(foundItem).then(response => {
      setFlag(true);
    });
  };

  const handleValidation = (event) => {
    event.preventDefault();
    let tempErrors = {};
    let isValid = true;

    if (!foundItem.foundItemName.trim()) {
      tempErrors.foundItemName = "Item Name is required";
      isValid = false;
    }

    if (!foundItem.color.trim()) {
      tempErrors.color = "Item color is required";
      isValid = false;
    }

    if (!foundItem.brand.trim()) {
      tempErrors.brand = "Item brand is required";
      isValid = false;
    }

    if (!foundItem.category.trim()) {
      tempErrors.category = "Item category is required";
      isValid = false;
    }

    if (!foundItem.location.trim()) {
      tempErrors.location = "Found Location is required";
      isValid = false;
    }

    setErrors(tempErrors);

    if (isValid) {
      foundItemSubmit(event);
    }
  };

  const returnBack = () => {
    navigate("/student-menu");
  };

  const nextItem = () => {
    navigate('/dummy/1');
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
bg-gradient-to-r from-purple-400 to-indigo-500">

<div className="bg-pink-100 shadow-xl rounded-lg p-8 w-full max-w-lg">

{!flag ? (

<>
<h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
Found Item Submission
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
<label>Found Item Name</label>
<input
name="foundItemName"
className="w-full border rounded px-3 py-2 bg-gray-100"
value={foundItem.foundItemName}
onChange={onChangeHandler}
/>
{errors.foundItemName &&
<p className="text-red-500 text-sm">{errors.foundItemName}</p>}
</div>

{/* Category */}
<div>
<label>Category</label>
<input
name="category"
className="w-full border rounded px-3 py-2 bg-gray-100"
value={foundItem.category}
onChange={onChangeHandler}
/>
</div>

{/* Color */}
<div>
<label>Color</label>
<input
name="color"
className="w-full border rounded px-3 py-2 bg-gray-100"
value={foundItem.color}
onChange={onChangeHandler}
/>
</div>

{/* Brand */}
<div>
<label>Brand</label>
<input
name="brand"
className="w-full border rounded px-3 py-2 bg-gray-100"
value={foundItem.brand}
onChange={onChangeHandler}
/>
</div>

{/* Location */}
<div>
<label>Found Location</label>
<input
name="location"
className="w-full border rounded px-3 py-2 bg-gray-100"
value={foundItem.location}
onChange={onChangeHandler}
/>
</div>

{/* Date */}
<div className="md:col-span-2">
<label>Found Date</label>
<input
type="date"
className="w-full border rounded px-3 py-2 bg-gray-100"
value={fdate}
onChange={(e)=>setFdate(e.target.value)}
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
Found Item Submitted Successfully !!
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

export default FoundItemRegistration;