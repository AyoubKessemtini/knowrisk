interface Distance {
  activity: string;
  distance: number;
}

interface HeartRateZone {
  minutes: number;
  caloriesOut: number;
  name: string;
  min: number;
  max: number;
}

interface Summary {
  caloriesOut: number;
  activityCalories: number;
  caloriesBMR: number;
  activeScore: number;
  steps: number;
  floors: number;
  elevation: number;
  sedentaryMinutes: number;
  lightlyActiveMinutes: number;
  fairlyActiveMinutes: number;
  veryActiveMinutes: number;
  distances: Distance[];
  marginalCalories: number;
  restingHeartRate: number;
  heartRateZones: HeartRateZone[];
}

interface Goals {
  caloriesOut: number;
  steps: number;
  distance: number;
  floors: number;
  activeMinutes: number;
}

export interface ActivitiesData {
  activities: any[]; // Assuming activities is an array of any objects (can be adjusted if specific structure is known)
  summary: Summary;
  goals: Goals;
}
