import React from "react";
import BookingForm from "./BookingForm";
import CartOverview from "./CartOverview";

const CheckoutPage = ({ cartList, onRemove }) => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Booking Form */}
        <BookingForm />

        {/* Cart Overview */}
        <CartOverview cartList={cartList} onRemove={onRemove} />
      </div>
    </div>
  );
};

export default CheckoutPage;