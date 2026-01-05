import { useEffect, useState } from "react"
import { supabase } from "./supabase-client"
import Login from "./Login"
import Dashboard from "./Dashboard"
import './App.css'

export default function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
    })

    const { data: sub } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
      }
    )

    return () => sub.subscription.unsubscribe()
  }, [])

  if (!session) return <Login />

  const email = session.user.email

  if (email !== "eklavyalalwani60@gmail.com") {
    return <div>Access denied</div>
  }

  return <Dashboard />
}
