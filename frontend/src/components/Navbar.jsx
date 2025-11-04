import { Link, NavLink, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem('auth_token')
    navigate('/')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/dashboard">Matrículas</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarsExample">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><NavLink className="nav-link" to="/students">Alunos</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/courses">Disciplinas</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/professors">Professores</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/classes">Turmas</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/student">Visão do Aluno</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/myschedule">Minha Grade</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/enrollments">Matrículas</NavLink></li>
          </ul>
          <button className="btn btn-outline-light" onClick={logout}>Sair</button>
        </div>
      </div>
    </nav>
  )
}
