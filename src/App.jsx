import { useEffect, useState } from "react"
import { supabase } from "./supabase-client"
import Login from "./Login"
import Dashboard from "./Dashboard"
import "./App.css"

const ALLOWED_EMAIL = "eklavyalalwani60@gmail.com"

export default function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get session on first load (handles OAuth redirect)
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)

      // Clean OAuth hash from URL
      if (window.location.hash) {
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        )
      }
    })

    // Listen for auth changes
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
      }
    )

    return () => subscription.subscription.unsubscribe()
  }, [])

  // Loading state (prevents UI flicker)
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    )
  }

  // Not logged in
  if (!session) {
    return <Login />
  }

  // Logged in but not allowed
  const email = session.user.email
  if (email !== ALLOWED_EMAIL) {
    return (
      <div className="h-screen flex items-center justify-center text-red-600">
        Access denied
      </div>
    )
  }

  // Logged in & allowed
  return <Dashboard />
}
