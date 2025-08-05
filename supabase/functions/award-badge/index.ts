// Award Badge Edge Function
// Securely awards badges to users based on achievements

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

interface BadgeAwardRequest {
  userId: string
  badgeId: string
  reason: string
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
    const { userId, badgeId, reason, metadata }: BadgeAwardRequest = await req.json()

    // Validate input
    if (!userId || !badgeId || !reason) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: userId, badgeId, reason' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Check if user already has this badge
    const { data: existingBadge, error: checkError } = await supabase
      .from('user_badges')
      .select('id')
      .eq('user_id', userId)
      .eq('badge_id', badgeId)
      .single()

    if (checkError && checkError.code !== 'PGRST116') {
      throw checkError
    }

    if (existingBadge) {
      return new Response(
        JSON.stringify({ error: 'User already has this badge' }),
        { 
          status: 409, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Get badge details for points reward
    const { data: badgeData, error: badgeError } = await supabase
      .from('user_badges')
      .select('points_reward')
      .eq('badge_id', badgeId)
      .is('user_id', null)
      .single()

    if (badgeError) {
      throw badgeError
    }

    // Award the badge
    const { error: awardError } = await supabase
      .from('user_badges')
      .insert({
        user_id: userId,
        badge_id: badgeId,
        awarded_at: new Date().toISOString(),
        award_reason: reason,
        metadata
      })

    if (awardError) {
      throw awardError
    }

    // Award points if badge has point reward
    if (badgeData?.points_reward && badgeData.points_reward > 0) {
      const { error: pointsError } = await supabase
        .from('point_history')
        .insert({
          user_id: userId,
          points: badgeData.points_reward,
          reason: 'badge_earned',
          metadata: {
            badge_id: badgeId,
            badge_reason: reason,
            ...metadata
          }
        })

      if (pointsError) {
        console.error('Error awarding badge points:', pointsError)
        // Don't fail the badge award if points fail
      }

      // Update user profile total points
      const { error: profileError } = await supabase
        .rpc('increment_user_xp', {
          user_id_param: userId,
          xp_amount: badgeData.points_reward
        })

      if (profileError) {
        console.error('Error updating user XP:', profileError)
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Badge awarded successfully',
        points_awarded: badgeData?.points_reward || 0
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Badge award error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})