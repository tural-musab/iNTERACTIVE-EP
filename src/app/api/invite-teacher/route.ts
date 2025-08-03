import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    // --- Supabase Auth Admin API endpoint'in doğru olduğundan emin ol! ---
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/admin/invite`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apiKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
          Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
        },
        body: JSON.stringify({ email }),
      }
    )

    if (response.ok) {
      return NextResponse.json({ ok: true })
    } else {
      // JSON hatası olursa yakala:
      let error
      try {
        error = await response.json()
      } catch (e) {
        error = await response.text() // Plain text dönerse
      }
      console.error('Invite Error:', error)
      return NextResponse.json({ ok: false, error }, { status: 500 })
    }
  } catch (err) {
    console.error('API Exception:', err)
    // err'in bir Error nesnesi olup olmadığını kontrol et ve uygun şekilde mesajı al
    const errorMessage =
      err instanceof Error
        ? err.message
        : typeof err === 'string'
        ? err
        : JSON.stringify(err)
    return NextResponse.json({ ok: false, error: errorMessage }, { status: 500 })
  }
}
