const r1 = {sD: new Date('2024/03/31'), eD: new Date('2024/04/10')};
const r2 = {sD: new Date('2024/04/02'), eD: new Date('2024/04/03')};
const r3 = {sD: new Date('2024/04/03'), eD: new Date('2024/04/04')};
const r4 = {sD: new Date('2024/03/27'), eD: new Date('2024/03/28')}
const r5 = {sD: new Date('2024/03/27'), eD: new Date('2024/04/10')}

const resas = [r1, r2, r3, r4, r5]

const dates = [new Date('2024/04/01'), new Date('2024/04/02'), new Date('2024/04/03'), new Date('2024/04/04')]

function getMaxResaPerDay(resas, dates) {
  let maxResaPerDay = 0;
  dates.forEach(date => {
    const reservationsOnDate = resas.filter(resa => resa.sD <= date && resa.eD >= date);
    maxResaPerDay = Math.max(maxResaPerDay, reservationsOnDate.length);
  })
  return maxResaPerDay;
}

function getReservationIndices(resa, dates) {
  const timeDates = dates.map(d => d.getTime());
  let startIndex = null;
  let endIndex = null;
  for (let i = 0; i < dates.length; i++) {
    if (timeDates[i] === resa.sD.getTime()) {
      startIndex = i;
    }
    if (timeDates[i] === resa.eD.getTime()) {
      endIndex = i;
    }
  }
  if (startIndex !== null && endIndex !== null) {
    return {startIndex, endIndex};
  } else if (startIndex !== null && endIndex === null) {
    return { startIndex, endIndex: timeDates.length - 1 }
  } else if (startIndex === null && endIndex !== null) {
    return {startIndex: 0, endIndex}
  } else if (startIndex === null && endIndex === null) {
    if (resa.sD < timeDates[0] && resa.eD > timeDates[timeDates.length - 1]) {
      return {startIndex: 0, endIndex: timeDates.length - 1}
    }
  }
  return {startIndex: null, endIndex: null};
}

function getReservationCoordinates(resas, dates, offset = 1) {
  const nbLines = getMaxResaPerDay(resas, dates);
  const spaces = Array.from({length: nbLines}, () => Array(dates.length).fill(true));
  resas.forEach(resa => {
    const { startIndex, endIndex } = getReservationIndices(resa, dates);
    if (startIndex!=null && endIndex!=null) {
      for (let i = 0; i < nbLines; i++) {
        if (spaces[i].slice(startIndex, endIndex + 1).every(space => space === true)) {
          spaces[i].fill(false, startIndex, endIndex + 1);
          resa.gridColSpan = `${offset + startIndex + 1}/${offset + endIndex + 2}`
          resa.gridRowSpan = `${i + 1}/${i + 2}`
          break;
        }
      }
    } else {
      resa.gridRowSpan = null;
      resa.gridColSpan = null;
    }
  });
  return resas;
}

// console.log(getReservationCoordinates(resas, dates));
//
// const r1Date = r1.sD;
// const date = new Date('2024/06/12')
// console.log(date.getDay());
// console.log(date.getDate());
// console.log(date.getMonth());
// console.log(date.getFullYear());
// console.log(date.getTime());
// console.log(date.toISOString());

console.log(getReservationIndices(r1, dates))
