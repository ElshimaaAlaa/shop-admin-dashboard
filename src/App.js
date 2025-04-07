import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllCategory from "./Categories/All Categories/AllCategory";
import Home from "./Pages/Home page/Home";
import AddCategory from "./Categories/Add Category/AddCategory";
import EditCategory from "./Categories/Edit Category/EditCategory";
import AllProducts from "./Products/All Products/AllProducts";
import AddProduct from "./Products/Add Product/AddProduct";
import EditProduct from "./Products/Edit Product/EditProduct";
import ViewProduct from "./Products/View Product/ViewProduct";
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
import RecivedOrders from "./Orders/Recived Orders";
import OrderDetails from "./Orders/OrderDetails";
import CancelOrder from "./Orders/CancelOrder";
import RefundRequests from "./Orders/RefundRequests";
import AllDiscounts from "./DisCounts and Promotions/All Discounts/AllDiscounts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<Main />} />
        <Route path="/GetDomain" element={<GetDomain />} />
        
        {/* Auth */}
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/AdminLogin/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/AdminLogin/VerifayPassword" element={<VerifayPassword />} />
        <Route path="/AdminLogin/CreateNewPassword" element={<CreateNewPassword />} />
        
        {/* Register and set up store */}
        <Route path="/Register" element={<Register />} />
        <Route path="/Register/ThemeStore" element={<ThemeStore />} />
        <Route path="/Register/StoreProfile" element={<StoreProfile />} />
        <Route path="/Register/PricingPlan" element={<PricingPlan />} />
        <Route path="/Register/PaymentInfo" element={<PaymentInfo />} />
        
        {/* Dashboard */}
        <Route path="/Dashboard" element={<Home />}>
          {/* Personal Information */}
          <Route path="MainInfo" element={<MainInfo />}>
            <Route index element={<PersonalInformation />} />
            <Route path="EditInfo" element={<EditInfo />} />
            <Route path="StoreTheme" element={<StoreTheme />} />
            <Route path="EditStoreTheme" element={<EditStoreTheme />} />
            <Route path="StoreInformation" element={<StoreInformation />} />
            <Route path="EditStoreInformation" element={<EditStoreInformation />} />
            <Route path="PricingPlans" element={<PricingPlan />} />
            <Route path="PaymentInformation" element={<PaymentInfo />} />
          </Route>
          
          {/* Categories */}
          <Route path="categories" element={<AllCategory />} />
          <Route path="addCategory" element={<AddCategory />} />
          <Route path="editCategory/:id" element={<EditCategory />} />
          
          {/* Products */}
          <Route path="products" element={<AllProducts />} />
          <Route path="addProduct" element={<AddProduct />} />
          <Route path="EditProduct/:productId" element={<EditProduct />} />
          <Route path="products/:productId" element={<ViewProduct />} />
          
          {/* Orders */}
          <Route path="RecivedOrders" element={<RecivedOrders />} />
          <Route path="RecivedOrders/:orderId" element={<OrderDetails />} />
          <Route path="CancelOrder" element={<CancelOrder />} />
          <Route path="RefundRequests" element={<RefundRequests />} />
          
          {/* Profile */}
          <Route path="Profile" element={<Profile />} />
          
          {/* Promotions and discount */}
          <Route path="AllDiscounts" element={<AllDiscounts />} />
          
          {/* Support */}
          <Route path="support" element={<Support />} />
          <Route path="Faqs" element={<Faqs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );

}
export default App;