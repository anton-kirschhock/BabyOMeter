export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Babies: {
        Row: {
          created_at: string | null
          DateOfBirth: string | null
          family_id: string | null
          "Full Name": string | null
          id: number
        }
        Insert: {
          created_at?: string | null
          DateOfBirth?: string | null
          family_id?: string | null
          "Full Name"?: string | null
          id?: number
        }
        Update: {
          created_at?: string | null
          DateOfBirth?: string | null
          family_id?: string | null
          "Full Name"?: string | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "Babies_family_id_fkey"
            columns: ["family_id"]
            referencedRelation: "Families"
            referencedColumns: ["id"]
          }
        ]
      }
      Families: {
        Row: {
          created_at: string
          id: string
          name: string
          owner_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          owner_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          owner_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "Families_owner_id_fkey"
            columns: ["owner_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      FamilyMembers: {
        Row: {
          family_id: string
          user_id: string
        }
        Insert: {
          family_id: string
          user_id: string
        }
        Update: {
          family_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "FamilyMembers_family_id_fkey"
            columns: ["family_id"]
            referencedRelation: "Families"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "FamilyMembers_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
      profiles: {
        Row: {
          first_name: string | null
          id: string
          last_name: string | null
        }
        Insert: {
          first_name?: string | null
          id: string
          last_name?: string | null
        }
        Update: {
          first_name?: string | null
          id?: string
          last_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
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
