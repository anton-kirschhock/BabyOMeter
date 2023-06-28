export interface Measure {
    BabyId: number
    CreatedAt: string | null
    CreatedBy: string | null
    id: number
    Measure: string | null
    Value: number | null
}

export const Measures = {
    "Vitamines": "Vitamines",
    "Weight": "Weight",
    "Diaper": "Diaper",
    "Feeding": "Feeding",
    "Temperature": "Temperature",
    "Bath": "Bath"
}

export type MeasureTypes =
    "Vitamines"
    | "Weight"
    | "Diaper"
    | "Feeding"
    | "Temperature"
    | "Bath"
    ;
export const DiaperTypes = [
    'Empty',
    'Wet',
    'Solid',
    'Solid & Wet'
]

