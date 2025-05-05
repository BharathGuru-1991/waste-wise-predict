
// This file simulates a machine learning model prediction
// In a real application, this would call an API with a trained ML model

export interface PredictionInput {
  date: string;
  dayOfWeek: number;
  mealType: string;
  studentsServed: number;
  eventFlag: boolean;
  commonFoodItems: string[];
}

export interface PredictionOutput {
  totalWasteKg: number;
  wasteByType: {
    category: string;
    amountKg: number;
    percentage: number;
  }[];
  suggestedPickupWindows: {
    startTime: string;
    endTime: string;
    suitability: 'high' | 'medium' | 'low';
  }[];
  accuracyScore: number;
}

// Helper function to get day name
export const getDayName = (dayNumber: number): string => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[dayNumber] || '';
};

// Sample food categories
export const foodCategories = [
  'Grains & Bread',
  'Vegetables',
  'Fruits',
  'Meat & Protein',
  'Dairy',
  'Desserts',
  'Beverages',
];

// Function to predict waste - this simulates what an ML model would do
export const predictWaste = (input: PredictionInput): PredictionOutput => {
  // In a real application, this would call a trained model API
  // For now, we'll use some basic heuristics to simulate predictions
  
  // Base prediction modified by various factors
  let basePrediction = 20; // Base average in kg
  
  // Day of week factor (weekends tend to have more waste)
  const dayFactors = [1.2, 0.8, 0.9, 1.0, 1.1, 1.3, 1.4]; // Sun through Sat
  const dayFactor = dayFactors[input.dayOfWeek];
  
  // Meal type factor
  const mealFactor = 
    input.mealType === 'Breakfast' ? 0.7 :
    input.mealType === 'Lunch' ? 1.1 : 
    input.mealType === 'Dinner' ? 1.2 : 1.0;
  
  // Students served factor (more students, more waste but not linearly)
  const studentFactor = Math.sqrt(input.studentsServed) / 15;
  
  // Special event factor
  const eventFactor = input.eventFlag ? 1.3 : 1.0;
  
  // Calculate total waste prediction
  const totalWasteKg = Math.round((basePrediction * dayFactor * mealFactor * studentFactor * eventFactor) * 10) / 10;
  
  // Generate waste by type (would be from model in real app)
  const wasteByType = foodCategories.map(category => {
    // Different types of waste based on meal
    let percentage = 0;
    
    if (category === 'Grains & Bread') {
      percentage = input.mealType === 'Breakfast' ? 0.25 : 0.20;
    } else if (category === 'Vegetables') {
      percentage = input.mealType === 'Dinner' ? 0.22 : 0.15;
    } else if (category === 'Fruits') {
      percentage = input.mealType === 'Breakfast' ? 0.18 : 0.10;
    } else if (category === 'Meat & Protein') {
      percentage = input.mealType === 'Dinner' ? 0.25 : 0.15;
    } else if (category === 'Dairy') {
      percentage = input.mealType === 'Breakfast' ? 0.20 : 0.10;
    } else if (category === 'Desserts') {
      percentage = input.mealType === 'Dinner' ? 0.15 : 0.08;
    } else {
      percentage = 0.05; // Beverages
    }
    
    // Add some randomization to make it more realistic
    percentage += (Math.random() * 0.1) - 0.05;
    
    // Ensure it's positive
    percentage = Math.max(0.01, percentage);
    
    return {
      category,
      amountKg: Math.round((totalWasteKg * percentage) * 10) / 10,
      percentage: Math.round(percentage * 100)
    };
  });
  
  // Normalize percentages to ensure they sum to 100%
  const totalPercentage = wasteByType.reduce((sum, item) => sum + item.percentage, 0);
  wasteByType.forEach(item => {
    item.percentage = Math.round((item.percentage / totalPercentage) * 100);
  });
  
  // Generate pickup windows based on meal type
  let suggestedPickupWindows = [];
  if (input.mealType === 'Breakfast') {
    suggestedPickupWindows = [
      { startTime: '10:30', endTime: '11:30', suitability: 'high' as const },
      { startTime: '11:30', endTime: '12:30', suitability: 'medium' as const }
    ];
  } else if (input.mealType === 'Lunch') {
    suggestedPickupWindows = [
      { startTime: '14:30', endTime: '15:30', suitability: 'high' as const },
      { startTime: '15:30', endTime: '16:30', suitability: 'medium' as const }
    ];
  } else { // Dinner
    suggestedPickupWindows = [
      { startTime: '21:00', endTime: '22:00', suitability: 'high' as const },
      { startTime: '08:00', endTime: '09:00', suitability: 'medium' as const, }
    ];
  }
  
  // Accuracy score (would come from model evaluation in real app)
  const accuracyScore = Math.round((0.85 + (Math.random() * 0.1)) * 100) / 100;
  
  return {
    totalWasteKg,
    wasteByType,
    suggestedPickupWindows,
    accuracyScore
  };
};

// Function to get historical data
export const getHistoricalData = (days: number = 14) => {
  const data = [];
  const today = new Date();
  
  for (let i = days; i > 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const dayOfWeek = date.getDay();
    
    // Generate the three meals for this day
    ['Breakfast', 'Lunch', 'Dinner'].forEach(mealType => {
      // Base values modified by day and meal
      const studentsServed = Math.floor(200 + Math.random() * 100);
      const eventFlag = Math.random() > 0.9; // 10% chance of event
      
      // Common food items for this meal
      const commonFoodItems = [
        'Rice', 'Bread', 'Vegetables', 'Chicken', 'Salad'
      ].filter(() => Math.random() > 0.3); // Randomly include items
      
      // Create prediction input
      const input: PredictionInput = {
        date: date.toISOString().split('T')[0],
        dayOfWeek,
        mealType,
        studentsServed,
        eventFlag,
        commonFoodItems
      };
      
      // Get prediction and add some historical variation
      const prediction = predictWaste(input);
      const actualWaste = prediction.totalWasteKg * (0.85 + Math.random() * 0.3);
      
      data.push({
        ...input,
        totalWasteKg: Math.round(actualWaste * 10) / 10,
        wasteByType: prediction.wasteByType.map(item => ({
          ...item,
          amountKg: Math.round((item.amountKg * (0.8 + Math.random() * 0.4)) * 10) / 10
        }))
      });
    });
  }
  
  return data;
};
