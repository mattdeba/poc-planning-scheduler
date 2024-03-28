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
    {startDate: new Date(), resource: 42, username: 'Alice' },
    {startDate: new Date('2024/04/18'), resource: 43, username: 'Bob'},
    {startDate: new Date('2024/04/01'), resource: 45, username: 'Matthieu'},
    {startDate: new Date('2024/04/02'), resource: 45, username: 'Matthieu'},
  ]
  startDateCalendar = new Date(); // Date de début, vous pouvez la définir comme vous le souhaitez
  selectedReservation: {startDate: Date, resource: number, username: string} | null;
  modalPosition: { x: number, y: number };

  showModal(reservation: {startDate: Date, resource: number, username: string}, event: MouseEvent): void {
    this.selectedReservation = reservation;
    this.modalPosition = { x: event.clientX, y: event.clientY };
  }
  closeModal(): void {
    this.selectedReservation = null;
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

  getGridColumn(reservation: {startDate: Date, resource: number}, resource: number): string | null {
    const dates = this.getDates();
    if (reservation.resource !== resource) {
      return null;
    }
    for (let i = 0; i < dates.length; i++) {
      if (dates[i] === reservation.startDate.toLocaleDateString()) {
        return `${i + 2}/${i + 3}`;
      }
    }
    return null;
  }

  nextWeek(): void {
    this.startDateCalendar.setDate(this.startDateCalendar.getDate() + 7);
  }

  prevWeek(): void {
    this.startDateCalendar.setDate(this.startDateCalendar.getDate() - 7);
  }
}
