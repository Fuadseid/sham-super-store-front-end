import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/home/Home";
import Shop from "../pages/shop/Shop";
import MyAccount from "../pages/myAccount/MyAccount";
import ProductDetails from "../pages/shop/productDetails/ProductDetails";
import ProductsList from "../pages/shop/productsList/ProductsList";
import SubCategories from "../pages/shop/subCategories/SubCategories";
import StorePage from "../pages/shop/storePage/StorePage";
import About from "../pages/about/About";
import ContactUs from "../pages/contactUs/ContactUs";
import ContactForm from "../pages/shop/productDetails/contactForm/ContactForm";
import Compare from "../pages/shop/productDetails/compare/Compare";
import Cart from "../pages/cart/Cart";
import Checkout from "../pages/checkout/Checkout";

// Sellers Section Pages
import Sellers from "../pages/sellers/Sellers";
import VendorRegistration from "../pages/sellers/vendorRegistration/VendorRegistration";
import VendorMembership from "../pages/sellers/vendorMembership/VendorMembership";
import StoreManager from "../pages/sellers/storeManager/StoreManager";
import VendorsDriversManager from "../pages/sellers/vendorsDriversManager/VendorsDriversManager";
import StoresList from "../pages/sellers/storesList/StoresList";

// Delivery Drivers Section Pages
import DeliveryDrivers from "../pages/deliveryDrivers/DeliveryDrivers";
import DeliveryDriversManager from "../pages/deliveryDrivers/deliveryDriversManager/DeliveryDriversManager";
import DeliveryDriversApp from "../pages/deliveryDrivers/deliveryDriversApp/DeliveryDriversApp";
import PrivacyPolicy from "../components/privacyPolicy/PrivacyPolicy";
import TermsConditions from "../components/termsConditions/TermsConditions";
import ReturnPolicy from "../components/returnPolicy/ReturnPolicy";
import LocationMap from "../pages/home/Map/LocationMap";
import TrackOrder from "../pages/home/Map/TrackOrder";
import OrderSuccess from "../pages/checkout/OrderSuccess";
/* import Map from '../pages/home/Map/Map'
 */
export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-conditions" element={<TermsConditions />} />
      <Route path="/return-and-refunds-policy" element={<ReturnPolicy />} />
      <Route path="/location/:id" element={<LocationMap />} />
      <Route path="/track/:orderId" element={<TrackOrder />} />
      <Route path="/order/success" element={<OrderSuccess />} />
      {/* Shop Pages and Sections */}
      <Route path="/shop" element={<Shop />} />
      <Route path="/shop/category/:categoryId" element={<SubCategories />} />
      <Route
        path="/shop/category/:categoryId/subcategory/:subcategoryId"
        element={<ProductsList />}
      />
      <Route path="/shop/product/:productId" element={<ProductDetails />} />
      <Route path="/shop/store/:storeId" element={<StorePage />} />{" "}
      {/* New Store route */}
      <Route path="/inquiry/:productId" element={<ContactForm />} />
      <Route path="/compare" element={<Compare />} />
      {/* End of Shop Pages and Sections */}
      {/* Cart and Checkout Pages */}
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      {/*       <Route path="/my-location" element ={<Map/>}/>
       */}
      {/* Sellers Section Pages */}
      <Route path="/sellers" element={<Sellers />} />
      <Route path="/vendor-registration" element={<VendorRegistration />} />
      <Route path="/vendor-membership" element={<VendorMembership />} />
      <Route path="/store-manager" element={<StoreManager />} />
      <Route
        path="/vendors-drivers-manager"
        element={<VendorsDriversManager />}
      />
      <Route path="/stores-list" element={<StoresList />} />
      {/* End of Sellers Section Pages */}
      {/* Delivery Drivers Section Pages */}
      <Route path="/delivery-drivers" element={<DeliveryDrivers />} />
      <Route
        path="/delivery-drivers-manager"
        element={<DeliveryDriversManager />}
      />
      <Route path="/delivery-drivers-app" element={<DeliveryDriversApp />} />
      {/* End of Delivery Drivers Section Pages */}
      <Route path="/my-account" element={<MyAccount />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<ContactUs />} />
    </Routes>
  );
};
