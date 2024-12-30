import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

function Topbar({ onViewCart, cartList }) {
  return (
    <div className="bg-zinc-900 text-white p-4 flex justify-between items-center shadow-md">
      {/* Brand Name */}
      <div className="text-xl font-bold">Matchable</div>

      {/* View Cart Button */}
      {/* <Button
        onClick={onViewCart}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-200"
      >
        View Cart
      </Button> */}
      <Popover className="left-4">
        <PopoverTrigger asChild>
          <Button
            onClick={onViewCart}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-200"
          >
            View Cart
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 mr-[15px]">
          {cartList.length === 0 ? (
            <p className="text-sm text-gray-500">
              No sessions added to the cart.
            </p>
          ) : (
            <div className="flex gap-2 flex-col">
              {cartList.map((item, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-md shadow-sm space-y-2 bg-gray-50 w-[300px] h-[186px]"
                >
                  <p>
                    <span className="font-medium">Session:</span>{" "}
                    {item.sessionType}
                  </p>
                  <p>
                    <span className="font-medium">Start Time:</span>{" "}
                    {format(item.startTime, "yyyy-MM-dd HH:mm")}
                  </p>
                  <p>
                    <span className="font-medium">End Time:</span>{" "}
                    {format(item.endTime, "yyyy-MM-dd HH:mm")}
                  </p>
                  <p>
                    <span className="font-medium">Trainer:</span> {item.trainer}
                  </p>
                  <p>
                    <span className="font-medium">Price:</span> ${item.price}
                  </p>
                </div>
              ))}
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default Topbar;
