import { Session, Trainer } from "@/types/types";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { useNavigate } from "react-router";

const mockAvailableSessions = [
  {
    id: "1",
    type: "Padel",
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
    type: "Tennis",
    trainers: [
      {
        id: "3",
        name: "Mike",
      },
    ],
  },
  {
    id: "3",
    type: "Fitness",
    trainers: [
      {
        id: "4",
        name: "Anna",
      },
      {
        id: "5",
        name: "Tom",
      },
      {
        id: "6",
        name: "Emma",
      },
    ],
  },
];

interface SessionCardProps {
  session: Session;
}

const SessionCard = ({ session }: SessionCardProps) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/your-bookings?sessionId=${session.id}`)}
      className="p-4 border rounded-md shadow-sm space-y-2 bg-gray-50 w-[19%] h-[150px] flex flex-col items-center justify-center gap-3 hover:border-blue-400 border-2 transition cursor-pointer"
    >
      <p>
        <span className="font-medium">Session:</span> {session.type}
      </p>
      <p>
        <span className="font-medium">Trainer:</span>{" "}
        {session.trainers.map((trainer) => trainer.name).join(", ")}
      </p>
    </div>
  );
};

const AvailableSessions = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  return (
    <div>
      <h1 className="text-xl font-semibold mb-2">Available Sessions</h1>
      <div className="flex space-x-4">
        {mockAvailableSessions.map((session, index) => (
          <>
            {!isLoading ? (
              <SessionCard
                key={session.id}
                session={session}
              />
            ) : (
              <Skeleton key={index} className="w-[19%] h-[150px]" />
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default AvailableSessions;
