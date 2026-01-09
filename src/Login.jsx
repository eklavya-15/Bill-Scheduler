import { supabase } from "./supabase-client"

export default function Login() {
  const loginWithGoogle = async () => {
    const redirectTo = import.meta.env.VITE_REDIRECT_URI || window.location.origin;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
      },
    })

    if (error) {
      alert(error.message)
    }
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <button
        onClick={loginWithGoogle}
        className="px-6 py-3 bg-black text-white rounded"
      >
        Sign in with Google
      </button>
    </div>
  )
}
