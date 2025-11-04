import { useEffect, useMemo, useState } from 'react'
import { api } from '../api'
import { days, periods } from '../utils'
export default function MySchedule(){
  const [enrollments,setEnrollments]=useState([]); const [classes,setClasses]=useState([]); const [courses,setCourses]=useState([])
  const load=async()=>{ setEnrollments(await api.listEnrollments()); setClasses(await api.listClasses()); setCourses(await api.listCourses()) }
  useEffect(()=>{load()},[])
  const my=useMemo(()=>enrollments.filter(e=>e.studentId===1),[enrollments])
  const grid={}; Object.keys(days).forEach(d=>grid[d]={})
  const courseName=(id)=>courses.find(c=>c.id===id)?.name || id
  my.forEach(e=>{ const t=classes.find(c=>c.id===e.turmaId); if(!t) return; const d=String(t.scheduleCode)[0]; const p=String(t.scheduleCode)[1]; grid[d][p]=courseName(t.courseId) })
  const dias=Object.entries(days); const per=Object.entries(periods)
  return (<div><h2 className="h5 mb-3">Minha grade horária</h2>
    <div className="table-responsive"><table className="table table-bordered align-middle">
      <thead className="table-light"><tr><th>Período \ Dia</th>{dias.map(([d,l])=><th key={d}>{l}</th>)}</tr></thead>
      <tbody>{per.map(([p,pl])=>(<tr key={p}><th className="table-light">{pl}</th>
        {dias.map(([d])=>(<td key={d+'-'+p}>{grid[d][p]?<strong>{grid[d][p]}</strong>:<span className="text-muted small">Livre</span>}</td>))}
      </tr>))}</tbody>
    </table></div>
    <div className="text-muted small">Convenção: 21 = terça de manhã, 33 = terça à noite.</div>
  </div>)
}