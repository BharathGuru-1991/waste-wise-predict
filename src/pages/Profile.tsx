import PageContainer from "@/components/layout/PageContainer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Profile() {
  return (
    <PageContainer>
      <div className="max-w-md mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">About WasteWise Predict</h1>
          <p className="text-muted-foreground">
            Information about the waste prediction system
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>System Information</CardTitle>
            <CardDescription>
              Details about the waste prediction system
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>System Name</Label>
              <Input value="WasteWise Predict" disabled />
            </div>

            <div className="space-y-2">
              <Label>Version</Label>
              <Input value="1.0.0" disabled />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Input value="AI-powered food waste prediction system" disabled />
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
