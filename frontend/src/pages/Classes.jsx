import { useEffect, useState } from 'react'
import { api } from '../api'
import { describeSchedule } from '../utils'
export default function Classes(){
  const [items,setItems]=useState([]); const [courses,setCourses]=useState([]); const [professors,setProfessors]=useState([])
  const [courseId,setCourseId]=useState(''); const [professorId,setProfessorId]=useState(''); const [scheduleCode,setScheduleCode]=useState('21')
  const load=async()=>{ setItems(await api.listClasses()); setCourses(await api.listCourses()); setProfessors(await api.listProfessors()) }
  useEffect(()=>{load()},[])
  const add=async(e)=>{e.preventDefault(); await api.createClass({courseId:Number(courseId), professorId:Number(professorId), scheduleCode:String(scheduleCode)}); setCourseId(''); setProfessorId(''); setScheduleCode('21'); load()}
  const remove=async(id)=>{await api.deleteClass(id); load()}
  const nameById=(list,id)=>list.find(x=>x.id===id)?.name || id
  return (<div className="row">
    <div className="col-md-7"><h2 className="h5">Turmas ofertadas</h2><ul className="list-group">
      {items.map(t=>(<li key={t.id} className="list-group-item d-flex justify-content-between align-items-center">
        <div><div className="fw-semibold">{nameById(courses,t.courseId)}</div>
        <div className="small text-muted">Prof.: {nameById(professors,t.professorId)} — {describeSchedule(t.scheduleCode)}</div></div>
        <button className="btn btn-sm btn-outline-danger" onClick={()=>remove(t.id)}>Excluir</button>
      </li>))}
      {items.length===0 && <li className="list-group-item text-muted">Nenhuma turma.</li>}
    </ul></div>
    <div className="col-md-5"><h2 className="h5">Nova turma</h2>
      <form onSubmit={add}>
        <div className="mb-3"><label className="form-label">Disciplina</label>
          <select className="form-select" value={courseId} onChange={e=>setCourseId(e.target.value)} required>
            <option value="">Selecione...</option>{courses.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
          </select></div>
        <div className="mb-3"><label className="form-label">Professor</label>
          <select className="form-select" value={professorId} onChange={e=>setProfessorId(e.target.value)} required>
            <option value="">Selecione...</option>{professors.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}
          </select></div>
        <div className="mb-3"><label className="form-label">Código de horário (ex: 21)</label>
          <input className="form-control" value={scheduleCode} onChange={e=>setScheduleCode(e.target.value)} pattern="^[1-6][1-3]$" required />
          <div className="form-text">1–6 = seg–sáb, 1–3 = manhã/tarde/noite</div>
        </div>
        <button className="btn btn-success">Salvar</button>
      </form>
    </div></div>)
}