import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bryntumScheduler';
  resources = [42, 43, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58]; // Ressources fixes
  reservations = [
    {startDate: new Date(), endDate: new Date(), resource: 42, username: 'Alice' },
    {startDate: new Date('2024/03/27'), endDate: new Date('2024/04/01'), resource: 43, username: 'Bob'},
    {startDate: new Date('2024/04/01'), endDate: new Date('2024/04/02'), resource: 45, username: 'Matthieu'},
    {startDate: new Date('2024/04/10'), endDate: new Date('2024/04/12'), resource: 47, username: 'Alfred'},
  ]
  startDateCalendar = new Date(); // Date de début, vous pouvez la définir comme vous le souhaitez
  selectedReservation: {startDate: Date, endDate: Date, resource: number, username: string} | null;
  modalPosition: { x: number, y: number };
  enableScroll = true;
  showEdition = false;

  showModal(reservation: {startDate: Date, endDate: Date, resource: number, username: string}, event: MouseEvent): void {
    this.selectedReservation = reservation;
    this.modalPosition = { x: event.clientX, y: event.clientY };
    this.enableScroll = false;
  }
  closeModal(): void {
    this.selectedReservation = null;
    this.enableScroll = true;
  }

  getDates(): string[] {
    let dates = [];
    for(let i = 0; i < 7; i++) {
      let date = new Date(this.startDateCalendar);
      date.setDate(this.startDateCalendar.getDate() + i);
      dates.push(date.toLocaleDateString());
    }
    return dates;
  }

  getGridColumn(reservation: {startDate: Date, endDate: Date, resource: number}, resource: number): {gridSpan: string, roundedLeft: boolean, roundedRight: boolean} | null {
    const dates = this.getDates();
    if (reservation.resource != resource) {
      return null;
    }
    let startIndex: number | null = null;
    let endIndex: number | null = null;
    let roundedLeft = false;
    let roundedRight = false;
    let gridSpan: string | null = null;
    for (let i = 0; i < dates.length; i++) {
      if (dates[i] === reservation.startDate.toLocaleDateString()) {
        startIndex = i;
      }
      if (dates[i] === reservation.endDate.toLocaleDateString()) {
        endIndex = i;
      }
    }
    if (startIndex !== null && endIndex !== null) {
      gridSpan = `${startIndex + 2}/${endIndex + 3}`;
      roundedLeft = true;
      roundedRight = true;
    } else if (startIndex !== null && endIndex === null) {
      gridSpan = `${startIndex + 2}/${dates.length + 3}`;
      roundedLeft = true;
    } else if (startIndex === null && endIndex !== null) {
      gridSpan = `2/${endIndex + 3}`;
      roundedRight = true;
    } else if (startIndex === null && endIndex === null) {
      let dateAfterSevenDays = new Date(this.startDateCalendar);
      dateAfterSevenDays.setDate(this.startDateCalendar.getDate() + 6);

      if (reservation.startDate < this.startDateCalendar && reservation.endDate > dateAfterSevenDays) {
        gridSpan = `2/${dates.length + 3}`;
        roundedLeft = false;
        roundedRight = false;
      }
    }
    return gridSpan ? {gridSpan, roundedLeft, roundedRight} : null;
  }

  nextWeek(): void {
    this.startDateCalendar.setDate(this.startDateCalendar.getDate() + 7);
  }

  prevWeek(): void {
    this.startDateCalendar.setDate(this.startDateCalendar.getDate() - 7);
  }

  addReservation(reservation: {startDate: Date, endDate: Date,  resource: number, username: string}): void {
    this.reservations.push(reservation);
  }
}
