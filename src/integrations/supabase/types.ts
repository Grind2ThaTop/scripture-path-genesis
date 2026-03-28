export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      accountability_groups: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          id: string
          max_members: number
          name: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          max_members?: number
          name: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          max_members?: number
          name?: string
        }
        Relationships: []
      }
      badges: {
        Row: {
          category: string
          created_at: string
          description: string
          icon: string
          id: string
          name: string
          requirement_type: string
          requirement_value: number
          xp_reward: number
        }
        Insert: {
          category?: string
          created_at?: string
          description: string
          icon?: string
          id?: string
          name: string
          requirement_type: string
          requirement_value?: number
          xp_reward?: number
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          icon?: string
          id?: string
          name?: string
          requirement_type?: string
          requirement_value?: number
          xp_reward?: number
        }
        Relationships: []
      }
      banned_users: {
        Row: {
          banned_at: string
          banned_by: string
          id: string
          reason: string | null
          user_id: string
        }
        Insert: {
          banned_at?: string
          banned_by: string
          id?: string
          reason?: string | null
          user_id: string
        }
        Update: {
          banned_at?: string
          banned_by?: string
          id?: string
          reason?: string | null
          user_id?: string
        }
        Relationships: []
      }
      bookmarks: {
        Row: {
          collection: string | null
          created_at: string
          id: string
          label: string | null
          reference: string
          user_id: string
        }
        Insert: {
          collection?: string | null
          created_at?: string
          id?: string
          label?: string | null
          reference: string
          user_id: string
        }
        Update: {
          collection?: string | null
          created_at?: string
          id?: string
          label?: string | null
          reference?: string
          user_id?: string
        }
        Relationships: []
      }
      community_comments: {
        Row: {
          content: string
          created_at: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      community_posts: {
        Row: {
          channel: string
          content: string
          created_at: string
          id: string
          likes: number
          pinned: boolean
          post_type: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          channel?: string
          content: string
          created_at?: string
          id?: string
          likes?: number
          pinned?: boolean
          post_type?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          channel?: string
          content?: string
          created_at?: string
          id?: string
          likes?: number
          pinned?: boolean
          post_type?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      daily_content: {
        Row: {
          action_step: string
          breakdown: string
          created_at: string
          date: string
          deep_study: string | null
          id: string
          level_tag: string
          reflection_question: string
          verse_reference: string
          verse_text: string
        }
        Insert: {
          action_step: string
          breakdown: string
          created_at?: string
          date: string
          deep_study?: string | null
          id?: string
          level_tag?: string
          reflection_question: string
          verse_reference: string
          verse_text: string
        }
        Update: {
          action_step?: string
          breakdown?: string
          created_at?: string
          date?: string
          deep_study?: string | null
          id?: string
          level_tag?: string
          reflection_question?: string
          verse_reference?: string
          verse_text?: string
        }
        Relationships: []
      }
      daily_reflections: {
        Row: {
          action_completed: boolean
          created_at: string
          daily_content_id: string
          id: string
          reflection_text: string
          user_id: string
        }
        Insert: {
          action_completed?: boolean
          created_at?: string
          daily_content_id: string
          id?: string
          reflection_text: string
          user_id: string
        }
        Update: {
          action_completed?: boolean
          created_at?: string
          daily_content_id?: string
          id?: string
          reflection_text?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "daily_reflections_daily_content_id_fkey"
            columns: ["daily_content_id"]
            isOneToOne: false
            referencedRelation: "daily_content"
            referencedColumns: ["id"]
          },
        ]
      }
      daily_topics: {
        Row: {
          angle: string
          category: string
          content_type: string
          created_at: string
          date: string
          hook: string
          id: string
          philly_angle: string | null
          priority: number
          scripture_refs: string[] | null
          tiktok_hook: string | null
          used: boolean
        }
        Insert: {
          angle: string
          category: string
          content_type?: string
          created_at?: string
          date?: string
          hook: string
          id?: string
          philly_angle?: string | null
          priority?: number
          scripture_refs?: string[] | null
          tiktok_hook?: string | null
          used?: boolean
        }
        Update: {
          angle?: string
          category?: string
          content_type?: string
          created_at?: string
          date?: string
          hook?: string
          id?: string
          philly_angle?: string | null
          priority?: number
          scripture_refs?: string[] | null
          tiktok_hook?: string | null
          used?: boolean
        }
        Relationships: []
      }
      event_attendance: {
        Row: {
          attended: boolean
          event_id: string
          id: string
          joined_at: string
          status: string
          user_id: string
        }
        Insert: {
          attended?: boolean
          event_id: string
          id?: string
          joined_at?: string
          status?: string
          user_id: string
        }
        Update: {
          attended?: boolean
          event_id?: string
          id?: string
          joined_at?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_attendance_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          end_time: string | null
          event_type: string
          id: string
          is_recurring: boolean
          notes: string | null
          recurrence_rule: string | null
          related_lesson_id: string | null
          replay_url: string | null
          scriptures_covered: string[] | null
          speaker: string | null
          start_time: string
          timezone: string
          title: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          end_time?: string | null
          event_type?: string
          id?: string
          is_recurring?: boolean
          notes?: string | null
          recurrence_rule?: string | null
          related_lesson_id?: string | null
          replay_url?: string | null
          scriptures_covered?: string[] | null
          speaker?: string | null
          start_time: string
          timezone?: string
          title: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          end_time?: string | null
          event_type?: string
          id?: string
          is_recurring?: boolean
          notes?: string | null
          recurrence_rule?: string | null
          related_lesson_id?: string | null
          replay_url?: string | null
          scriptures_covered?: string[] | null
          speaker?: string | null
          start_time?: string
          timezone?: string
          title?: string
        }
        Relationships: []
      }
      group_members: {
        Row: {
          group_id: string
          id: string
          joined_at: string
          user_id: string
        }
        Insert: {
          group_id: string
          id?: string
          joined_at?: string
          user_id: string
        }
        Update: {
          group_id?: string
          id?: string
          joined_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_members_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "accountability_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      highlights: {
        Row: {
          color: string
          created_at: string
          id: string
          reference: string
          source: string
          text: string
          user_id: string
        }
        Insert: {
          color?: string
          created_at?: string
          id?: string
          reference: string
          source?: string
          text: string
          user_id: string
        }
        Update: {
          color?: string
          created_at?: string
          id?: string
          reference?: string
          source?: string
          text?: string
          user_id?: string
        }
        Relationships: []
      }
      lesson_completions: {
        Row: {
          completed_at: string
          id: string
          lesson_id: string
          module_id: string
          reflection: string | null
          user_id: string
        }
        Insert: {
          completed_at?: string
          id?: string
          lesson_id: string
          module_id: string
          reflection?: string | null
          user_id: string
        }
        Update: {
          completed_at?: string
          id?: string
          lesson_id?: string
          module_id?: string
          reflection?: string | null
          user_id?: string
        }
        Relationships: []
      }
      library_resources: {
        Row: {
          content: string | null
          created_at: string
          description: string | null
          difficulty: string | null
          downloads: number
          file_url: string | null
          id: string
          media_type: string | null
          resource_type: string
          tags: string[] | null
          teacher: string | null
          testament: string | null
          title: string
          topic: string | null
          track: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          description?: string | null
          difficulty?: string | null
          downloads?: number
          file_url?: string | null
          id?: string
          media_type?: string | null
          resource_type?: string
          tags?: string[] | null
          teacher?: string | null
          testament?: string | null
          title: string
          topic?: string | null
          track?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string
          description?: string | null
          difficulty?: string | null
          downloads?: number
          file_url?: string | null
          id?: string
          media_type?: string | null
          resource_type?: string
          tags?: string[] | null
          teacher?: string | null
          testament?: string | null
          title?: string
          topic?: string | null
          track?: string | null
        }
        Relationships: []
      }
      onboarding_responses: {
        Row: {
          assigned_track: string | null
          completed_at: string
          experience_level: string | null
          growth_areas: string[] | null
          id: string
          user_id: string
          wants_accountability: boolean | null
          wants_circle: boolean | null
          why_joining: string | null
        }
        Insert: {
          assigned_track?: string | null
          completed_at?: string
          experience_level?: string | null
          growth_areas?: string[] | null
          id?: string
          user_id: string
          wants_accountability?: boolean | null
          wants_circle?: boolean | null
          why_joining?: string | null
        }
        Update: {
          assigned_track?: string | null
          completed_at?: string
          experience_level?: string | null
          growth_areas?: string[] | null
          id?: string
          user_id?: string
          wants_accountability?: boolean | null
          wants_circle?: boolean | null
          why_joining?: string | null
        }
        Relationships: []
      }
      post_likes: {
        Row: {
          created_at: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      prayer_requests: {
        Row: {
          created_at: string
          id: string
          is_answered: boolean
          praying_count: number
          request_text: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_answered?: boolean
          praying_count?: number
          request_text: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_answered?: boolean
          praying_count?: number
          request_text?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      prayer_support: {
        Row: {
          created_at: string
          id: string
          prayer_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          prayer_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          prayer_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "prayer_support_prayer_id_fkey"
            columns: ["prayer_id"]
            isOneToOne: false
            referencedRelation: "prayer_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      prophecy_content: {
        Row: {
          ai_interpretation: string
          category: string
          content_type: string
          created_at: string
          headline: string
          id: string
          scripture_reference: string
          scripture_text: string
          source_name: string | null
          source_url: string | null
          status: string
          tags: string[] | null
        }
        Insert: {
          ai_interpretation: string
          category?: string
          content_type?: string
          created_at?: string
          headline: string
          id?: string
          scripture_reference: string
          scripture_text: string
          source_name?: string | null
          source_url?: string | null
          status?: string
          tags?: string[] | null
        }
        Update: {
          ai_interpretation?: string
          category?: string
          content_type?: string
          created_at?: string
          headline?: string
          id?: string
          scripture_reference?: string
          scripture_text?: string
          source_name?: string | null
          source_url?: string | null
          status?: string
          tags?: string[] | null
        }
        Relationships: []
      }
      reading_progress: {
        Row: {
          book_name: string
          chapter: number
          completed_at: string
          id: string
          user_id: string
        }
        Insert: {
          book_name: string
          chapter: number
          completed_at?: string
          id?: string
          user_id: string
        }
        Update: {
          book_name?: string
          chapter?: number
          completed_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      reading_streaks: {
        Row: {
          current_streak: number
          id: string
          last_read_date: string | null
          longest_streak: number
          total_chapters_read: number
          updated_at: string
          user_id: string
        }
        Insert: {
          current_streak?: number
          id?: string
          last_read_date?: string | null
          longest_streak?: number
          total_chapters_read?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          current_streak?: number
          id?: string
          last_read_date?: string | null
          longest_streak?: number
          total_chapters_read?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      study_notes: {
        Row: {
          content: string
          created_at: string
          id: string
          reference: string
          tags: string[] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          reference: string
          tags?: string[] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          reference?: string
          tags?: string[] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_badges: {
        Row: {
          badge_id: string
          earned_at: string
          id: string
          user_id: string
        }
        Insert: {
          badge_id: string
          earned_at?: string
          id?: string
          user_id: string
        }
        Update: {
          badge_id?: string
          earned_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
        ]
      }
      user_levels: {
        Row: {
          current_level: number
          days_consistent: number
          id: string
          lessons_completed: number
          level_unlocked_at: string
          updated_at: string
          user_id: string
          xp: number
        }
        Insert: {
          current_level?: number
          days_consistent?: number
          id?: string
          lessons_completed?: number
          level_unlocked_at?: string
          updated_at?: string
          user_id: string
          xp?: number
        }
        Update: {
          current_level?: number
          days_consistent?: number
          id?: string
          lessons_completed?: number
          level_unlocked_at?: string
          updated_at?: string
          user_id?: string
          xp?: number
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      viral_content: {
        Row: {
          biblical_angle: string
          controversy: string | null
          core_topic: string | null
          created_at: string
          emotional_trigger: string | null
          id: string
          ig_caption: string | null
          scripture_reference: string
          scripture_text: string
          source_description: string | null
          source_platform: string
          source_title: string
          source_url: string | null
          status: string
          tags: string[] | null
          tiktok_script: string | null
          viral_score: number | null
          youtube_short_script: string | null
        }
        Insert: {
          biblical_angle: string
          controversy?: string | null
          core_topic?: string | null
          created_at?: string
          emotional_trigger?: string | null
          id?: string
          ig_caption?: string | null
          scripture_reference: string
          scripture_text: string
          source_description?: string | null
          source_platform?: string
          source_title: string
          source_url?: string | null
          status?: string
          tags?: string[] | null
          tiktok_script?: string | null
          viral_score?: number | null
          youtube_short_script?: string | null
        }
        Update: {
          biblical_angle?: string
          controversy?: string | null
          core_topic?: string | null
          created_at?: string
          emotional_trigger?: string | null
          id?: string
          ig_caption?: string | null
          scripture_reference?: string
          scripture_text?: string
          source_description?: string | null
          source_platform?: string
          source_title?: string
          source_url?: string | null
          status?: string
          tags?: string[] | null
          tiktok_script?: string | null
          viral_score?: number | null
          youtube_short_script?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
