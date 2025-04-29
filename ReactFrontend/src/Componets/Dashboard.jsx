import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [dishes, setDishes] = useState([]);
  const [formData, setFormData] = useState({
    dishId: '',
    dishName: '',
    dishCategory: '',
    dishType: '',
    dishPriceFull: '',
    dishPriceHalf: '',
    price180ml: '',
    price90ml: '',
    price60ml: '',
    price30ml: ''
  });
  const [categoryFilter, setCategoryFilter] = useState('All');

  useEffect(() => {
    const checkLoginAndFetch = async () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      if (!isLoggedIn) {
        navigate("/login");
      } else {
        await fetchDishes();
      }
    };
    checkLoginAndFetch();
  }, [navigate]); // ✅ Added navigate in dependency

  const fetchDishes = async () => {
    try {
      const res = await axios.get("/api/menu");
      setDishes(res.data);
    } catch (error) {
      console.error("Error fetching dishes:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const newDish = {
      name: formData.dishName,
      category: formData.dishCategory,
      type: formData.dishCategory === 'Drinks' ? undefined : formData.dishType,
      priceFull: formData.dishCategory === 'Drinks' ? undefined : formData.dishPriceFull,
      priceHalf: formData.dishCategory === 'Drinks' ? undefined : formData.dishPriceHalf,
      price180ml: formData.dishCategory === 'Drinks' ? formData.price180ml : undefined,
      price90ml: formData.dishCategory === 'Drinks' ? formData.price90ml : undefined,
      price60ml: formData.dishCategory === 'Drinks' ? formData.price60ml : undefined,
      price30ml: formData.dishCategory === 'Drinks' ? formData.price30ml : undefined,
    };

    try {
      if (formData.dishId) {
        await axios.put(`/api/menu/${formData.dishId}`, newDish);
      } else {
        await axios.post("/api/menu", newDish);
      }
      setFormData({
        dishId: '',
        dishName: '',
        dishCategory: '',
        dishType: '',
        dishPriceFull: '',
        dishPriceHalf: '',
        price180ml: '',
        price90ml: '',
        price60ml: '',
        price30ml: ''
      });
      fetchDishes();
    } catch (error) {
      console.error("Failed to save dish:", error);
    }
  };

  const handleEdit = (dish) => {
    setFormData({
      dishId: dish._id,
      dishName: dish.name,
      dishCategory: dish.category,
      dishType: dish.type || '',
      dishPriceFull: dish.priceFull || '',
      dishPriceHalf: dish.priceHalf || '',
      price180ml: dish.price180ml || '',
      price90ml: dish.price90ml || '',
      price60ml: dish.price60ml || '',
      price30ml: dish.price30ml || ''
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this dish?")) {
      try {
        await axios.delete(`/api/menu/${id}`);
        fetchDishes();
      } catch (error) {
        console.error("Failed to delete dish:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-yellow-500 text-white p-4 shadow-md sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h2 className="text-2xl font-bold mb-0 text-gray-900">Dashboard</h2>
          <button
            onClick={handleLogout}
            className="bg-white text-yellow-500 px-4 py-2 rounded hover:bg-gray-100 font-semibold"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-6 text-center">Welcome, Admin!</h1>

        {/* Add/Edit Dish Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-yellow-500 font-semibold mb-4">Add / Edit Dish</h3>
          <form onSubmit={handleFormSubmit}>
            <input type="hidden" id="dishId" value={formData.dishId} />
            <input type="text" id="dishName" placeholder="Dish Name" className="w-full p-3 mb-4 border border-gray-300 rounded-lg" value={formData.dishName} onChange={handleInputChange} required />

            <select id="dishCategory" className="w-full p-3 mb-4 border border-gray-300 rounded-lg" value={formData.dishCategory} onChange={handleInputChange} required>
              <option value="">Select Category</option>
              <option value="Starters">Starters</option>
              <option value="Main Course">Main Course</option>
              <option value="Desserts">Desserts</option>
              <option value="Drinks">Drinks</option>
              <option value="Celebration Special">Celebration Special</option>
            </select>

            {formData.dishCategory === "Drinks" ? (
              <>
                <input type="number" id="price180ml" placeholder="180ml Price (₹)" className="w-full p-3 mb-4 border border-gray-300 rounded-lg" value={formData.price180ml} onChange={handleInputChange} required />
                <input type="number" id="price90ml" placeholder="90ml Price (₹)" className="w-full p-3 mb-4 border border-gray-300 rounded-lg" value={formData.price90ml} onChange={handleInputChange} />
                <input type="number" id="price60ml" placeholder="60ml Price (₹)" className="w-full p-3 mb-4 border border-gray-300 rounded-lg" value={formData.price60ml} onChange={handleInputChange} />
                <input type="number" id="price30ml" placeholder="30ml Price (₹)" className="w-full p-3 mb-4 border border-gray-300 rounded-lg" value={formData.price30ml} onChange={handleInputChange} />
              </>
            ) : (
              <>
                <input type="number" id="dishPriceFull" placeholder="Full Price (₹)" className="w-full p-3 mb-4 border border-gray-300 rounded-lg" value={formData.dishPriceFull} onChange={handleInputChange} required />
                <input type="number" id="dishPriceHalf" placeholder="Half Price (₹)" className="w-full p-3 mb-4 border border-gray-300 rounded-lg" value={formData.dishPriceHalf} onChange={handleInputChange} />
                <select id="dishType" className="w-full p-3 mb-4 border border-gray-300 rounded-lg" value={formData.dishType} onChange={handleInputChange}>
                  <option value="">Select Type</option>
                  <option value="Veg">Veg</option>
                  <option value="Non-Veg">Non-Veg</option>
                </select>
              </>
            )}

            <button type="submit" className="w-full py-3 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-400">
              {formData.dishId ? "Update Dish" : "Save Dish"}
            </button>
          </form>
        </div>

        {/* Filter Dishes */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-yellow-500 font-semibold mb-4">Filter Dishes</h3>
          <select id="categoryFilter" className="w-full p-3 mb-4 border border-gray-300 rounded-lg" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Starters">Starters</option>
            <option value="Main Course">Main Course</option>
            <option value="Desserts">Desserts</option>
            <option value="Drinks">Drinks</option>
            <option value="Celebration Special">Celebration Special</option>
          </select>
        </div>

        {/* Dish List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-yellow-500 font-semibold mb-4">Dish List</h3>
          <ul>
            {dishes
              .filter(d => categoryFilter === 'All' || d.category === categoryFilter)
              .map(d => (
                <li key={d._id} className="bg-white p-4 mb-4 rounded-lg shadow-sm flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <span className="mb-2 sm:mb-0">
                    <strong>{d.name}</strong><br />
                    {d.category === "Drinks" ? (
                      <>
                        180ml: ₹{d.price180ml || "-"} | 90ml: ₹{d.price90ml || "-"}<br />
                        60ml: ₹{d.price60ml || "-"} | 30ml: ₹{d.price30ml || "-"}
                      </>
                    ) : (
                      <>
                        Full Price: ₹{d.priceFull || "-"} | Half Price: ₹{d.priceHalf || "-"}<br />
                        <small>({d.category} - {d.type})</small>
                      </>
                    )}
                  </span>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(d)} className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-400">✏ Edit</button>
                    <button onClick={() => handleDelete(d._id)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-400">🗑 Delete</button>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
