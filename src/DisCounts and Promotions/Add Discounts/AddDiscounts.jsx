import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const API_BASE_URL = "https://demo.vrtex.duckdns.org/api/shop/promotions/store";
const live_shop_domain = localStorage.getItem("live_shop_domain");
const role = localStorage.getItem("role");

const AddPromotion = () => {
  const [promotionNameAr, setPromotionNameAr] = useState("");
  const [promotionNameEn, setPromotionNameEn] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [productsNum, setProductsNum] = useState(2);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [items, setItems] = useState([
    { category: "", product_id: "", quantity: "", price: "" },
    { category: "", product_id: "", quantity: "", price: "" },
  ]);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`https://${live_shop_domain}/api/${role}/categories`, {
        headers: {
          "Accept-Language": "en",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCategories(response.data.data);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`https://${live_shop_domain}/api/${role}/products`, {
        headers: {
          "Accept-Language": "en",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setProducts(response.data.data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleSubmit = async () => {
    const promotionItems = items.slice(0, productsNum).filter(item => item.product_id && item.quantity);

    const payload = {
      name: {
        ar: promotionNameAr,
        en: promotionNameEn,
      },
      total_price: totalPrice,
      start_date: startDate?.toISOString().split("T")[0],
      end_date: endDate?.toISOString().split("T")[0],
      quantity: promotionItems.length,
      items: promotionItems.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
      })),
    };

    try {
      const response = await axios.post(API_BASE_URL, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Promotion added successfully");
      console.log("📦 Payload sent:", payload);
      console.log("✅ Server response:", response.data);
      if (response.data?.data?.name) {
        alert(`Promotion '${response.data.data.name.en}' added!`);
      }
    } catch (error) {
      console.error("❌ Failed to add promotion", error);
      if (error.response?.data) {
        console.error("🚨 Server error response:", error.response.data);
        alert("Server rejected the request: " + JSON.stringify(error.response.data));
      }
    }
  };

  return (
    <div>
      <h2>Add New Promotion</h2>
      <div>
        <label>Promotion Name (AR)</label>
        <input value={promotionNameAr} onChange={(e) => setPromotionNameAr(e.target.value)} />
        <label>Promotion Name (EN)</label>
        <input value={promotionNameEn} onChange={(e) => setPromotionNameEn(e.target.value)} />
      </div>
      <div>
        <label>Total Price</label>
        <input type="number" value={totalPrice} onChange={(e) => setTotalPrice(e.target.value)} />
        <label>Start Date</label>
        <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
        <label>End Date</label>
        <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
      </div>
      <div>
        <label>Products Num</label>
        <select value={productsNum} onChange={(e) => {
          const value = parseInt(e.target.value);
          setProductsNum(value);
          if (items.length < value) {
            setItems((prev) => [
              ...prev,
              ...Array.from({ length: value - prev.length }, () => ({ category: "", product_id: "", quantity: "", price: "" }))
            ]);
          }
        }}>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
        {items.slice(0, productsNum).map((item, index) => (
          <div key={index}>
            <h4>Product {index + 1}</h4>
            <select onChange={(e) => handleItemChange(index, 'category', e.target.value)} value={item.category}>
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <select
              onChange={(e) => handleItemChange(index, 'product_id', e.target.value)}
              value={item.product_id}
            >
              <option value="">Select Product</option>
              {products
                .filter((prod) => prod.category_id === parseInt(item.category))
                .map((prod) => (
                  <option key={prod.id} value={prod.id}>{prod.name}</option>
                ))}
            </select>
            <input
              type="number"
              placeholder="Quantity"
              value={item.quantity}
              onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
            />
            <input
              type="number"
              placeholder="Price"
              value={item.price}
              onChange={(e) => handleItemChange(index, 'price', e.target.value)}
            />
          </div>
        ))}
      </div>
      <button onClick={handleSubmit}>Save</button>
    </div>
  );
};

export default AddPromotion;
