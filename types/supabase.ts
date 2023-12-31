export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Babies: {
        Row: {
          created_at: string | null
          DateOfBirth: string | null
          "Full Name": string | null
          id: number
        }
        Insert: {
          created_at?: string | null
          DateOfBirth?: string | null
          "Full Name"?: string | null
          id?: number
        }
        Update: {
          created_at?: string | null
          DateOfBirth?: string | null
          "Full Name"?: string | null
          id?: number
        }
        Relationships: []
      }
      Measure: {
        Row: {
          BabyId: number
          CreatedAt: string | null
          CreatedBy: string | null
          id: number
          Measure: string | null
          Value: number | null
        }
        Insert: {
          BabyId: number
          CreatedAt?: string | null
          CreatedBy?: string | null
          id?: number
          Measure?: string | null
          Value?: number | null
        }
        Update: {
          BabyId?: number
          CreatedAt?: string | null
          CreatedBy?: string | null
          id?: number
          Measure?: string | null
          Value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Measure_BabyId_fkey"
            columns: ["BabyId"]
            referencedRelation: "Babies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Measure_CreatedBy_fkey"
            columns: ["CreatedBy"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
