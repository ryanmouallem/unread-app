'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

const getSiteUrl = () => {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    (process.env.NEXT_PUBLIC_VERCEL_URL &&
      `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`) ||
    (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`)

  return siteUrl || 'http://localhost:3000'
}

export async function login(formData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(prevState, formData) {
  const supabase = await createClient()

  const email = formData?.get?.('email')
  const password = formData?.get?.('password')
  const duplicateMessage = 'Looks like you already have an account. Please sign in instead.'

  if (!email || !password) {
    return { success: false, error: 'Email and password are required.', alreadyRegistered: false }
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${getSiteUrl()}/auth/confirm`,
    },
  })

  if (error) {
    const alreadyRegistered =
      error?.message?.toLowerCase().includes('already registered') ||
      error?.code === 'user_already_exists'
    return {
      success: false,
      error: alreadyRegistered ? duplicateMessage : error.message,
      alreadyRegistered,
    }
  }

  const identities = data?.user?.identities
  if (Array.isArray(identities) && identities.length === 0) {
    return { success: false, error: duplicateMessage, alreadyRegistered: true }
  }

  return { success: true, error: null, alreadyRegistered: false }
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/')
}
