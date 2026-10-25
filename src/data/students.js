export const STUDENTS = [
  { id: 's1', name: 'Witty Otter', classCode: 'MATH 1151' },
  { id: 's2', name: 'Brave Falcon', classCode: 'MATH 1152' },
  { id: 's3', name: 'Steady Bison', classCode: 'MATH 2182H' },
  { id: 's4', name: 'Quiet Heron', classCode: 'MATH 1151' },
]

export function findStudent(id) {
  return STUDENTS.find(function (s) {
    return s.id === id
  }) || null
}
