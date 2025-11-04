import { useEffect, useState } from 'react'
import { api } from '../api'
export default function Students() {
  const [items, setItems] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const load = async () => setItems(await api.listStudents())
  useEffect(() => { load() }, [])
  const add = async (e) => { e.preventDefault(); await api.createStudent({ name, email }); setName(''); setEmail(''); load() }
  const remove = async (id) => { await api.deleteStudent(id); load() }
  return (
    <div className="row">
      <div className="col-md-6">
        <h2 className="h5">Alunos</h2>
        <ul className="list-group">
          {items.map(s => (
            <li key={s.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div><div className="fw-semibold">{s.name}</div><div className="small text-muted">{s.email}</div></div>
              <button className="btn btn-sm btn-outline-danger" onClick={() => remove(s.id)}>Excluir</button>
            </li>
          ))}
          {items.length===0 && <li className="list-group-item text-muted">Nenhum aluno.</li>}
        </ul>
      </div>
      <div className="col-md-6">
        <h2 className="h5">Novo aluno</h2>
        <form onSubmit={add}>
          <div className="mb-3"><label className="form-label">Nome</label><input className="form-control" value={name} onChange={e=>setName(e.target.value)} required /></div>
          <div className="mb-3"><label className="form-label">E-mail</label><input type="email" className="form-control" value={email} onChange={e=>setEmail(e.target.value)} required /></div>
          <button className="btn btn-primary">Salvar</button>
        </form>
      </div>
    </div>
  )
}
