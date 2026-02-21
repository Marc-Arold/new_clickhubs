import LoginForm from '../components/auth/LoginForm'

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-dark-accent/50 border border-white/10 rounded-2xl p-8">
        <LoginForm />
      </div>
    </div>
  )
}
