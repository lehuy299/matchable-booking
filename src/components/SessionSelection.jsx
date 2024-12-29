import React, { useState } from "react";
import { add, areIntervalsOverlapping, format } from "date-fns";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Mock available sessions and bookings
const availableSessions = [
  {
    id: 1,
    type: "Padel",
    price: 50,
    trainers: ["John", "Sara"],
  },
  {
    id: 2,
    type: "Fitness",
    price: 40,
    trainers: ["Tom", "Anna"],
  },
  {
    id: 3,
    type: "Tennis",
    price: 60,
    trainers: ["Mike", "Emma"],
  },
];

// Mock booked sessions for trainers
const mockBookings = [
  {
    session: "Padel",
    trainer: "John",
    startTime: new Date("2024-12-28T10:00"),
    endTime: new Date("2024-12-28T12:00"),
  },
  {
    session: "Padel",
    trainer: "Sara",
    startTime: new Date("2024-12-28T09:00"),
    endTime: new Date("2024-12-28T10:30"),
  },
  {
    session: "Tennis",
    trainer: "Mike",
    startTime: new Date("2024-12-28T15:00"),
    endTime: new Date("2024-12-28T16:00"),
  },
];

const BookingCard = ({ booking }) => (
  <div
    className="p-4 border rounded-md shadow-sm space-y-2 bg-gray-50 w-[300px] h-[150px]"
  >
    <p>
      <span className="font-medium">Session:</span> {booking.session}
    </p>
    <p>
      <span className="font-medium">Trainer:</span> {booking.trainer}
    </p>
    <p>
      <span className="font-medium">Start Time:</span>{" "}
      {format(booking.startTime, "yyyy-MM-dd HH:mm")}
    </p>
    <p>
      <span className="font-medium">End Time:</span>{" "}
      {format(booking.endTime, "yyyy-MM-dd HH:mm")}
    </p>
  </div>
);

function SessionSelection() {
  const [selectedSession, setSelectedSession] = useState(null);
  const [cartList, setCartList] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [selectedDuration, setSelectedDuration] = useState(1);
  const [selectedTrainer, setSelectedTrainer] = useState("");

  const handleAddToCart = () => {
    if (
      !selectedSession ||
      !startTime ||
      !selectedDuration ||
      !selectedTrainer
    ) {
      alert("Please fill all fields.");
      return;
    }

    const startDateTime = new Date(startTime);
    const endDateTime = add(startDateTime, { hours: Number(selectedDuration) });

    // Check if the trainer is already booked
    const isTrainerOccupied = [...mockBookings, ...cartList].some(
      (booking) =>
        booking.trainer === selectedTrainer &&
        areIntervalsOverlapping(
          { start: booking.startTime, end: booking.endTime },
          { start: startDateTime, end: endDateTime }
        )
    );

    if (isTrainerOccupied) {
      alert(
        `The trainer ${selectedTrainer} is already booked during this time slot.`
      );
      return;
    }

    const sessionDetails = {
      sessionType: selectedSession.type,
      startTime: startDateTime.toISOString(),
      endTime: endDateTime.toISOString(),
      trainer: selectedTrainer,
      duration: selectedDuration,
      price: selectedSession.price * selectedDuration,
    };

    setCartList([...cartList, sessionDetails]);

    // Reset state
    setSelectedSession(null);
    setStartTime("");
    setSelectedTrainer("");
    setSelectedDuration(1);
  };

  return (
    <div className="space-y-6">
      {/* Available Bookings */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Available Bookings</h2>
        {mockBookings.length === 0 ? (
          <p className="text-sm text-gray-500">No bookings found.</p>
        ) : (
          <div className="flex gap-2">
            {mockBookings.map((booking, index) => (
              <BookingCard key={index} booking={booking} />
            ))}
          </div>
        )}
      </div>
      {/* Session Selection Form */}
      <div className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium">
            Select Session
          </label>
          <Select
            onValueChange={(value) =>
              setSelectedSession(
                availableSessions.find((s) => s.type === value)
              )
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Session Type" />
            </SelectTrigger>
            <SelectContent>
              {availableSessions.map((session) => (
                <SelectItem key={session.id} value={session.type}>
                  {session.type} - ${session.price} per hour
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">
            Select Time and Duration
          </label>
          <Input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <Select onValueChange={(value) => setSelectedDuration(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Duration (Hours)" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4].map((hour) => (
                <SelectItem key={hour} value={hour}>
                  {hour} Hour{hour > 1 ? "s" : ""}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">
            Select Trainer
          </label>
          <Select
            onValueChange={(value) => setSelectedTrainer(value)}
            disabled={!selectedSession}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Trainer" />
            </SelectTrigger>
            <SelectContent>
              {selectedSession?.trainers.map((trainer, index) => (
                <SelectItem key={index} value={trainer}>
                  {trainer}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Button
            onClick={handleAddToCart}
            disabled={
              !selectedSession ||
              !startTime ||
              !selectedDuration ||
              !selectedTrainer
            }
            className="w-full"
          >
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Cart List */}
      <div className="">
        <h2 className="text-lg font-semibold mb-4">Cart</h2>
        {cartList.length === 0 ? (
          <p className="text-sm text-gray-500">
            No sessions added to the cart.
          </p>
        ) : (
          <div className="flex gap-2">
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
      </div>
    </div>
  );
}

export default SessionSelection;
