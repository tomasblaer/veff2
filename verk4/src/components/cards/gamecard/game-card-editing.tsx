"use client";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { Game, Team } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CalendarIcon, CornerUpLeft, SaveIcon, XIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { deleteGame, updateGame } from "@/lib/games";
import { useRouter } from "next/navigation";
import PulseLoader from "react-spinners/PulseLoader";
import { useTheme } from "next-themes";
import { toast } from "react-hot-toast";

type GameCardEditingProps = {
  data: Game;
  teams: Team[];
  onEditClick: () => void;
};

type ReducerPayload = {
  variable: string;
  value: any;
};

function reducer(state: any, { variable, value }: ReducerPayload): any {
  return { ...state, [variable]: value };
}

export default function GameCardEditing({
  data,
  teams,
  onEditClick,
}: GameCardEditingProps) {
  const [state, dispatch] = useReducer(reducer, data);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();

  const { home, away, homeScore, awayScore, date } = state;

  const teamSelectOptions = useMemo(() => {
    return teams.map((team: Team) => {
      return (
        <SelectItem key={team.id} value={team.id.toString()}>
          {team.name}
        </SelectItem>
      );
    });
  }, [teams]);

  // Initial dispatch of passed data
  useEffect(() => {
    dispatch({ variable: "home", value: data.home });
    dispatch({ variable: "away", value: data.away });
    dispatch({ variable: "homeScore", value: data.homeScore });
    dispatch({ variable: "homeName", value: data.homeName });
    dispatch({ variable: "awayName", value: data.awayName });
    dispatch({ variable: "awayScore", value: data.awayScore });
    dispatch({ variable: "date", value: new Date(data.date) });
  }, [data]);

  const onUpdateGame = useCallback(async () => {
    if (submitting) return;
    setSubmitting(true);

    await updateGame(state)
      .then((res) => {
        if (res.hasOwnProperty("error")) {
          toast.error(`Villa við að uppfæra leik: ${res.error}`, {
            duration: 3000,
          });
        } else if (res.hasOwnProperty("errors")) {
          // Messaði þessu eitthvað pinu upp í api-inu
          toast.error(`Villa við að uppfæra leik: ${res.errors.length > 1 ? res.errors.join() : res.errors[0]}`, {
            duration: 3000,
          });
        } else {
          router.refresh();

          setTimeout(() => {
            onEditClick();
          }, 500); // sma forced lag herna
        }
      })
      .catch((err) => {
        console.error("Error updating game", err);
      })
      .finally(() => {
        setSubmitting(false);
      });

  }, [onEditClick, router, state, submitting]);

  const onDeleteGame = useCallback(async () => {
    await deleteGame(data.id)
      .then((res) => {
        if (res.hasOwnProperty("error")) {
          toast.error(`Villa við að uppfæra leik: ${res.error}`, {
            duration: 3000,
          });
        } else if (res.hasOwnProperty("errors")) {
          // Messaði þessu eitthvað pinu upp í api-inu
          toast.error(`Villa við að uppfæra leik: ${res.errors.length > 1 ? res.errors.join() : res.errors[0]}`, {
            duration: 3000,
          });
        } else {
          router.push("/");
        }
      })
      .catch((err) => {
        console.error("Error deleting game", err);
      });
  }, [data.id, router]);

  return (
    // Todo mætti vera shadcn form með validation :S
    <>
      <div className="col-start-1 flex">
        <Button
          variant="outline"
          onClick={onEditClick}
          className={cn("w-fit")}
          title="Hætta við breytingar"
        >
          <CornerUpLeft size={24} />
        </Button>
        <Button
          variant="outline"
          onClick={() => onUpdateGame()}
          className={cn("w-fit")}
          title="Vista breytingar"
        >
          {submitting ? (
            <PulseLoader
              size={4}
              color={theme === "dark" ? "#fff" : "#000"}
              loading={submitting}
            />
          ) : (
            <SaveIcon size={24} />
          )}
        </Button>
      </div>

      <Button
        variant="destructive"
        onClick={() => onDeleteGame()}
        className={cn("col-start-3 w-fit ml-auto")}
        title="Eyða leik"
      >
        <XIcon size={24} />
      </Button>
      <h1 className="text-center row-start-2 col-start-1 text-xl font-bold">
        Heimalið
      </h1>
      <div className="row-start-4">
        <Label htmlFor="homeScore">Mörk</Label>
        <Input
          type="number"
          onInput={(e) =>
            dispatch({
              variable: "homeScore",
              value: (e.target as HTMLInputElement).value,
            })
          }
          value={homeScore}
          id="homeScore"
        />
      </div>
      <div className="row-start-3">
        <Label htmlFor="home">Lið</Label>
        <Select
          value={home.toString()}
          onValueChange={(e) =>
            dispatch({ variable: "home", value: e.toString() })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Heimalið" />
          </SelectTrigger>
          <SelectContent>{teamSelectOptions}</SelectContent>
        </Select>
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Veldu dagsetningu</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) =>
              dispatch({ variable: "date", value: new Date(date!) })
            }
            defaultMonth={date || new Date()}
          ></Calendar>
        </PopoverContent>
      </Popover>

      <h1 className="text-center row-start-2 col-start-3 text-xl font-bold">
        Útilið
      </h1>
      <div className="row-start-3 col-start-3">
        <Label htmlFor="away">Lið</Label>
        <Select
          value={away.toString()}
          onValueChange={(e) =>
            dispatch({ variable: "away", value: e.toString() })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Heimalið" />
          </SelectTrigger>
          <SelectContent>{teamSelectOptions}</SelectContent>
        </Select>
      </div>
      <div className="row-start-4 col-start-3">
        <Label htmlFor="awayScore">Mörk</Label>
        <Input
          type="number"
          onInput={(e) =>
            dispatch({
              variable: "awayScore",
              value: (e.target as HTMLInputElement).value,
            })
          }
          value={awayScore}
          id="awayScore"
        />
      </div>
    </>
  );
}
