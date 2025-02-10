import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllCategory from "./Categories/All Categories/AllCategory";
import Home from "./Pages/Home page/Home";
import AddCategory from "./Categories/Add Category/AddCategory";
import EditCategory from "./Categories/Edit Category/EditCategory";
import ViewCategory from "./Categories/View Category/ViewCategory";
import AllProducts from "./Products/All Products/AllProducts";
import AddProduct from "./Products/Add Product/AddProduct";
import EditProduct from "./Products/Edit Product/EditProduct";
import ViewProduct from "./Products/View Product/ViewProduct";
import Dashboard from "./Pages/Main/Main";
import AllDiscounts from "./DisCounts and Promotions/All Discounts/AllDiscounts";
import AddDiscounts from "./DisCounts and Promotions/Add Discounts/AddDiscounts";
import Orders from "./Orders/Orders";
import ViewOrder from "./Orders/ViewOrder";
import Shipping from "./Settings/Shipping";
import AdminLogin from "./Auth/Login/AdminLogin";
import ForgotPassword from "./Auth/Forgot Password/ForgotPassword";
import VerifayPassword from "./Auth/Verivation Code/VerifayPassword";
import CreateNewPassword from "./Auth/Create Password/CreateNewPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<AdminLogin />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/VerifayPassword" element={<VerifayPassword />} />
        <Route path="/CreateNewPassword" element={<CreateNewPassword />} />

        <Route path="/Home" element={<Home />}>
          {/* Categories */}
          <Route path="categories" element={<AllCategory />} />
          <Route path="addCategory" element={<AddCategory />} />
          <Route path="/Home/editCategory" element={<EditCategory />} />
          <Route path="viewCategory" element={<ViewCategory />} />

          {/* Products */}
          <Route path="products" element={<AllProducts />} />
          <Route path="addProduct" element={<AddProduct />} />
          <Route path="EditProduct" element={<EditProduct />} />
          <Route path="/Home/products/:productId" element={<ViewProduct />} />

          {/* Discounts */}
          {/* <Route path="allDiscounts" element={<AllDiscounts />} /> */}
          {/* <Route path="addDiscounts" element={<AddDiscounts />} /> */}

          {/* Orders */}
          {/* <Route path="orders" element={<Orders />} /> */}
          {/* <Route path="viewOrder/:id" element={<ViewOrder />} /> */}

          {/* Settings */}
          {/* <Route path="shipping" element={<Shipping />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;