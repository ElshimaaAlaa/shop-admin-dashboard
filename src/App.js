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
import AllDiscounts from "./DisCounts and Promotions/All Discounts/AllDiscounts";
import AdminLogin from "./Auth/Login/AdminLogin";
import ForgotPassword from "./Auth/Forgot Password/ForgotPassword";
import VerifayPassword from "./Auth/Verivation Code/VerifayPassword";
import CreateNewPassword from "./Auth/Create Password/CreateNewPassword";
import PersonalInformation from "./Pesonal Information/Personal Information/PersonalInformation";
import MainInfo from "./Pesonal Information/Main For Personal Information/MainInfo";
import EditInfo from "./Pesonal Information/Edit Personal Information/EditInfo";
import Profile from "./Profile/Profile";
import Support from "./Pages/Support/Support";
import Faqs from "./Pages/Faqs/Faqs";
import StoreTheme from "./Store/Store Theme/StoreTheme";
import EditStoreTheme from "./Store/Store Theme/EditStoreTheme";
import StoreInformation from "./Store/Store Information/StoreInformation";
import EditStoreInformation from "./Store/Store Information/EditStoreInformation";
import Main from "./Pages/Main/Main";
import Register from "./Auth/Register/Register";
import GetDomain from "./Auth/Get Domain/GetDomain";
import ThemeStore from "./Store/SetUp Store/StoreTheme";
import StoreProfile from "./Store/SetUp Store/StoreProfile";
import PricingPlan from "./Store/SetUp Store/PricingPlan";
import PaymentInfo from "./Store/SetUp Store/PaymentInfo";
import Orders from "./Orders/Orders";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<GetDomain />} />
        <Route path="/Main" element={<Main />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/VerifayPassword" element={<VerifayPassword />} />
        <Route path="/CreateNewPassword" element={<CreateNewPassword />} />
        {/* set up store */}
        <Route path="/ThemeStore" element={<ThemeStore />} />
        <Route path="/StoreProfile" element={<StoreProfile />} />
        <Route path="/PricingPlan" element={<PricingPlan />} />
        <Route path="/PaymentInfo" element={<PaymentInfo />} />
        <Route path="/Home" element={<Home />}>
          {/* Categories */}
          <Route path="categories" element={<AllCategory />} />
          <Route path="addCategory" element={<AddCategory />} />
          <Route path="/Home/editCategory/:id" element={<EditCategory />} />
          <Route path="viewCategory" element={<ViewCategory />} />

          {/* Products */}
          <Route path="products" element={<AllProducts />} />
          <Route path="addProduct" element={<AddProduct />} />
          <Route
            path="/Home/EditProduct/:productId"
            element={<EditProduct />}
          />
          <Route path="/Home/products/:productId" element={<ViewProduct />} />

          {/* Discounts */}
          <Route path="allDiscounts" element={<AllDiscounts />} />

          {/* Personal Information */}
          <Route path="MainInfo" element={<MainInfo />}>
            <Route index element={<PersonalInformation />} />
            <Route path="EditInfo" element={<EditInfo />} />
            <Route path="StoreTheme" element={<StoreTheme />} />
            <Route path="EditStoreTheme" element={<EditStoreTheme />} />
            <Route path="StoreInformation" element={<StoreInformation />} />
            <Route
              path="EditStoreInformation"
              element={<EditStoreInformation />}
            />
          </Route>
          {/* Orders */}
          <Route index element={<Orders/>}/>
          {/* Other Routes */}
          <Route path="/Home/Profile" element={<Profile />} />
          <Route path="support" element={<Support />} />
          <Route path="Faqs" element={<Faqs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
