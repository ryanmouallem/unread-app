'use client'

import { useEffect, useRef, useState } from 'react'
import { useFormState } from 'react-dom'

import { login, signup } from './actions'

const initialSignupState = { success: false, error: null, alreadyRegistered: false }

export default function AuthCard({ className = '', emailFieldRef, headingId }) {
  const [mode, setMode] = useState('login')
  const [showModal, setShowModal] = useState(false)
  const [localError, setLocalError] = useState(null)
  const [signinPrompt, setSigninPrompt] = useState(null)
  const signupFormRef = useRef(null)

  const [signupState, signupAction] = useFormState(signup, initialSignupState)

  useEffect(() => {
    if (signupState?.success) {
      setShowModal(true)
      setLocalError(null)
      setSigninPrompt(null)
      signupFormRef.current?.reset()
      setMode('login')
    } else if (signupState?.alreadyRegistered) {
      setMode('login')
      setShowModal(false)
      setSigninPrompt(
        signupState.error || 'We found an account with that email. Please sign in below.'
      )
    }
  }, [signupState])

  useEffect(() => {
    if (emailFieldRef?.current) {
      emailFieldRef.current.focus()
    }
  }, [mode, emailFieldRef])

  const handleSignupSubmit = (event) => {
    const formData = new FormData(event.currentTarget)
    if (formData.get('password') !== formData.get('confirmPassword')) {
      event.preventDefault()
      setLocalError('Passwords do not match.')
      return
    }
    setLocalError(null)
  }

  const headerText = mode === 'login' ? 'Sign in' : 'Create an account'
  const subText =
    mode === 'login'
      ? 'Enter your credentials to access Unread.'
      : 'Fill in the details to get started, then confirm via email.'

  const containerClasses = [
    'rounded-2xl bg-[#F4F3ED] p-6 shadow-xl ring-1 ring-black/5',
    'w-[min(92vw,36rem)]',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <>
      <div className={containerClasses}>
        <div>
          <h1
            id={headingId}
            className="text-3xl font-semibold text-[#3B332B]"
          >
            {headerText}
          </h1>
          <p className="mt-1 text-[#3B332B]/70">{subText}</p>
        </div>

        {mode === 'login' ? (
          <>
            <form className="mt-6 space-y-4" action={login}>
              <AuthField
                id="login-email"
                label="Email"
                type="email"
                name="email"
                inputRef={mode === 'login' ? emailFieldRef : null}
              />
              <AuthField id="login-password" label="Password" type="password" name="password" />

              <div className="mt-6">
                <button className="w-full rounded-lg bg-[#493F37] px-5 py-3 text-[#F9F8F6] shadow-sm hover:bg-[#3B332B]">
                  Log in
                </button>
              </div>
            </form>
            {signinPrompt && (
              <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-[#7A4F35]">
                {signinPrompt}
              </p>
            )}
          </>
        ) : (
          <form
            ref={signupFormRef}
            className="mt-6 space-y-4"
            action={signupAction}
            onSubmit={handleSignupSubmit}
          >
            <AuthField
              id="signup-email"
              label="Email"
              type="email"
              name="email"
              inputRef={mode === 'signup' ? emailFieldRef : null}
            />
            <AuthField id="signup-password" label="Password" type="password" name="password" />
            <AuthField
              id="signup-confirm-password"
              label="Confirm password"
              type="password"
              name="confirmPassword"
            />

            {(localError || signupState?.error) && (
              <p className="text-sm text-red-600">{localError || signupState?.error}</p>
            )}

            <div className="mt-6">
              <button className="w-full rounded-lg border border-[#E7E2DD] bg-white px-5 py-3 text-[#493F37] shadow-sm hover:bg-[#F9F8F6]">
                Create account
              </button>
            </div>
          </form>
        )}
        <p className="mt-6 text-center text-sm text-[#3B332B]">
          {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            type="button"
            className="font-semibold text-[#3B332B] underline-offset-4 hover:underline"
            onClick={() => {
              const nextMode = mode === 'login' ? 'signup' : 'login'
              setMode(nextMode)
              setLocalError(null)
              if (nextMode === 'signup') {
                setSigninPrompt(null)
              }
            }}
          >
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-2xl">
            <h2 className="text-2xl font-semibold text-[#3B332B]">Confirm your email</h2>
            <p className="mt-3 text-[#3B332B]/70">
              We just sent a confirmation link to your inbox. Please open the email to verify your
              account before signing in.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                className="flex-1 rounded-lg bg-[#493F37] px-4 py-2 text-white hover:bg-[#3B332B]"
                onClick={() => setShowModal(false)}
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function AuthField({ id, label, type, name, inputRef }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-[#3B332B]">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        ref={inputRef}
        required
        className="mt-1 w-full rounded-lg border border-[#E7E2DD] bg-white px-4 py-3 text-[#3B332B] placeholder:text-[#3B332B]/60 focus:outline-none focus:ring-2 focus:ring-[#81A282]"
        placeholder={
          type === 'email' ? 'you@example.com' : type === 'password' ? '••••••••' : undefined
        }
      />
    </div>
  )
}
