import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllCategory from "./Categories/All Categories/AllCategory";
import Home from "./Pages/Home page/Home";
import AddCategory from "./Categories/Add Category/AddCategory";
import EditCategory from "./Categories/Edit Category/EditCategory";
import DeleteCategory from "./Categories/Delete Category/DeleteCategory";
import ViewCategory from "./Categories/View Category/ViewCategory";
import AllProducts from "./Products/All Products/AllProducts";
import AddProduct from "./Products/Add Product/AddProduct";
import EditProduct from "./Products/Edit Product/EditProduct";
import ViewProduct from "./Products/View Product/ViewProduct";
import Dashboard from "./Pages/Main/Main";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/Dashboard" element={<Dashboard />} />
          {/* Categories */}
          <Route path="/categories" element={<AllCategory />} />
          <Route path="/addCategory" element={<AddCategory />} />
          <Route path="/EditCategory" element={<EditCategory />} />
          <Route path="/deleteCategory" element={<DeleteCategory />} />
          <Route path="/ViewCategory" element={<ViewCategory />} />
          {/* products */}
          <Route path="/products" element={<AllProducts />} />
          <Route path="/AddProduct" element={<AddProduct />} />
          <Route path="/EditProduct" element={<EditProduct />} />
          <Route path="/ViewProduct" element={<ViewProduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
