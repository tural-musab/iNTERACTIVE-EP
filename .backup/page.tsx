'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import supabase from '@/lib/supabaseClient'

interface StudentProfile {
  id: string
  user_id: string
  email: string
  full_name: string
  grade: number
  created_at: string
}

function InviteParentForm({ studentId }: { studentId: string }) {
  const [parentEmail, setParentEmail] = useState('')
  const [inviteStatus, setInviteStatus] = useState('')

  async function handleInviteParent() {
    setInviteStatus('Gönderiliyor...')

    // Parents tablosunda var mı bak
    const { data: existing } = await supabase
      .from('parents')
      .select('id')
      .eq('email', parentEmail)
      .maybeSingle()

    if (existing) {
      setInviteStatus('Bu e-posta zaten veli olarak kayıtlı.')
      return
    }

    // Parent_student_links'te davet oluştur
    const { error } = await supabase
      .from('parent_student_links')
      .insert([
        {
          parent_id: null,
          student_id: studentId,
          invited_email: parentEmail,  // <-- burası önemli
          status: 'pending'
        }
      ])
    if (error) {
      setInviteStatus('Hata: ' + error.message)
      return
    }

    setInviteStatus('Davet kaydı oluşturuldu! Velin kaydolunca eşleşecek.')
  }

  return (
    <div className="mt-10 p-4 border rounded">
      <h2 className="text-lg font-semibold mb-2">Velini Davet Et</h2>
      <input
        className="border p-2 rounded w-full mb-2"
        type="email"
        placeholder="Veli e-posta adresi"
        value={parentEmail}
        onChange={e => setParentEmail(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 transition w-full"
        onClick={handleInviteParent}
      >
        Davet Gönder
      </button>
      {inviteStatus && (
        <div className="mt-2 text-center text-sm">{inviteStatus}</div>
      )}
    </div>
  )
}

export default function DashboardPage() {
  const [profile, setProfile] = useState<StudentProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [newName, setNewName] = useState('')
  const [newGrade, setNewGrade] = useState('')
  const [status, setStatus] = useState('')
  const router = useRouter()

  useEffect(() => {
    async function fetchProfile() {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData?.user) {
        router.push('/login')
        return
      }
      // --- SADECE PROFİLİ ÇEK
      const { data: profiles } = await supabase
        .from('students')
        .select('*')
        .eq('user_id', userData.user.id)
        .single()
      if (profiles) setProfile(profiles as StudentProfile)
      setLoading(false)
    }
    fetchProfile()
  }, [router])

  async function handleUpdateProfile(e: React.FormEvent) {
    e.preventDefault()
    setStatus('Kaydediliyor...')
    if (!profile) return

    const { error } = await supabase
      .from('students')
      .update({
        full_name: newName,
        grade: Number(newGrade),
      })
      .eq('id', profile.id)

    if (error) {
      setStatus('Güncelleme hatası: ' + error.message)
    } else {
      setStatus('Profil başarıyla güncellendi!')
      setProfile({
        ...profile,
        full_name: newName,
        grade: Number(newGrade),
      })
      setEditMode(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-xl mx-auto mt-16 bg-white rounded shadow p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Yükleniyor...</h1>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="max-w-xl mx-auto mt-16 bg-white rounded shadow p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Profil bilgilerin çekilemedi.</h1>
      </div>
    )
  }

  if (editMode) {
    return (
      <div className="max-w-xl mx-auto mt-16 bg-white rounded shadow p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Profili Düzenle</h1>
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <input
            className="border p-2 rounded w-full"
            type="text"
            value={newName}
            onChange={e => setNewName(e.target.value)}
            placeholder="Ad Soyad"
            required
          />
          <input
            className="border p-2 rounded w-full"
            type="number"
            min={5}
            max={11}
            value={newGrade}
            onChange={e => setNewGrade(e.target.value)}
            placeholder="Sınıf (5-11)"
            required
          />
          <button className="bg-blue-600 text-white p-2 rounded w-full font-semibold hover:bg-blue-700 transition" type="submit">
            Kaydet
          </button>
          <button
            type="button"
            className="bg-gray-300 text-black p-2 rounded w-full font-semibold mt-2"
            onClick={() => setEditMode(false)}
          >
            Vazgeç
          </button>
          {status && <div className="mt-2 text-center text-sm text-gray-700">{status}</div>}
        </form>
      </div>
    )
  }

  return (
<div className="max-w-xl mx-auto mt-16 bg-white rounded shadow p-8 text-center">
  <h1 className="text-2xl font-bold mb-4">Hoşgeldin!</h1>
  <p>
    {profile.full_name} ({profile.email}) – {profile.grade}. sınıf
    <br />
    Burada öğrenci paneli, içerikler ve ilerlemen görünecek.
  </p>

  <button
    className="mt-8 bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition"
    onClick={() => {
      setEditMode(true)
      setNewName(profile.full_name)
      setNewGrade(profile.grade.toString())
    }}
  >
    Profili Düzenle
  </button>

  <button
    className="block mx-auto mt-6 text-red-600 underline text-base font-medium hover:text-red-800 transition"
    onClick={async () => {
      await supabase.auth.signOut()
      router.push('/login')
    }}
  >
    Çıkış Yap
  </button>

  <InviteParentForm studentId={profile.id} />
</div>
  )
}
