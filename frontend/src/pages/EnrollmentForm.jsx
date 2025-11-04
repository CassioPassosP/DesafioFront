import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api'
import { describeSchedule } from '../utils'

export default function EnrollmentForm() {
  const [students, setStudents] = useState([])
  const [classes, setClasses] = useState([])
  const [courses, setCourses] = useState([])
  const [studentId, setStudentId] = useState('')
  const [turmaId, setTurmaId] = useState('')
  const [date, setDate] = useState(new Date().toISOString().slice(0,10))
  const navigate = useNavigate()

  useEffect(() => {
    api.listStudents().then(setStudents)
    api.listClasses().then(setClasses)
    api.listCourses().then(setCourses)
  }, [])

  const submit = async (e) => {
    e.preventDefault()
    await api.createEnrollment({ studentId: Number(studentId), turmaId: Number(turmaId), date })
    navigate('/enrollments')
  }

  const courseName = (id) => courses.find(c=>c.id===id)?.name || id

  return (
    <div className="card">
      <div className="card-body">
        <h1 className="h5 mb-3">Nova matrícula</h1>
        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label">Aluno</label>
            <select className="form-select" value={studentId} onChange={e=>setStudentId(e.target.value)} required>
              <option value="">Selecione...</option>
              {students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Turma</label>
            <select className="form-select" value={turmaId} onChange={e=>setTurmaId(e.target.value)} required>
              <option value="">Selecione...</option>
              {classes.map(t => (
                <option key={t.id} value={t.id}>
                  {courseName(t.courseId)} — {describeSchedule(t.scheduleCode)}
                </option>
              ))}
            </select>
            <div className="form-text">A matrícula é feita diretamente na turma (disciplina + horário/turno).</div>
          </div>
          <div className="mb-3">
            <label className="form-label">Data</label>
            <input type="date" className="form-control" value={date} onChange={e=>setDate(e.target.value)} required />
          </div>
          <button className="btn btn-success">Salvar</button>
        </form>
      </div>
    </div>
  )
}
