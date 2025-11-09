import { login, signup } from './actions'

export default function LoginPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-[min(92vw,36rem)] rounded-2xl bg-[#F4F3ED] p-6 shadow-xl ring-1 ring-black/5">
        <h1 className="text-3xl font-semibold text-[#3B332B]">Sign in</h1>
        <p className="mt-1 text-[#3B332B]/70">Log in or create an account.</p>

        <form className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#3B332B]">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded-lg border border-[#E7E2DD] bg-white px-4 py-3 text-[#3B332B] placeholder:text-[#3B332B]/60 focus:outline-none focus:ring-2 focus:ring-[#81A282]"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#3B332B]">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 w-full rounded-lg border border-[#E7E2DD] bg-white px-4 py-3 text-[#3B332B] placeholder:text-[#3B332B]/60 focus:outline-none focus:ring-2 focus:ring-[#81A282]"
              placeholder="••••••••"
            />
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              className="bg-[#493F37] text-[#F9F8F6] rounded-lg px-5 py-3 shadow-sm hover:bg-[#3B332B]"
              formAction={login}
            >
              Log in
            </button>
            <button
              className="bg-white text-[#493F37] border border-[#E7E2DD] rounded-lg px-5 py-3 shadow-sm hover:bg-[#F9F8F6]"
              formAction={signup}
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
