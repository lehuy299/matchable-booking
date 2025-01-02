import React, { useEffect, useState } from "react";
import { add, format } from "date-fns";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Cart } from "@/types/types";

// Mock available sessions and bookings
const availableSessions = [
  {
    id: "1",
    type: "Padel",
    price: 50,
    trainers: [
      {
        id: "1",
        name: "John",
      },
      {
        id: "2",
        name: "Sara",
      },
    ],
  },
  {
    id: "2",
    type: "Fitness",
    price: 40,
    trainers: [
      {
        id: "3",
        name: "Tom",
      },
      {
        id: "4",
        name: "Anna",
      },
    ],
  },
  {
    id: "3",
    type: "Tennis",
    trainers: [
      {
        id: "3",
        name: "Mike",
      },
      {
        id: "6",
        name: "Emma",
      },
    ],
  },
];

// Mock booked sessions for trainers
const mockBookings = [
  {
    session: "Padel",
    trainer: {
      id: "1",
      name: "John",
      price: 50,
    },
    startTime: new Date("2024-12-28T10:00"),
    endTime: new Date("2024-12-28T12:00"),
  },
  {
    session: "Padel",
    trainer: {
      id: "2",
      name: "Sara",
      price: 40,
    },
    startTime: new Date("2024-12-28T09:00"),
    endTime: new Date("2024-12-28T10:30"),
  },
  {
    session: "Tennis",
    trainer: {
      id: "3",
      name: "Mike",
      price: 60,
    },
    startTime: new Date("2024-12-28T15:00"),
    endTime: new Date("2024-12-28T16:00"),
  },
  {
    session: "Padel",
    trainer: {
      id: "1",
      name: "John",
      price: 50,
    },
    startTime: new Date("2024-12-28T10:00"),
    endTime: new Date("2024-12-28T12:00"),
  },
  {
    session: "Padel",
    trainer: {
      id: "2",
      name: "Sara",
      price: 40,
    },
    startTime: new Date("2024-12-28T09:00"),
    endTime: new Date("2024-12-28T10:30"),
  },
  {
    session: "Tennis",
    trainer: {
      id: "3",
      name: "Mike",
      price: 60,
    },
    startTime: new Date("2024-12-28T15:00"),
    endTime: new Date("2024-12-28T16:00"),
  },
];

// const mockTrainer = [
//   {
//     id: 1,
//     name: "John",
//     price: 50,
//   },
//   {
//     id: 2,
//     name: "Sara",
//     price: 40,
//   },
//   {
//     id: 3,
//     name: "Tom",
//     price: 60,
//   },
//   {
//     id: 4,
//     name: "Anna",
//     price: 60,
//   },
//   {
//     id: 5,
//     name: "Mike",
//     price: 60,
//   },
//   {
//     id: 6,
//     name: "Emma",
//     price: 60,
//   },
// ];

interface BookingCardProps {
  booking: {
    session: string;
    trainer: {
      id: string;
      name: string;
    };
    startTime: Date;
    endTime: Date;
  }
}

const BookingCard = ({ booking }: BookingCardProps) => (
  <div className="p-4 border rounded-md shadow-sm space-y-2 bg-gray-50 w-[19%] h-[150px]">
    <p>
      <span className="font-medium">Session:</span> {booking.session}
    </p>
    <p>
      <span className="font-medium">Trainer:</span> {booking.trainer.name}
    </p>
    <p>
      <span className="font-medium">Start date:</span>{" "}
      {format(booking.startTime, "yyyy-MM-dd")}
    </p>
    <p>
      <span className="font-medium">Time slot:</span>{" "}
      {format(booking.startTime, "HH:mm")} - {format(booking.endTime, "HH:mm")}
    </p>
  </div>
);

interface YourBookingsProps {
  cartList: Cart[];
  setCartList: (value: Cart[]) => void;
}

function YourBookings({ cartList, setCartList }: YourBookingsProps) {
  const [selectedSessionId, setSelectedSessionId] = useState<string>('');
  const selectedSession = availableSessions.find((session) => session.id === selectedSessionId);
  const [startTime, setStartTime] = useState("");
  const [selectedDuration, setSelectedDuration] = useState<string>('1');
  const [selectedTrainerId, setSelectedTrainerId] = useState("");
  const selectedTrainer = selectedSession?.trainers.find((trainer) => trainer.id === selectedTrainerId);
  const [isLoading, setIsLoading] = useState(false);

  console.log('selectedSessionId', selectedSessionId);
  console.log('selectedTrainer', selectedTrainer);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

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

    const sessionDetails = {
      sessionType: selectedSession.type,
      startTime: startDateTime.toISOString(),
      endTime: endDateTime.toISOString(),
      trainer: selectedTrainer.name,
      duration: Number(selectedDuration),
      price: selectedSession.price! * Number(selectedDuration),
    };

    setCartList([...cartList, sessionDetails]);
  };

  return (
    <div className="space-y-6">
      {/* Available Bookings */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Your Bookings</h2>
        {mockBookings.length === 0 ? (
          <p className="text-sm text-gray-500">No bookings found.</p>
        ) : (
          <div className="flex flex-wrap gap-x-[1%] gap-y-4">
            {mockBookings.map((booking, index) => (
              <>
                {!isLoading ? (
                  <BookingCard key={index} booking={booking} />
                ) : (
                  <Skeleton key={index} className="w-[19%] h-[150px]" />
                )}
              </>
            ))}
          </div>
        )}
      </div>
      {/* Session Selection Form */}
      <div className="space-y-4 w-2/3 ml-auto mr-auto">
        <h2 className="text-lg font-bold">Book your own session</h2>
        <div>
          <Label className="block mb-2 text-sm font-medium">Session</Label>
          <Select onValueChange={(value) => setSelectedSessionId(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Session Type" />
            </SelectTrigger>
            <SelectContent>
              {availableSessions.map((session) => (
                <SelectItem key={session.id} value={session.id}>
                  {session.type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="block mb-2 text-sm font-medium">
            Select Trainer
          </Label>
          <Select
            onValueChange={(value) => setSelectedTrainerId(value)}
            disabled={!selectedSessionId}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Trainer" />
            </SelectTrigger>
            <SelectContent>
              {selectedSession?.trainers.map((trainer) => (
                <SelectItem key={trainer.id} value={trainer.id}>
                  {trainer.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Label className="block text-sm font-medium">Time and Duration</Label>
        <div className="flex space-x-4">
          <div className="w-1/2 -mt-2">
            <Input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="w-1/2 -mt-2">
            <Select onValueChange={(value) => setSelectedDuration(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Duration (Hours)" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4].map((hour) => (
                  <SelectItem key={hour} value={hour.toString()}>
                    {hour} Hour{hour > 1 ? "s" : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
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
    </div>
  );
}

export default YourBookings;
