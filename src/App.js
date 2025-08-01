import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import AllCategory from "./Categories/All Categories/AllCategory";
import Home from "./Pages/Home page/Home";
import AddCategory from "./Categories/Add Category/AddCategory";
import EditCategory from "./Categories/Edit Category/EditCategory";
import AllProducts from "./Products/All Products/AllProducts";
import AddProduct from "./Products/Add Product/AddProduct";
import EditProduct from "./Products/Edit Product/EditProduct";
import ViewProduct from "./Products/View Product/ViewProduct";
import Login from "./Auth/Login/Login";
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
import StoreInformation from "./Store/Store Information/StoreInformation";
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
import AllCustomers from "./Customers/AllCustomers";
import CustomerDetail from "./Customers/CustomerDetail";
import AddDiscounts from "./DisCounts and Promotions/Add Discounts/AddDiscounts";
import ShippingProvider from "./Store/SetUp Store/ShippingProvider";
import ShippingProviders from "./Settings/Shipping Providers/ShippingProviders";
import PaymentMethods from "./Settings/Payment Methods/PaymentMethods";
import PaymentMethod from "./Store/SetUp Store/PaymentMethod";
import SupportQuestion from "./Settings/Support Questions/SupportQuestion";
import Requests from "./Settings/Support Questions/Requests";
import Pricing from "./Store/Pricing Plan/PricingPlan";
import Info from "./Store/Information/Info";
import Analytics from "./Analysis/Analytics";
import AllInvoices from "./Invoices/AllInvoices";
import InvoiceDetails from "./Invoices/InvoiceDetails";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Coupons from "./Coupons/Coupons";
//translation
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enTranslation from "./Translation/en.json";
import arTranslation from "./Translation/ar.json";
import Notifications from "./Profile/Notificatons";
// Initialize i18n
i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    lng: "en",
    resources: {
      en: {
        translation: enTranslation,
      },
      ar: {
        translation: arTranslation,
      },
    },
    fallbackLng: "en",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });
function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PulseLoader color="#E0A75E" size={17} />
      </div>
    );
  }
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<Main />} />
        <Route path="/GetDomain" element={<GetDomain />} />
        <Route
          path="/Dashboard"
          element={<Navigate to="/Dashboard/Home-dashboard" replace />}
        />
        {/* Auth */}
        <Route path="/Login" element={<Login />} />
        <Route path="/Login/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/Login/VerifayPassword" element={<VerifayPassword />} />
        <Route
          path="/Login/CreateNewPassword"
          element={<CreateNewPassword />}
        />
        {/* Register and set up store */}
        <Route path="/Register" element={<Register />} />
        <Route path="/Register/ThemeStore" element={<ThemeStore />} />
        <Route path="/Register/StoreProfile" element={<StoreProfile />} />
        <Route path="/Register/PricingPlan" element={<PricingPlan />} />
        <Route path="/Register/PaymentInfo" element={<PaymentInfo />} />
        <Route
          path="/Register/ShippingProvider"
          element={<ShippingProvider />}
        />
        <Route path="/Register/PaymentMethod" element={<PaymentMethod />} />
        {/* Dashboard */}
        <Route path="/Dashboard" element={<Home />}>
          <Route path="Home-dashboard" element={<Dashboard />} />
          {/* Personal Information */}
          <Route path="MainInfo" element={<MainInfo />}>
            <Route index element={<PersonalInformation />} />
            <Route path="EditInfo" element={<EditInfo />} />
            <Route path="StoreTheme" element={<StoreTheme />} />
            <Route path="StoreInformation" element={<StoreInformation />} />
            <Route path="Pricing" element={<Pricing />} />
            <Route path="Info" element={<Info />} />
            <Route path="PricingPlans" element={<PricingPlan />} />
            <Route path="PaymentInformation" element={<PaymentInfo />} />
          </Route>

          {/* Categories */}
          <Route path="categories" element={<AllCategory />} />
          <Route path="addCategory" element={<AddCategory />} />
          <Route path="editCategory/:id" element={<EditCategory />} />
          <Route path="Notifications" element={<Notifications />} />
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
          {/* Customers */}
          <Route path="AllCustomers" element={<AllCustomers />} />
          <Route path="AllCustomers/:customerId" element={<CustomerDetail />} />
          {/* Profile */}
          <Route path="Profile" element={<Profile />} />

          {/* Promotions and discount */}
          <Route path="AllDiscounts" element={<AllDiscounts />} />
          <Route path="AddDiscounts" element={<AddDiscounts />} />

          {/* Support */}
          <Route path="support" element={<Support />} />
          <Route path="Faqs" element={<Faqs />} />
          {/* settings */}
          <Route path="ShippingProviders" element={<ShippingProviders />} />
          <Route path="PaymentMethods" element={<PaymentMethods />} />
          <Route path="SupportQuestion" element={<SupportQuestion />} />
          <Route path="Requests" element={<Requests />} />
          {/* Analysis */}
          <Route path="Analytics" element={<Analytics />} />
          {/* invoices */}
          <Route path="AllInvoices" element={<AllInvoices />} />
          <Route path="AllInvoices/:id" element={<InvoiceDetails />} />
          <Route path="Coupons" element={<Coupons />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
