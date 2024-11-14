export interface PatientData {
    id: string;
    patient_id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    gender: "Male" | "Female" | "Other";
    profile_picture: string | null;
    roles: "Patient" | "Doctor" | "Admin" | string;
    doctorNames: string[];
    birthday: string; // ISO date string
    height: number; // in cm
    weight: number; // in kg
    blood_type: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-" | string;
    age: number; // age in years
    affected_since_when: string;
    seizures_per_day: string;
    triggers: Trigger[],
    heart_rate: {
        artifact: string | null;
        bpm: number;
        date: string; // ISO date string
    };
    heart_rate_variabilities: {
        heart_rate_variability: number;
        date: string; // ISO date string
    };
    resting_heart_rates: {
        resting_heart_rate: number;
        date: string; // ISO date string
    };
    walking_heart_rate_averages: {
        walking_heart_rate_average: number;
        date: string; // ISO date string
    };
    gps: any | null; // GPS data structure (to be defined or left as `any`)
    step_count: number | null;
    oxygen_saturations: {
        oxygen_saturation: number; // in decimal percentage (e.g., 0.98 for 98%)
        date: string; // ISO date string
    };
    respiratory_rates: {
        respiratory_rate: number; // breaths per minute
        date: string; // ISO date string
    };
    seizures: {
        alcohol: boolean;
        exercise: boolean;
        eat: string;
        time_from: string; // HH:mm:ss format
        time_to: string; // HH:mm:ss format
        date: string; // YYYY-MM-DD format
    };
    sleep: any | null; // Sleep data structure (to be defined or left as `any`)
    stress: {
        stress_level: string;
        mood: string;
        mood_score: number;
        date: string | null; // ISO date string or null
    };
    temperature: {
        wrist: number; // in °C
        date: string; // ISO date string
    };
    device: any | null; // Device data structure (to be defined or left as `any`)
}

interface Trigger {
    trigger: string,
    percentage: number
}
