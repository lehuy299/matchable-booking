import { useState } from "react";
import YourBookings from "./components/YourBookings";
import CheckoutPage from "./components/CheckoutPage";
import Topbar from "./components/Topbar";
import { Route, Routes } from "react-router";
import { Cart } from "./types/types";
import AvailableSessions from "./components/AvailableSessions";
import LoginPage from "./components/LoginPage";

function App() {
  const [cartList, setCartList] = useState<Cart[]>([]);

  const handleRemoveFromCart = (index: number) => {
    const updatedCart = [...cartList];
    updatedCart.splice(index, 1);
    setCartList(updatedCart);
  };

  return (
    <div className="w-full">
      <Topbar cartList={cartList} />
      <div className="w-full p-6">
        <Routes>
          <Route path="available-bookings" element={<AvailableSessions />} />
          <Route
            path="your-bookings"
            element={
              <YourBookings
                setCartList={setCartList}
                cartList={cartList}
              />
            }
          />
          <Route
            path="checkout"
            element={
              <CheckoutPage
                cartList={cartList}
                onRemove={handleRemoveFromCart}
              />
            }
          />
          <Route path='login' element={<LoginPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
