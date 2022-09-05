export const theDate = (daysToAdvance = 0) => {
  const dataBase = new Date()

  const aux = new Date( +dataBase + daysToAdvance * 86400000 )

  let res = new Date( aux.getFullYear(), aux.getMonth(), aux.getDate(), 0, 0, 0, 0)

  return res
}


export const roundDate = (date) => {

  return new Date( date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0)
}

export const ceilDate = (date) => {

  return new Date( date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999)
}


export const lastSevenDays = (theDate = new Date()) => {
  let result = []
  let aux = theDate
  for( let i = 1; i <= 7; i ++){
    result.push(
      (aux.getMonth()+1).toString().padStart(2, '0') + '-' +
      aux.getDate().toString().padStart(2, '0') 
    )
    aux = new Date( + aux - 1 * 86400000 )
  }
  return result.sort( (a, b) => a > b ? 1 : -1)
}
