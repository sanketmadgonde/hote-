import React, { useEffect, useState } from "react";
import axios from "axios";

const DessertsMenu = () => {
  const [starters, setStarters] = useState([]);
  const [filteredStarters, setFilteredStarters] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchStarters = async () => {
      try {
        const res = await axios.get("/api/menu");
        const starterItems = res.data.filter(item => item.category === "Desserts");
        setStarters(starterItems);
        setFilteredStarters(starterItems);
      } catch (err) {
        console.error("Error fetching starters:", err);
      }
    };
    fetchStarters();
  }, []);

  useEffect(() => {
    if (filter === "All") {
      setFilteredStarters(starters);
    } else {
      setFilteredStarters(starters.filter(item => item.type === filter));
    }
  }, [filter, starters]);

  const filters = ["All", "Veg", "Non-Veg"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 flex flex-col items-center justify-start py-12 px-4">
      <h1 className="text-5xl font-extrabold text-center text-purple-700 mb-10 font-sans drop-shadow-lg">
        Desserts Menu
      </h1>

      {/* Filter Buttons */}
     

      {/* Menu Table */}
      {filteredStarters.length > 0 ? (
        <div className="overflow-x-auto w-full max-w-5xl">
          <table className="w-full bg-white/60 backdrop-blur-md shadow-lg rounded-xl overflow-hidden">
            <thead className="bg-white/40 backdrop-blur-md text-purple-800">
              <tr>
                <th className="px-6 py-4 text-left text-lg">Name</th>
                <th className="px-6 py-4 text-center text-lg">Half Price</th>
                <th className="px-6 py-4 text-center text-lg">Full Price</th>
              </tr>
            </thead>
            <tbody>
              {filteredStarters.map((item, idx) => (
                <tr key={idx} className="border-b border-purple-100 hover:bg-white/50 transition">
                  <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                  <td className="px-6 py-4 text-center text-green-600 font-semibold">
                    ₹ {item.priceHalf || "-"}
                  </td>
                  <td className="px-6 py-4 text-center text-green-700 font-semibold">
                    ₹ {item.priceFull || item.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-10 text-xl">No desserts available.</p>
      )}
    </div>
  );
};

export default DessertsMenu;
