import { useEffect, useState } from 'react'
import { api } from '../api'
import { describeSchedule } from '../utils'
export default function StudentView(){
  const [classes,setClasses]=useState([]); const [courses,setCourses]=useState([]); const [professors,setProfessors]=useState([])
  const load=async()=>{ setClasses(await api.listClasses()); setCourses(await api.listCourses()); setProfessors(await api.listProfessors()) }
  useEffect(()=>{load()},[])
  const byId=(list,id)=>list.find(x=>x.id===id)?.name || id
  const enroll=async(turmaId)=>{ await api.createEnrollment({studentId:1, turmaId}); alert('Matrícula realizada!') }
  return (<div><h2 className="h5 mb-3">Turmas disponíveis</h2><ul className="list-group">
    {classes.map(t=>(<li key={t.id} className="list-group-item d-flex justify-content-between align-items-center">
      <div><div className="fw-semibold">{byId(courses,t.courseId)}</div>
      <div className="small text-muted">Prof.: {byId(professors,t.professorId)} — {describeSchedule(t.scheduleCode)}</div></div>
      <button className="btn btn-sm btn-primary" onClick={()=>enroll(t.id)}>Matricular</button>
    </li>))}
    {classes.length===0 && <li className="list-group-item text-muted">Sem turmas no momento.</li>}
  </ul></div>)
}