export type TimePeriods = "WEEK"|"MONTH"|"YEAR"

export interface StudentPerformanceData {
    name: string,
    data: number[],
    labels: string[]
}