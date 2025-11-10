
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

const getNextUrl = (nextParam) => {
  if (!nextParam) return '/'
  if (!nextParam.startsWith('/')) return '/'
  return nextParam
}

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type')
  const code = searchParams.get('code')
  const next = getNextUrl(searchParams.get('next'))

  const supabase = await createClient()

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      redirect(next)
    }
  } else if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })

    if (!error) {
      redirect(next)
    }
  }

  redirect('/error')
}
