import { useEffect, useState } from 'react'
import { api } from '../api'
export default function Professors(){
  const [items,setItems]=useState([]); const [name,setName]=useState(''); const [email,setEmail]=useState('')
  const load=async()=>setItems(await api.listProfessors()); useEffect(()=>{load()},[])
  const add=async(e)=>{e.preventDefault(); await api.createProfessor({name,email}); setName(''); setEmail(''); load()}
  const remove=async(id)=>{await api.deleteProfessor(id); load()}
  return (<div className="row">
    <div className="col-md-6"><h2 className="h5">Professores</h2><ul className="list-group">
      {items.map(p=>(<li key={p.id} className="list-group-item d-flex justify-content-between align-items-center">
        <div><div className="fw-semibold">{p.name}</div><div className="small text-muted">{p.email}</div></div>
        <button className="btn btn-sm btn-outline-danger" onClick={()=>remove(p.id)}>Excluir</button>
      </li>))}
      {items.length===0 && <li className="list-group-item text-muted">Nenhum professor.</li>}
    </ul></div>
    <div className="col-md-6"><h2 className="h5">Novo professor</h2>
      <form onSubmit={add}>
        <div className="mb-3"><label className="form-label">Nome</label><input className="form-control" value={name} onChange={e=>setName(e.target.value)} required/></div>
        <div className="mb-3"><label className="form-label">E-mail</label><input type="email" className="form-control" value={email} onChange={e=>setEmail(e.target.value)}/></div>
        <button className="btn btn-primary">Salvar</button>
      </form>
    </div></div>)
}