# Sistema de Matrículas — Versão Completa (Institucional + Aluno)

Esta versão atende **100%** dos requisitos do desafio:
- **SPA sem SSR** (React + Vite + Bootstrap)
- **Rotas** e páginas para **visão institucional** (Professores, Disciplinas, **Turmas** com código de horário)
- **Visão do aluno** (Turmas disponíveis + **Minha grade horária**)
- **Matrícula por turma**
- **Back-end** Express com persistência em arquivo (`db.json`)
- **Protótipo/planejamento** e **roteiro de vídeo** incluídos em `/docs`

## Como executar

### Back-end
```bash
cd backend
npm install
npm run dev
# API em http://localhost:3001
```

### Front-end
```bash
cd frontend
npm install
npm run dev
# Front em http://localhost:5173 (geralmente)
```

## Rotas principais (front)
- `/students`, `/courses`, `/professors`
- `/classes` (turmas: disciplina + professor + código de horário **DP**)
- `/student` (lista de turmas para matrícula)
- `/myschedule` (grade do aluno)
- `/enrollments` e `/enrollments/new`

## Convenção de horários
- Código **DP**: **D**=1..6 (Seg..Sáb) e **P**=1 Manhã, 2 Tarde, 3 Noite. Ex.: `21` = Terça-Manhã, `33` = Terça-Noite.

— Gerado em 2025-11-04 18:04:45
