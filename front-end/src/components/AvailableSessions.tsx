import { Session, Trainer } from "@/types/types";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { useNavigate } from "react-router";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import { MultiSelect } from "./ui/multi-select";
import { Button } from "./ui/button";

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

const mockTrainer = [
  {
    id: "1",
    name: "John",
    price: 50,
  },
  {
    id: "2",
    name: "Sara",
    price: 40,
  },
  {
    id: "3",
    name: "Tom",
    price: 60,
  },
  {
    id: "4",
    name: "Anna",
    price: 60,
  },
  {
    id: "5",
    name: "Mike",
    price: 60,
  },
  {
    id: "6",
    name: "Emma",
    price: 60,
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
  const [selectedSessionId, setSelectedSessionId] = useState<
    string | undefined
  >();
  const selectSession = mockAvailableSessions.find(
    (session) => session.id === selectedSessionId
  );
  const [selectedTrainerIds, setSelectedTrainerIds] = useState<string[]>([]);
  const [filteredSessions, setFilteredSessions] = useState(
    mockAvailableSessions
  );

  const trainerList = mockTrainer.map((trainer) => ({
    value: trainer.id,
    label: trainer.name,
  }));

  useEffect(() => {
    const filtered = mockAvailableSessions.filter((session) => {
      const matchesSession =
        !selectedSessionId || session.id === selectedSessionId;
      const matchesTrainer =
        selectedTrainerIds.length === 0 ||
        session.trainers.some((trainer) =>
          selectedTrainerIds.includes(trainer.id)
        );
      return matchesSession && matchesTrainer;
    });
    setFilteredSessions(filtered);
  }, [selectedSessionId, selectedTrainerIds]);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  return (
    <div>
      <h1 className="text-xl font-semibold mb-2">Available Sessions</h1>
      <div className="flex space-x-4 mb-6">
        <Select
          value={selectedSessionId}
          onValueChange={(value) => setSelectedSessionId(value)}
        >
          <SelectTrigger className="w-[200px] h-[40px] border-0 shadow hover:border-blue-500">
            {selectedSessionId ? selectSession?.type : "Select Session Type"}
          </SelectTrigger>
          <SelectContent>
            {mockAvailableSessions.map((session) => (
              <SelectItem key={session.id} value={session.id}>
                {session.type}
              </SelectItem>
            ))}
            <Button
              className="w-full px-2"
              variant="secondary"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedSessionId(undefined);
              }}
            >
              Clear
            </Button>
          </SelectContent>
        </Select>
        <MultiSelect
          options={trainerList}
          onValueChange={setSelectedTrainerIds}
          defaultValue={selectedTrainerIds}
          placeholder="Select trainers"
          variant="inverted"
          animation={2}
          maxCount={3}
          className="w-[300px] shadow"
        />
      </div>
      <div className="flex space-x-4">
        {filteredSessions.map((session, index) => (
          <>
            {!isLoading ? (
              <SessionCard key={session.id} session={session} />
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
