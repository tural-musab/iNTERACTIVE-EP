import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

console.log(`Function 'award-quiz-points' up and running!`);

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { quiz_attempt_id } = await req.json();
    if (!quiz_attempt_id) {
      throw new Error("Quiz attempt ID is required.");
    }

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // --- DEĞİŞİKLİK 1: Artık 'quiz_id'yi de çekiyoruz ---
    const { data: attempt, error: attemptError } = await supabaseAdmin
      .from('quiz_attempts')
      .select('score, student_id, quiz_id') // quiz_id eklendi
      .eq('id', quiz_attempt_id)
      .single();

    if (attemptError || !attempt) {
      throw new Error("Invalid quiz attempt.");
    }

    const pointsToAward = Math.round(attempt.score * 10);
    const studentId = attempt.student_id;
    const quizId = attempt.quiz_id; // Doğru quiz_id'yi bir değişkene atadık

    const { error: insertError } = await supabaseAdmin
      .from('point_history')
      .insert({
        user_id: studentId,
        points: pointsToAward,
        reason: 'quiz_completion',
        // --- DEĞİŞİKLİK 2: Artık doğru quizId'yi kullanıyoruz ---
        quiz_id: quizId 
      });

    if (insertError) {
      throw insertError;
    }

    return new Response(JSON.stringify({ message: `Successfully awarded ${pointsToAward} points!` }), {
      headers: { ...corsHeaders, 'Content-Type': 'application-json' },
      status: 200,
    });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
