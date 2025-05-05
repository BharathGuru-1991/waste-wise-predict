
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getHistoricalData, getDayName } from "@/lib/waste-prediction";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AreaChart, BarChart } from "@/components/ui/charts";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { toast } from "@/components/ui/use-toast";

export default function HistoricalData() {
  const { user } = useAuth();
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [mealFilter, setMealFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserPredictions() {
      if (!user) return;
      
      try {
        setLoading(true);
        
        // Fetch user's saved predictions from Supabase
        const { data: savedPredictions, error } = await supabase
          .from("waste_predictions")
          .select("*")
          .order("created_at", { ascending: false });
        
        if (error) throw error;
        
        if (savedPredictions && savedPredictions.length > 0) {
          // Format data to match expected structure
          const formattedData = savedPredictions.map(prediction => ({
            id: prediction.id,
            date: new Date(prediction.created_at).toISOString().split('T')[0],
            dayOfWeek: getDayOfWeekFromName(prediction.day_of_week),
            mealType: prediction.meal_type,
            totalWasteKg: prediction.predicted_waste_kg,
            wasteByType: prediction.waste_types || []
          }));
          
          setData(formattedData);
          setFilteredData(formattedData);
        } else {
          // If no saved data, use mock data
          const historicalData = getHistoricalData(14);
          setData(historicalData);
          setFilteredData(historicalData);
        }
      } catch (error: any) {
        toast({
          title: "Error loading history",
          description: error.message,
          variant: "destructive"
        });
        
        // Fallback to mock data
        const historicalData = getHistoricalData(14);
        setData(historicalData);
        setFilteredData(historicalData);
      } finally {
        setLoading(false);
      }
    }
    
    fetchUserPredictions();
  }, [user]);

  useEffect(() => {
    if (mealFilter === "all") {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter(item => item.mealType === mealFilter));
    }
  }, [mealFilter, data]);

  // Helper function to convert day name to number
  function getDayOfWeekFromName(dayName: string): number {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days.indexOf(dayName);
  }

  // Prepare data for trend chart - aggregate by day
  const trendData = filteredData.reduce((acc: any[], item) => {
    const existingDay = acc.find(d => d.date === item.date);
    if (existingDay) {
      existingDay.waste += item.totalWasteKg;
    } else {
      acc.push({
        date: item.date,
        day: getDayName(item.dayOfWeek),
        waste: item.totalWasteKg
      });
    }
    return acc;
  }, []).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Prepare data for meal comparison
  const mealComparisonData = ["Breakfast", "Lunch", "Dinner"].map(meal => ({
    name: meal,
    average: Math.round(data.filter(item => item.mealType === meal)
      .reduce((sum, item) => sum + item.totalWasteKg, 0) / 
      Math.max(1, data.filter(item => item.mealType === meal).length) * 10) / 10
  }));

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <p>Loading historical data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Historical Waste Data</h2>
        <div className="w-40">
          <Select value={mealFilter} onValueChange={setMealFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by meal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Meals</SelectItem>
              <SelectItem value="Breakfast">Breakfast</SelectItem>
              <SelectItem value="Lunch">Lunch</SelectItem>
              <SelectItem value="Dinner">Dinner</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="trends">
        <TabsList className="mb-4">
          <TabsTrigger value="trends">Waste Trends</TabsTrigger>
          <TabsTrigger value="meals">Meal Comparison</TabsTrigger>
        </TabsList>
        
        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Food Waste Trends</CardTitle>
              <CardDescription>
                Historical food waste data over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <AreaChart
                  data={trendData}
                  index="date"
                  categories={["waste"]}
                  colors={["emerald"]}
                  valueFormatter={(value) => `${value} kg`}
                  showAnimation={true}
                  className="h-full"
                  customTooltip={({ payload }) => {
                    if (!payload || payload.length === 0) return null;
                    return (
                      <div className="bg-white p-2 border rounded shadow">
                        <p className="font-medium">{payload[0].payload.day}</p>
                        <p className="text-eco-green-600">{payload[0].value} kg</p>
                      </div>
                    );
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="meals">
          <Card>
            <CardHeader>
              <CardTitle>Average Waste by Meal Type</CardTitle>
              <CardDescription>
                Comparison of waste generated by different meals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <BarChart
                  data={mealComparisonData}
                  index="name"
                  categories={["average"]}
                  colors={["emerald"]}
                  valueFormatter={(value) => `${value} kg`}
                  showAnimation={true}
                  className="h-full"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
