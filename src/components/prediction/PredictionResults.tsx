
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PredictionOutput } from "@/lib/waste-prediction";
import { BarChart, PieChart } from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";

interface PredictionResultsProps {
  prediction: PredictionOutput | null;
}

export default function PredictionResults({ prediction }: PredictionResultsProps) {
  if (!prediction) {
    return null;
  }

  // Prepare data for charts
  const pieChartData = prediction.wasteByType.map(item => ({
    name: item.category,
    value: item.amountKg,
    fill: getColorForCategory(item.category)
  }));

  const barChartData = prediction.wasteByType.map(item => ({
    name: item.category,
    amount: item.amountKg
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Predicted Waste
            <Badge variant="outline" className="ml-2">
              {prediction.accuracyScore * 100}% accuracy
            </Badge>
          </CardTitle>
          <CardDescription>
            Total predicted waste: <span className="font-bold text-eco-green-600">{prediction.totalWasteKg} kg</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <PieChart
              data={pieChartData}
              index="name"
              categories={["value"]}
              valueFormatter={(value) => `${value} kg`}
              showAnimation={true}
              className="h-full w-full"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Waste by Category</CardTitle>
          <CardDescription>
            Breakdown of waste by food category
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <BarChart
              data={barChartData}
              index="name"
              categories={["amount"]}
              valueFormatter={(value) => `${value} kg`}
              showAnimation={true}
              className="h-full w-full"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Suggested Pickup Windows</CardTitle>
          <CardDescription>
            Optimal times for food waste collection
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {prediction.suggestedPickupWindows.map((window, index) => (
              <Card key={index} className={cn(
                "border-2",
                window.suitability === 'high' ? "border-eco-green-500" :
                window.suitability === 'medium' ? "border-eco-blue-400" : "border-eco-brown-300"
              )}>
                <CardContent className="p-4">
                  <div className="text-center space-y-1">
                    <div className="text-lg font-bold">{window.startTime} - {window.endTime}</div>
                    <Badge variant={
                      window.suitability === 'high' ? "default" :
                      window.suitability === 'medium' ? "secondary" : "outline"
                    }
                    className={
                      window.suitability === 'high' ? "bg-eco-green-500" :
                      window.suitability === 'medium' ? "bg-eco-blue-400" : ""
                    }>
                      {window.suitability === 'high' ? 'Highly Recommended' :
                      window.suitability === 'medium' ? 'Recommended' : 'Alternative Option'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

function getColorForCategory(category: string): string {
  const colorMap: Record<string, string> = {
    'Grains & Bread': '#e3d7c6',
    'Vegetables': '#4caf50',
    'Fruits': '#8ece8e',
    'Meat & Protein': '#b99c71',
    'Dairy': '#cce7f3',
    'Desserts': '#d5c4aa',
    'Beverages': '#99cfe7',
  };
  
  return colorMap[category] || '#4caf50';
}
