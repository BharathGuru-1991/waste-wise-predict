
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getHistoricalData, getDayName } from "@/lib/waste-prediction";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpDown, Download, Upload } from "lucide-react";

export default function DataManagement() {
  const [data] = useState(getHistoricalData(7));
  
  const sortedData = [...data].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-6">
      <Tabs defaultValue="view">
        <TabsList className="mb-4">
          <TabsTrigger value="view">View Data</TabsTrigger>
          <TabsTrigger value="import">Import/Export</TabsTrigger>
        </TabsList>
        
        <TabsContent value="view">
          <Card>
            <CardHeader>
              <CardTitle>Recent Data Records</CardTitle>
              <CardDescription>
                View your recent food waste data records
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        <div className="flex items-center space-x-1">
                          <span>Date</span>
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead>Day</TableHead>
                      <TableHead>Meal</TableHead>
                      <TableHead>Students</TableHead>
                      <TableHead className="text-right">Waste (kg)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedData.slice(0, 10).map((item, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">{item.date}</TableCell>
                        <TableCell>{getDayName(item.dayOfWeek)}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={
                            item.mealType === 'Breakfast' ? 'bg-eco-blue-100 text-eco-blue-800' :
                            item.mealType === 'Lunch' ? 'bg-eco-green-100 text-eco-green-800' :
                            'bg-eco-brown-100 text-eco-brown-800'
                          }>
                            {item.mealType}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {item.studentsServed}
                          {item.eventFlag && <Badge className="ml-2 bg-amber-500">Event</Badge>}
                        </TableCell>
                        <TableCell className="text-right">{item.totalWasteKg}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="import">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Import Data</CardTitle>
                <CardDescription>
                  Upload historical food waste data to improve predictions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Drag and drop your CSV file or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Supports CSV files with columns: date, day_of_week, meal_type, students_served, event_flag, food_items, total_waste_kg
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  Upload Data File
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Export Data</CardTitle>
                <CardDescription>
                  Download your food waste data for analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">
                  Export your data in various formats for external analysis or reporting.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Button variant="outline" className="flex items-center justify-center gap-2">
                    <Download className="h-4 w-4" /> CSV Format
                  </Button>
                  <Button variant="outline" className="flex items-center justify-center gap-2">
                    <Download className="h-4 w-4" /> Excel Format
                  </Button>
                  <Button variant="outline" className="flex items-center justify-center gap-2">
                    <Download className="h-4 w-4" /> JSON Format
                  </Button>
                  <Button variant="outline" className="flex items-center justify-center gap-2">
                    <Download className="h-4 w-4" /> PDF Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
