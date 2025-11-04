import { useEffect, useState } from 'react'
import { api } from '../api'
export default function Courses(){
  const [items,setItems]=useState([]); const [name,setName]=useState(''); const [workload,setWorkload]=useState(60)
  const load=async()=>setItems(await api.listCourses()); useEffect(()=>{load()},[])
  const add=async(e)=>{e.preventDefault(); await api.createCourse({ name, workload: Number(workload) }); setName(''); setWorkload(60); load()}
  const remove=async(id)=>{await api.deleteCourse(id); load()}
  return (<div className="row"><div className="col-md-6">
    <h2 className="h5">Disciplinas</h2><ul className="list-group">
      {items.map(c=>(<li key={c.id} className="list-group-item d-flex justify-content-between align-items-center">
        <div><div className="fw-semibold">{c.name}</div><div className="small text-muted">{c.workload} horas</div></div>
        <button className="btn btn-sm btn-outline-danger" onClick={()=>remove(c.id)}>Excluir</button>
      </li>))}
      {items.length===0 && <li className="list-group-item text-muted">Nenhuma disciplina.</li>}
    </ul></div>
    <div className="col-md-6"><h2 className="h5">Nova disciplina</h2>
      <form onSubmit={add}>
        <div className="mb-3"><label className="form-label">Nome</label><input className="form-control" value={name} onChange={e=>setName(e.target.value)} required /></div>
        <div className="mb-3"><label className="form-label">Carga horária</label><input type="number" className="form-control" value={workload} onChange={e=>setWorkload(e.target.value)} min="1" required /></div>
        <button className="btn btn-primary">Salvar</button>
      </form>
    </div></div>)
}