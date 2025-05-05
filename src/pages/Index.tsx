
import { useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import PredictionForm from "@/components/prediction/PredictionForm";
import PredictionResults from "@/components/prediction/PredictionResults";
import { PredictionInput, PredictionOutput, predictWaste } from "@/lib/waste-prediction";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, BarChart, Clock } from "lucide-react";

export default function Index() {
  const [prediction, setPrediction] = useState<PredictionOutput | null>(null);

  const handlePredict = (input: PredictionInput) => {
    const result = predictWaste(input);
    setPrediction(result);
  };

  return (
    <PageContainer>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Food Waste Prediction Dashboard</h1>
        <p className="text-muted-foreground">
          Predict food waste quantities and optimize donation pickups
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <div className="h-12 w-12 rounded-full bg-eco-green-100 flex items-center justify-center mb-4">
              <Leaf className="h-6 w-6 text-eco-green-500" />
            </div>
            <CardTitle className="mb-2">Reduce Waste</CardTitle>
            <CardDescription className="text-center">
              Predict and manage food waste to reduce environmental impact
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <div className="h-12 w-12 rounded-full bg-eco-blue-100 flex items-center justify-center mb-4">
              <BarChart className="h-6 w-6 text-eco-blue-500" />
            </div>
            <CardTitle className="mb-2">Data-Driven</CardTitle>
            <CardDescription className="text-center">
              Use machine learning to make accurate predictions
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <div className="h-12 w-12 rounded-full bg-eco-brown-100 flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-eco-brown-500" />
            </div>
            <CardTitle className="mb-2">Optimize Pickups</CardTitle>
            <CardDescription className="text-center">
              Schedule food donation pickups at optimal times
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <PredictionForm onPredict={handlePredict} />
        </div>
        <div className="lg:col-span-2">
          {prediction ? (
            <PredictionResults prediction={prediction} />
          ) : (
            <Card className="h-full flex items-center justify-center p-6">
              <div className="text-center">
                <div className="mx-auto h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-4">
                  <BarChart className="h-10 w-10 text-muted-foreground" />
                </div>
                <CardTitle className="mb-2">No Prediction Yet</CardTitle>
                <CardDescription>
                  Fill out the form to generate food waste predictions
                </CardDescription>
              </div>
            </Card>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
