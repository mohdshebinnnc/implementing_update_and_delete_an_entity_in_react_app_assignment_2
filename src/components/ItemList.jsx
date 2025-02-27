import { useState, useEffect } from "react";
import Item from "./Item";

const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`; // ✅ Use HTTP

const ItemList = () => {
  const [items, setItems] = useState([]);

  // Fetch all items when the component mounts
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URI);
        if (!response.ok) throw new Error("Failed to fetch items");
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Fetch error:", error.message);
      }
    };

    fetchItems();
  }, []);

  // Handle item deletion
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URI}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete item");

      // Update state after successful deletion
      setItems(items.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Delete error:", error.message);
    }
  };

  return (
    <div>
      <h2>Item List</h2>
      {items.length === 0 ? (
        <p>No items available.</p>
      ) : (
        items.map((item) => (
          <Item key={item.id} item={item} onDelete={handleDelete} />
        ))
      )}
    </div>
  );
};

export default ItemList;
