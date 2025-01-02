import React from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { format } from "date-fns";

const CartItem = ({ item }) => (
  <div className="p-4 border rounded-md shadow-sm space-y-2 bg-gray-50 h-[150px]">
    <p>
      <span className="font-medium">Session:</span> {item.session}
    </p>
    <p>
      <span className="font-medium">Trainer:</span> {item.trainer.name}
    </p>
    <p>
      <span className="font-medium">Start date:</span>{" "}
      {format(item.startTime, "yyyy-MM-dd")}
    </p>
    <p>
      <span className="font-medium">Time slot:</span>{" "}
      {format(item.startTime, "HH:mm")} - {item.duration} Hour
      {item.duration > 1 ? "s" : ""}
    </p>
  </div>
);

function Topbar({ onViewCart, cartList }) {
  return (
    <div className="bg-zinc-900 text-white p-4 flex justify-between items-center shadow-md">
      <div className="flex gap-4 align-middle">
        <div className="text-xl font-bold">Matchable</div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink href="/available-bookings" className={`${navigationMenuTriggerStyle()} cursor-pointer`}>
                Available Bookings
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/your-bookings" className={`${navigationMenuTriggerStyle()} cursor-pointer`}>
                Your Bookings
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/checkout" className={`${navigationMenuTriggerStyle()} cursor-pointer`}>
                Checkout
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <Popover className="left-4">
        <PopoverTrigger asChild>
          <Button
            onClick={onViewCart}
            size="icon"
            className="bg-white hover:bg-gray-100 hover:border-gray-100 text-black rounded-full transition duration-200 mr-2 relative"
          >
            <ShoppingCart className="w-8 h-8" />
            {!!cartList.length && (
              <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex justify-center items-center text-xs">
                {cartList.length}
              </div>
            )}
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
                <CartItem key={index} item={item} />
              ))}
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default Topbar;
