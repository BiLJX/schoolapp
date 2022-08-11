export type TimePeriods = "WEEK"|"MONTH"|"YEAR"

export interface StudentPerformanceData {
    name: string,
    data: number[],
    labels: string[]
}

export interface StudentPerformanceOverall {
    label: string,
    value: number|string
}