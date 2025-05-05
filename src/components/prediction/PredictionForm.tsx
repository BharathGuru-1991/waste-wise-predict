
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { PredictionInput, getDayName } from "@/lib/waste-prediction";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface PredictionFormProps {
  onPredict: (input: PredictionInput) => void;
}

export default function PredictionForm({ onPredict }: PredictionFormProps) {
  const [date, setDate] = useState<Date>(new Date());
  const [mealType, setMealType] = useState<string>("Lunch");
  const [studentsServed, setStudentsServed] = useState<number>(200);
  const [hasEvent, setHasEvent] = useState<boolean>(false);
  const [commonFoodItems, setCommonFoodItems] = useState<string[]>(["Rice", "Vegetables", "Chicken"]);

  const handlePredict = () => {
    const input: PredictionInput = {
      date: format(date, "yyyy-MM-dd"),
      dayOfWeek: date.getDay(),
      mealType,
      studentsServed,
      eventFlag: hasEvent,
      commonFoodItems,
    };
    onPredict(input);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Predict Food Waste</CardTitle>
        <CardDescription>
          Enter details about the meal to predict waste quantity and types
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(date, "PPP")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => date && setDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <div className="text-sm text-muted-foreground">
              {getDayName(date.getDay())}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mealType">Meal Type</Label>
            <Select value={mealType} onValueChange={setMealType}>
              <SelectTrigger>
                <SelectValue placeholder="Select meal type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Breakfast">Breakfast</SelectItem>
                <SelectItem value="Lunch">Lunch</SelectItem>
                <SelectItem value="Dinner">Dinner</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="studentsServed">Number of Students</Label>
            <Input
              id="studentsServed"
              type="number"
              value={studentsServed}
              onChange={(e) => setStudentsServed(parseInt(e.target.value) || 0)}
            />
          </div>

          <div className="space-y-2">
            <Label className="block mb-4">Special Event</Label>
            <div className="flex items-center space-x-2">
              <Switch
                checked={hasEvent}
                onCheckedChange={setHasEvent}
              />
              <span>
                {hasEvent ? "Yes, special event" : "No special event"}
              </span>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <Button onClick={handlePredict} className="w-full">
            Generate Prediction
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
