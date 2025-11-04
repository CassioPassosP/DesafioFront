export const days = {1:'Segunda',2:'Terça',3:'Quarta',4:'Quinta',5:'Sexta',6:'Sábado'}
export const periods = {1:'Manhã',2:'Tarde',3:'Noite'}
export function describeSchedule(code){
  if(!code) return ''
  const s = String(code); const d = Number(s[0]); const p = Number(s[1])
  return `${days[d]||'Dia?'} - ${periods[p]||'Período?'}`
}
