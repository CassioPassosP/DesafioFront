# Protótipo / Planejamento — Sistema de Matrículas (v2)

## Objetivo
Atender visão **institucional** (oferta de turmas) e visão do **aluno** (matrícula + grade).

## Páginas/Telas
1. Login
2. Dashboard
3. Alunos (CRUD)
4. Disciplinas (CRUD)
5. Professores (CRUD)
6. Turmas (CRUD: disciplina + professor + código de horário DP)
7. Visão do Aluno (listar turmas e matricular)
8. Minha Grade (tabela dia x período)
9. Matrículas (listar/cancelar) e Nova Matrícula

## Estrutura de dados
- Student: { id, name, email }
- Course: { id, name, workload }
- Professor: { id, name, email }
- Class(Turma): { id, courseId, professorId, scheduleCode }
- Enrollment: { id, studentId, turmaId, courseId?, date }

## Codificação de horário
- DP: D=1..6 (Seg..Sáb), P=1 Manhã, 2 Tarde, 3 Noite (ex.: 21 = Terça-Manhã)

## Fluxos
- Institucional cria professores, disciplinas e turmas
- Aluno vê turmas, matricula-se e visualiza grade
