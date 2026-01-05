import { supabase } from "./supabase-client"

export default function Login() {
  const login = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    })

    if (error) {
      alert(error.message)
    }
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <button
        onClick={login}
        className="px-6 py-3 bg-black text-white rounded"
      >
        Sign in with Google
      </button>
    </div>
  )
}
