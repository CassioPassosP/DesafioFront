import express from 'express'
import cors from 'cors'
import fs from 'fs'

const app = express()
app.use(cors())
app.use(express.json())

const PORT = 3001
const DB_PATH = './db.json'

function readDB() { return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8')) }
function writeDB(data) { fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2)) }
function nextId(items){ return items.length ? Math.max(...items.map(i=>i.id)) + 1 : 1 }

function crud(resource){
  app.get(`/api/${resource}`, (req,res)=>{ const db = readDB(); res.json(db[resource] || []) })
  app.post(`/api/${resource}`, (req,res)=>{
    const db = readDB(); db[resource] = db[resource] || []
    const item = { id: nextId(db[resource]), ...req.body }
    db[resource].push(item); writeDB(db); res.status(201).json(item)
  })
  app.put(`/api/${resource}/:id`, (req,res)=>{
    const db = readDB(); db[resource] = db[resource] || []
    const id = Number(req.params.id); const idx = db[resource].findIndex(i=>i.id===id)
    if (idx === -1) return res.status(404).json({error:'Not found'})
    db[resource][idx] = { ...db[resource][idx], ...req.body, id }
    writeDB(db); res.json(db[resource][idx])
  })
  app.delete(`/api/${resource}/:id`, (req,res)=>{
    const db = readDB(); db[resource] = db[resource] || []
    const id = Number(req.params.id)
    const before = db[resource].length; db[resource] = db[resource].filter(i=>i.id!==id)
    if (db[resource].length === before) return res.status(404).json({error:'Not found'})
    writeDB(db); res.status(204).end()
  })
}

crud('students')
crud('courses')
crud('professors')
crud('classes')

app.get('/api/enrollments', (req,res)=>{ const db = readDB(); res.json(db.enrollments || []) })

app.post('/api/enrollments', (req,res)=>{
  const db = readDB(); db.enrollments = db.enrollments || []
  const payload = req.body
  const enr = { id: nextId(db.enrollments), studentId: payload.studentId, date: payload.date || new Date().toISOString().slice(0,10) }
  if (payload.turmaId){
    enr.turmaId = Number(payload.turmaId)
    const t = (db.classes||[]).find(c=>c.id===enr.turmaId)
    if (t) enr.courseId = t.courseId
  } else if (payload.courseId){
    enr.courseId = Number(payload.courseId)
  }
  db.enrollments.push(enr); writeDB(db); res.status(201).json(enr)
})

app.delete('/api/enrollments/:id', (req,res)=>{
  const db = readDB(); db.enrollments = db.enrollments || []
  const id = Number(req.params.id); const before = db.enrollments.length
  db.enrollments = db.enrollments.filter(i=>i.id!==id)
  if (db.enrollments.length === before) return res.status(404).json({error:'Not found'})
  writeDB(db); res.status(204).end()
})

app.listen(PORT, () => console.log(`API rodando em http://localhost:${PORT}`))
