import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('aluno@faculdade.edu')
  const [password, setPassword] = useState('123456')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email && password) {
      localStorage.setItem('auth_token', 'fake-token')
      navigate('/dashboard')
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card shadow-sm">
          <div className="card-body">
            <h1 className="h4 mb-3">Login</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">E-mail</label>
                <input className="form-control" value={email} onChange={e=>setEmail(e.target.value)} />
              </div>
              <div className="mb-3">
                <label className="form-label">Senha</label>
                <input type="password" className="form-control" value={password} onChange={e=>setPassword(e.target.value)} />
              </div>
              <button className="btn btn-primary">Entrar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
