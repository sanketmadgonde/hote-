import React, { useEffect, useState } from "react";
import axios from "axios";

const CelebrationSpecial = () => {
  const [starters, setStarters] = useState([]);
  const [filteredSpecials, setFilteredSpecials] = useState([]);
  const [filter, setFilter] = useState("All");

  // Fetch celebration specials from the backend API
  useEffect(() => {
    const fetchStarters = async () => {
      try {
        const res = await axios.get("/api/menu");
        const starterItems = res.data.filter(item => item.category === "Celebration Special");
        setStarters(starterItems);
        setFilteredSpecials(starterItems);
      } catch (err) {
        console.error("Error fetching celebration specials:", err);
      }
    };

    fetchStarters();
  }, []);

  // Update filtered list whenever the filter changes
  useEffect(() => {
    if (filter === "All") {
      setFilteredSpecials(starters); // Show all if filter is 'All'
    } else {
      setFilteredSpecials(starters.filter(item => item.type === filter)); // Filter by Veg/Non-Veg
    }
  }, [filter, starters]);

  // Filter types
  const filters = ["All", "Veg", "Non-Veg"];

  return (
    <div style={{
      padding: "2rem",
      backgroundColor: "#e8d8f0", // Soft lavender background color
      minHeight: "100vh"
    }}>
      <h1 style={{
        textAlign: "center",
        marginBottom: "2rem",
        fontFamily: "Arial",
        fontSize: "2.5rem",
        color: "#6a1b9a" // Deep purple for title
      }}>
        Celebration Specials Menu
      </h1>

      {/* Filter Buttons */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "1rem",
        marginBottom: "2rem",
        flexWrap: "wrap"
      }}>
        {filters.map(type => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            style={{
              padding: "0.6rem 1.5rem",
              borderRadius: "20px",
              fontWeight: "600",
              border: "none",
              cursor: "pointer",
              backgroundColor: filter === type ? "#6a1b9a" : "#dcdcdc", // Light purple when active
              color: filter === type ? "#fff" : "#333",
              transition: "all 0.3s ease"
            }}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Table Format */}
      {filteredSpecials.length > 0 ? (
        <div style={{ overflowX: "auto" }}>
          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
          }}>
            <thead style={{ backgroundColor: "#f7d7fb" }}> {/* Light pinkish purple for header */}
              <tr>
                <th style={{ ...tableHeadStyle, textAlign: "left" }}>Name</th>
                <th style={{ ...tableHeadStyle, textAlign: "center" }}>Half Price</th>
                <th style={{ ...tableHeadStyle, textAlign: "center" }}>Full Price</th>
              </tr>
            </thead>
            <tbody>
              {filteredSpecials.map((item, idx) => (
                <tr key={idx} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ ...tableCellStyle, textAlign: "left" }}>{item.name}</td>
                  <td style={{ ...tableCellStyle, textAlign: "center" }}>₹{item.priceHalf || "-"}</td>
                  <td style={{ ...tableCellStyle, textAlign: "center" }}>₹{item.priceFull || item.price || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p style={{ textAlign: "center", color: "#999" }}>No celebration specials available.</p>
      )}
    </div>
  );
};

const tableHeadStyle = {
  padding: "1rem",
  fontWeight: "bold",
  color: "#333",
  fontSize: "1rem"
};

const tableCellStyle = {
  padding: "0.75rem",
  fontSize: "0.95rem",
  color: "#444"
};

export default CelebrationSpecial;
