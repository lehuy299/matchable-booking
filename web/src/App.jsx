import React, { useState } from "react";
import SessionSelection from "./components/SessionSelection";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import CheckoutPage from "./components/CheckoutPage";
import Topbar from "./components/Topbar";

function App() {
  const [cartList, setCartList] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [step, setStep] = useState('booking');

  const handleAddToCart = (session) => {
    setCartList([...cartList, session]);
  };

  const handleRemoveFromCart = (index) => {
    const updatedCart = [...cartList];
    updatedCart.splice(index, 1);
    setCartList(updatedCart);
  };

  const handleViewCart = () => {
    setShowCart(true);
  };

  return (
    <div className="w-full">
      {step === 'booking' && <Topbar onViewCart={handleViewCart} cartList={cartList} />}
      <div className="w-full p-6">
        {
          step === 'booking' &&
          <>
            <SessionSelection setCartList={setCartList} cartList={cartList} setStep={setStep} />
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
        }
      </div>
    </div>
  );
}

export default App;
