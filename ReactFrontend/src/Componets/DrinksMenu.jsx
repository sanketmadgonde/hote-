import React, { useEffect, useState } from "react";
import axios from "axios";

const DrinksMenu = () => {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const res = await axios.get("/api/menu");
        const drinkItems = res.data.filter(item => item.category === "Drinks");
        setDrinks(drinkItems);
      } catch (err) {
        console.error("Error fetching drinks:", err);
      }
    };
    fetchDrinks();
  }, []);

  return (
    <div style={{
      padding: "2rem",
      background: "linear-gradient(135deg, #4b1248 0%, #8f0c3a 100%)",
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
        color: "#ffd1dc",
        fontWeight: "700",
        textShadow: "1px 1px 3px rgba(0,0,0,0.5)"
      }}>
        Drinks Menu
      </h1>

      {drinks.length > 0 ? (
        <div style={{ overflowX: "auto", width: "100%", maxWidth: "1000px" }}>
          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "rgba(255,255,255,0.9)",
            borderRadius: "12px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
            overflow: "hidden"
          }}>
            <thead style={{ backgroundColor: "#8f0c3a", color: "#fff" }}>
              <tr>
                <th style={tableHeadStyle}>Drink</th>
                <th style={tableHeadStyle}>180ml</th>
                <th style={tableHeadStyle}>90ml</th>
                <th style={tableHeadStyle}>60ml</th>
                <th style={tableHeadStyle}>30ml</th>
              </tr>
            </thead>
            <tbody>
              {drinks.map((drink, index) => (
                <tr key={index} style={{ textAlign: "center", borderBottom: "1px solid #eee", backgroundColor: index % 2 === 0 ? "#fff" : "#f9f9f9" }}>
                  <td style={tableCellStyle}>{drink.name}</td>
                  <td style={tableCellStyle}>₹{drink.price180ml || "-"}</td>
                  <td style={tableCellStyle}>₹{drink.price90ml || "-"}</td>
                  <td style={tableCellStyle}>₹{drink.price60ml || "-"}</td>
                  <td style={tableCellStyle}>₹{drink.price30ml || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p style={{ textAlign: "center", color: "#ffd1dc", marginTop: "2rem", fontSize: "1.2rem" }}>
          No drinks available.
        </p>
      )}
    </div>
  );
};

const tableHeadStyle = {
  padding: "1rem",
  fontWeight: "600",
  fontSize: "1.1rem",
  letterSpacing: "0.5px",
};

const tableCellStyle = {
  padding: "0.8rem",
  fontSize: "1rem",
  color: "#444",
  fontWeight: "500"
};

export default DrinksMenu;
