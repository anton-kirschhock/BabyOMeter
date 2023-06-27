export interface Measure {
    BabyId: number
    CreatedAt: string | null
    CreatedBy: string | null
    id: number
    Measure: string | null
    Value: number | null
}
export type MeasureTypes =
    "Vitamines"
    | "Weight"
    | "Diaper"
    | "Feeding"
    | "Temperature"
    ;
export const Measures = {
    "Vitamines": "Vitamines",
    "Weight": "Weight",
    "Diaper": "Diaper",
    "Feeding": "Feeding",
    "Temperature": "Temperature"
}

export const DiaperTypes = [
    'Empty',
    'Wet',
    'Solid',
    'Solid & Wet'
]

