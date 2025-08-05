// Update User Streak Edge Function
// Securely updates user streaks based on activity

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

interface StreakUpdateRequest {
  userId: string
  activityType: 'quiz' | 'login' | 'lesson'
  metadata?: Record<string, unknown>
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Parse request body
    const { userId, activityType, metadata }: StreakUpdateRequest = await req.json()

    // Validate input
    if (!userId || !activityType) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: userId, activityType' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const today = new Date().toISOString().split('T')[0]
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0]

    // Get current streak data
    const { data: currentStreak, error: streakError } = await supabase
      .from('user_streaks')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (streakError && streakError.code !== 'PGRST116') {
      throw streakError
    }

    let newStreakCount = 1
    let newLongestStreak = 1

    if (currentStreak) {
      const lastActivityDate = currentStreak.last_activity_date

      if (lastActivityDate === today) {
        // Already recorded activity today, no change needed
        return new Response(
          JSON.stringify({ 
            success: true, 
            message: 'Activity already recorded today',
            current_streak: currentStreak.current_streak,
            longest_streak: currentStreak.longest_streak
          }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      } else if (lastActivityDate === yesterday) {
        // Consecutive day, increment streak
        newStreakCount = (currentStreak.current_streak || 0) + 1
        newLongestStreak = Math.max(newStreakCount, currentStreak.longest_streak || 0)
      } else {
        // Streak broken, reset to 1
        newStreakCount = 1
        newLongestStreak = currentStreak.longest_streak || 1
      }
    }

    // Update or insert streak data
    const streakData = {
      user_id: userId,
      current_streak: newStreakCount,
      longest_streak: newLongestStreak,
      last_activity_date: today,
      streak_type: 'daily' as const,
      activity_type: activityType,
      metadata
    }

    const { error: upsertError } = await supabase
      .from('user_streaks')
      .upsert(streakData, { 
        onConflict: 'user_id',
        ignoreDuplicates: false 
      })

    if (upsertError) {
      throw upsertError
    }

    // Award streak milestone badges/points
    const streakMilestones = [3, 7, 14, 30, 60, 100]
    if (streakMilestones.includes(newStreakCount)) {
      // Award streak milestone points
      const bonusPoints = newStreakCount * 5 // 5 points per streak day
      
      const { error: pointsError } = await supabase
        .from('point_history')
        .insert({
          user_id: userId,
          points: bonusPoints,
          reason: 'streak_milestone',
          metadata: {
            streak_length: newStreakCount,
            activity_type: activityType,
            milestone: `${newStreakCount}_day_streak`,
            ...metadata
          }
        })

      if (pointsError) {
        console.error('Error awarding streak points:', pointsError)
      }

      // Update user profile XP
      const { error: xpError } = await supabase
        .rpc('increment_user_xp', {
          user_id_param: userId,
          xp_amount: bonusPoints
        })

      if (xpError) {
        console.error('Error updating user XP for streak:', xpError)
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Streak updated successfully',
        current_streak: newStreakCount,
        longest_streak: newLongestStreak,
        is_milestone: streakMilestones.includes(newStreakCount),
        bonus_points: streakMilestones.includes(newStreakCount) ? newStreakCount * 5 : 0
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Streak update error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})