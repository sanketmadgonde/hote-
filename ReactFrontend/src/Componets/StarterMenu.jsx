import React, { useEffect, useState } from "react";
import axios from "axios";

const StartersMenu = () => {
  const [starters, setStarters] = useState([]);
  const [filteredStarters, setFilteredStarters] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchStarters = async () => {
      try {
        const res = await axios.get("/api/menu");
        const starterItems = res.data.filter(item => item.category === "Starters");
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
    <div style={{
      padding: "2rem",
      backgroundColor: "#ffebcd", // Light Coral background color
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <h1 style={{
        textAlign: "center",
        marginBottom: "2rem",
        fontFamily: "'Poppins', sans-serif",
        fontSize: "2.8rem",
        color: "#c0392b",
        fontWeight: "700"
      }}>
        Starters Menu
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
              backgroundColor: filter === type ? "#c0392b" : "#dcdcdc",
              color: filter === type ? "#fff" : "#333",
              transition: "all 0.3s ease"
            }}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Table */}
      {filteredStarters.length > 0 ? (
        <div style={{ overflowX: "auto", width: "100%", maxWidth: "1000px" }}>
          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "white",
            borderRadius: "12px",
            boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
            overflow: "hidden"
          }}>
            <thead style={{ backgroundColor: "#f1c40f" }}>
              <tr>
                <th style={{ ...tableHeadStyle, textAlign: "left" }}>Name</th>
                <th style={{ ...tableHeadStyle, textAlign: "center" }}>Half Price</th>
                <th style={{ ...tableHeadStyle, textAlign: "center" }}>Full Price</th>
              </tr>
            </thead>
            <tbody>
              {filteredStarters.map((item, idx) => (
                <tr key={idx} style={{
                  borderBottom: "1px solid #eee",
                  backgroundColor: idx % 2 === 0 ? "#ffffff" : "#f9f9f9"
                }}>
                  <td style={{ ...tableCellStyle, textAlign: "left" }}>{item.name}</td>
                  <td style={{
                    ...tableCellStyle,
                    textAlign: "center",
                    color: "#27ae60",
                    fontWeight: "600"
                  }}>
                    ₹{item.priceHalf || "-"}
                  </td>
                  <td style={{
                    ...tableCellStyle,
                    textAlign: "center",
                    color: "#229954",
                    fontWeight: "600"
                  }}>
                    ₹{item.priceFull || item.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p style={{
          textAlign: "center",
          color: "#999",
          fontSize: "1.2rem",
          marginTop: "2rem"
        }}>
          No starters available.
        </p>
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

export default StartersMenu;
