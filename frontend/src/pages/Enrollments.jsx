import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api'
import { describeSchedule } from '../utils'

export default function Enrollments() {
  const [items, setItems] = useState([])
  const [students, setStudents] = useState([])
  const [courses, setCourses] = useState([])
  const [classes, setClasses] = useState([])

  const load = async () => {
    setItems(await api.listEnrollments())
    setStudents(await api.listStudents())
    setCourses(await api.listCourses())
    setClasses(await api.listClasses())
  }
  useEffect(() => { load() }, [])

  const remove = async (id) => { await api.deleteEnrollment(id); load() }

  const nameById = (list, id) => list.find(x=>x.id===id)?.name || id
  const classById = (id) => classes.find(c=>c.id===id)

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h5">Matrículas</h2>
        <Link className="btn btn-primary" to="/enrollments/new">Nova matrícula</Link>
      </div>
      <ul className="list-group">
        {items.map(e => {
          const turma = e.turmaId ? classById(e.turmaId) : null
          const courseLabel = turma ? nameById(courses, turma.courseId) : nameById(courses, e.courseId)
          return (
            <li key={e.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <div><strong>Aluno:</strong> {nameById(students, e.studentId)}</div>
                <div className="small text-muted">
                  <strong>Disciplina:</strong> {courseLabel}
                  {turma && <> — {describeSchedule(turma.scheduleCode)}</>}
                </div>
              </div>
              <button className="btn btn-sm btn-outline-danger" onClick={() => remove(e.id)}>Cancelar</button>
            </li>
          )
        })}
        {items.length === 0 && <li className="list-group-item text-muted">Sem matrículas ainda.</li>}
      </ul>
    </div>
  )
}
