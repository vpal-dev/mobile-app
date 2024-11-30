export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      "grade-papers": {
        Row: {
          content: Json | null
          created_at: string
          grade: number | null
          id: number
          photos: string[] | null
          user_id: string | null
        }
        Insert: {
          content?: Json | null
          created_at?: string
          grade?: number | null
          id?: number
          photos?: string[] | null
          user_id?: string | null
        }
        Update: {
          content?: Json | null
          created_at?: string
          grade?: number | null
          id?: number
          photos?: string[] | null
          user_id?: string | null
        }
        Relationships: []
      }
      "lesson-plans": {
        Row: {
          content: Json | null
          created_at: string
          grade: number | null
          id: number
          topic: string | null
          user_id: string
        }
        Insert: {
          content?: Json | null
          created_at?: string
          grade?: number | null
          id?: number
          topic?: string | null
          user_id: string
        }
        Update: {
          content?: Json | null
          created_at?: string
          grade?: number | null
          id?: number
          topic?: string | null
          user_id?: string
        }
        Relationships: []
      }
      leveller: {
        Row: {
          content: Json | null
          created_at: string
          description: string | null
          grade: number | null
          id: number
          photos: string[] | null
          user_id: string | null
        }
        Insert: {
          content?: Json | null
          created_at?: string
          description?: string | null
          grade?: number | null
          id?: number
          photos?: string[] | null
          user_id?: string | null
        }
        Update: {
          content?: Json | null
          created_at?: string
          description?: string | null
          grade?: number | null
          id?: number
          photos?: string[] | null
          user_id?: string | null
        }
        Relationships: []
      }
      qa: {
        Row: {
          content: Json | null
          created_at: string
          grade: number | null
          id: number
          noOfQuestions: number | null
          topic: string | null
          type: string | null
          user_id: string
        }
        Insert: {
          content?: Json | null
          created_at?: string
          grade?: number | null
          id?: number
          noOfQuestions?: number | null
          topic?: string | null
          type?: string | null
          user_id: string
        }
        Update: {
          content?: Json | null
          created_at?: string
          grade?: number | null
          id?: number
          noOfQuestions?: number | null
          topic?: string | null
          type?: string | null
          user_id?: string
        }
        Relationships: []
      }
      "relevant-lessons": {
        Row: {
          classProfile: string | null
          content: Json | null
          created_at: string
          id: number
          learningObjective: string | null
          user_id: string
        }
        Insert: {
          classProfile?: string | null
          content?: Json | null
          created_at?: string
          id?: number
          learningObjective?: string | null
          user_id: string
        }
        Update: {
          classProfile?: string | null
          content?: Json | null
          created_at?: string
          id?: number
          learningObjective?: string | null
          user_id?: string
        }
        Relationships: []
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
