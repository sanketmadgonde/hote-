import React, { useEffect, useState } from "react";
import axios from "axios";

const MainCourseMenu = () => {
  const [starters, setStarters] = useState([]);
  const [filteredStarters, setFilteredStarters] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchStarters = async () => {
      try {
        const res = await axios.get("/api/menu");
        const starterItems = res.data.filter(item => item.category === "Main Course");
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
      background: "linear-gradient(135deg, #f5e9da 0%, #f9f3eb 100%)",
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
        color: "#a0522d",
        fontWeight: "700",
        textShadow: "1px 1px 3px rgba(0,0,0,0.3)"
      }}>
        Main Course Menu
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
              backgroundColor: filter === type ? "#a0522d" : "#dcdcdc",
              color: filter === type ? "#fff" : "#333",
              transition: "all 0.3s ease"
            }}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Table Format */}
      {filteredStarters.length > 0 ? (
        <div style={{ overflowX: "auto", width: "100%", maxWidth: "1000px" }}>
          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "rgba(255,255,255,0.95)",
            borderRadius: "12px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
            overflow: "hidden"
          }}>
            <thead style={{ backgroundColor: "#deb887", color: "#fff" }}>
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
                  backgroundColor: idx % 2 === 0 ? "#fff" : "#f9f9f9"
                }}>
                  <td style={{ ...tableCellStyle, textAlign: "left" }}>{item.name}</td>
                  <td style={{ ...tableCellStyle, textAlign: "center" }}>₹{item.priceHalf || "-"}</td>
                  <td style={{ ...tableCellStyle, textAlign: "center" }}>₹{item.priceFull || item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p style={{
          textAlign: "center",
          color: "#a0522d",
          marginTop: "2rem",
          fontSize: "1.2rem"
        }}>
          No Menu available.
        </p>
      )}
    </div>
  );
};

const tableHeadStyle = {
  padding: "1rem",
  fontWeight: "bold",
  fontSize: "1rem",
  letterSpacing: "0.5px"
};

const tableCellStyle = {
  padding: "0.8rem",
  fontSize: "1rem",
  color: "#555",
  fontWeight: "500"
};

export default MainCourseMenu;
