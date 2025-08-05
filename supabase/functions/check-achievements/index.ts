// Check Achievements Edge Function
// Analyzes user stats and awards appropriate badges

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

interface AchievementCheckRequest {
  userId: string
  triggerEvent?: string
  metadata?: Record<string, unknown>
}

interface BadgeRule {
  badge_id: string
  condition_type: 'quiz_count' | 'accuracy' | 'points' | 'streak' | 'subject_mastery'
  condition_value: number
  condition_operator: 'gte' | 'lte' | 'eq'
  subject_filter?: string
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
    const { userId, triggerEvent, metadata }: AchievementCheckRequest = await req.json()

    // Validate input
    if (!userId) {
      return new Response(
        JSON.stringify({ error: 'Missing required field: userId' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Get user stats
    const { data: userStats, error: statsError } = await supabase
      .from('user_stats')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (statsError) {
      console.error('Error fetching user stats:', statsError)
      return new Response(
        JSON.stringify({ error: 'User stats not found' }),
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Get user streak data
    const { data: streakData } = await supabase
      .from('user_streaks')
      .select('*')
      .eq('user_id', userId)
      .single()

    // Get already earned badges
    const { data: earnedBadges } = await supabase
      .from('user_badges')
      .select('badge_id')
      .eq('user_id', userId)

    const earnedBadgeIds = new Set(earnedBadges?.map(b => b.badge_id) || [])

    // Define badge achievement rules
    const badgeRules: BadgeRule[] = [
      // Quiz completion badges
      { badge_id: 'first_quiz', condition_type: 'quiz_count', condition_value: 1, condition_operator: 'gte' },
      { badge_id: 'quiz_master_10', condition_type: 'quiz_count', condition_value: 10, condition_operator: 'gte' },
      { badge_id: 'quiz_master_25', condition_type: 'quiz_count', condition_value: 25, condition_operator: 'gte' },
      { badge_id: 'quiz_master_50', condition_type: 'quiz_count', condition_value: 50, condition_operator: 'gte' },
      { badge_id: 'quiz_master_100', condition_type: 'quiz_count', condition_value: 100, condition_operator: 'gte' },
      
      // Accuracy badges
      { badge_id: 'accuracy_expert', condition_type: 'accuracy', condition_value: 90, condition_operator: 'gte' },
      { badge_id: 'perfectionist', condition_type: 'accuracy', condition_value: 100, condition_operator: 'eq' },
      
      // Points badges
      { badge_id: 'points_collector_1k', condition_type: 'points', condition_value: 1000, condition_operator: 'gte' },
      { badge_id: 'points_collector_5k', condition_type: 'points', condition_value: 5000, condition_operator: 'gte' },
      { badge_id: 'points_collector_10k', condition_type: 'points', condition_value: 10000, condition_operator: 'gte' },
      
      // Streak badges
      { badge_id: 'consistent_learner', condition_type: 'streak', condition_value: 7, condition_operator: 'gte' },
      { badge_id: 'streak_master', condition_type: 'streak', condition_value: 30, condition_operator: 'gte' },
      { badge_id: 'unstoppable', condition_type: 'streak', condition_value: 100, condition_operator: 'gte' },
    ]

    const newlyEarnedBadges: string[] = []

    // Check each badge rule
    for (const rule of badgeRules) {
      if (earnedBadgeIds.has(rule.badge_id)) {
        continue // Already earned
      }

      let conditionMet = false

      switch (rule.condition_type) {
        case 'quiz_count':
          conditionMet = checkCondition(
            userStats.total_quizzes_completed || 0,
            rule.condition_value,
            rule.condition_operator
          )
          break

        case 'accuracy':
          conditionMet = checkCondition(
            userStats.average_accuracy || 0,
            rule.condition_value,
            rule.condition_operator
          )
          break

        case 'points':
          conditionMet = checkCondition(
            userStats.total_points_earned || 0,
            rule.condition_value,
            rule.condition_operator
          )
          break

        case 'streak':
          const currentStreak = streakData?.current_streak || 0
          conditionMet = checkCondition(
            currentStreak,
            rule.condition_value,
            rule.condition_operator
          )
          break
      }

      if (conditionMet) {
        // Award the badge using the award-badge function
        try {
          const awardResponse = await fetch(`${supabaseUrl}/functions/v1/award-badge`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${supabaseKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId,
              badgeId: rule.badge_id,
              reason: `Achievement unlocked: ${rule.condition_type} >= ${rule.condition_value}`,
              metadata: {
                trigger_event: triggerEvent,
                condition_type: rule.condition_type,
                condition_value: rule.condition_value,
                actual_value: getActualValue(userStats, streakData, rule.condition_type),
                ...metadata
              }
            })
          })

          if (awardResponse.ok) {
            newlyEarnedBadges.push(rule.badge_id)
            earnedBadgeIds.add(rule.badge_id) // Prevent duplicate awards in same check
          }
        } catch (error) {
          console.error(`Error awarding badge ${rule.badge_id}:`, error)
        }
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Achievement check completed',
        badges_earned: newlyEarnedBadges,
        total_badges_checked: badgeRules.length,
        trigger_event: triggerEvent
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Achievement check error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})

function checkCondition(actual: number, target: number, operator: string): boolean {
  switch (operator) {
    case 'gte': return actual >= target
    case 'lte': return actual <= target
    case 'eq': return actual === target
    default: return false
  }
}

function getActualValue(userStats: any, streakData: any, conditionType: string): number {
  switch (conditionType) {
    case 'quiz_count': return userStats.total_quizzes_completed || 0
    case 'accuracy': return userStats.average_accuracy || 0
    case 'points': return userStats.total_points_earned || 0
    case 'streak': return streakData?.current_streak || 0
    default: return 0
  }
}