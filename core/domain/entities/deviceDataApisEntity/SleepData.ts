interface SleepStage {
    stage: string;
    percentage: number;
    duration: string;
}

interface SleepData {
    date: string;
    day: string;
    startSleep: string;
    endSleep: string;
    totalSleepDuration: string;
    sleepQualityScore: number;
    sleepQuality: string;
    restAndRecovery:number;
    sleepStages: SleepStage[];
}
