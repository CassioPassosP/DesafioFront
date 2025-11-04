const API = 'http://localhost:3001/api'
async function http(path, options = {}){
  const res = await fetch(API + path, { headers:{'Content-Type':'application/json'}, ...options })
  if(!res.ok) throw new Error(await res.text() || res.statusText)
  return res.json()
}
export const api = {
  listStudents: ()=>http('/students'),
  createStudent: (d)=>http('/students',{method:'POST',body:JSON.stringify(d)}),
  updateStudent: (id,d)=>http(`/students/${id}`,{method:'PUT',body:JSON.stringify(d)}),
  deleteStudent: (id)=>http(`/students/${id}`,{method:'DELETE'}),

  listCourses: ()=>http('/courses'),
  createCourse: (d)=>http('/courses',{method:'POST',body:JSON.stringify(d)}),
  updateCourse: (id,d)=>http(`/courses/${id}`,{method:'PUT',body:JSON.stringify(d)}),
  deleteCourse: (id)=>http(`/courses/${id}`,{method:'DELETE'}),

  listProfessors: ()=>http('/professors'),
  createProfessor: (d)=>http('/professors',{method:'POST',body:JSON.stringify(d)}),
  updateProfessor: (id,d)=>http(`/professors/${id}`,{method:'PUT',body:JSON.stringify(d)}),
  deleteProfessor: (id)=>http(`/professors/${id}`,{method:'DELETE'}),

  listClasses: ()=>http('/classes'),
  createClass: (d)=>http('/classes',{method:'POST',body:JSON.stringify(d)}),
  updateClass: (id,d)=>http(`/classes/${id}`,{method:'PUT',body:JSON.stringify(d)}),
  deleteClass: (id)=>http(`/classes/${id}`,{method:'DELETE'}),

  listEnrollments: ()=>http('/enrollments'),
  createEnrollment: (d)=>http('/enrollments',{method:'POST',body:JSON.stringify(d)}),
  deleteEnrollment: (id)=>http(`/enrollments/${id}`,{method:'DELETE'}),
}
