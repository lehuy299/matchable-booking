import React, { useState } from "react";
import YourBookings from "./components/YourBookings";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import CheckoutPage from "./components/CheckoutPage";
import Topbar from "./components/Topbar";
import { Route, Routes } from "react-router";
import { Cart } from "./types/types";

function App() {
  const [cartList, setCartList] = useState<Cart[]>([]);
  const [showCart, setShowCart] = useState(false);

  const handleRemoveFromCart = (index: number) => {
    const updatedCart = [...cartList];
    updatedCart.splice(index, 1);
    setCartList(updatedCart);
  };

  const handleViewCart = () => {
    setShowCart(true);
  };

  return (
    <div className="w-full">
      <Topbar onViewCart={handleViewCart} cartList={cartList} />
      <div className="w-full p-6">
        {/* {
          step === 'booking' &&
          <>
            <YourBookings setCartList={setCartList} cartList={cartList} setStep={setStep} />
          </>
        }
        {
          step === 'cart' &&
          <>
            <Button className='mb-4' variant="outline" onClick={() => setStep('booking')}>
              <ChevronLeft /> Go back
            </Button>
            <CheckoutPage cartList={cartList} onRemove={handleRemoveFromCart} setStep={setStep} />
          </>
        } */}
        <Routes>
          <Route path="available-bookings" element={<div />} />
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
        </Routes>
      </div>
    </div>
  );
}

export default App;
