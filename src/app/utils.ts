export const dateToString = (date: Date):string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const stringToDate = (date: string): Date => {
  const dateDate = new Date(date);
  dateDate.setHours(dateDate.getHours() + 12); //la conversion en date fixe l'heure à midi au lieu de 00:00
  return dateDate;
}

export const getTodayString = () => {
  const date = new Date();
  date.setHours(date.getHours() + 12);
  return dateToString(date);
}
