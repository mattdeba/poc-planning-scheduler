import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bryntumScheduler';
  resources = [{id: 42}, {id: 43}, {id: 45}, {id: 46}, {id: 47}]; // Ressources fixes
  displayedDates = [new Date('2024/04/01'), new Date('2024/04/02'), new Date('2024/04/03'), new Date('2024/04/04')]
  reservations = [
    {startDate: new Date('2024/04/01'), endDate: new Date('2024/04/02'), resource: 42, username: 'Christine'},
    {startDate: new Date('2024/04/02'), endDate: new Date('2024/04/03'), resource: 42, username: 'Matthieu'},
  ]
  reservationsByDate: any = null;

  groupByDates() {
    this.reservationsByDate = this.displayedDates.reduce<Record<string, any>>((acc, date) => {
      let dateKey = new Date(date);
      dateKey.setHours(0, 0, 0, 0);
      this.resources.forEach(resource => {
        let resourceDateKey = `${resource.id}-${dateKey.toISOString()}`;
        acc[resourceDateKey] = this.reservations.filter(reservation => {
          let reservationStartDate = new Date(reservation.startDate);
          reservationStartDate.setHours(0, 0, 0, 0);
          let reservationEndDate = new Date(reservation.endDate);
          reservationEndDate.setHours(0, 0, 0, 0);
          return dateKey.getTime() >= reservationStartDate.getTime() && dateKey.getTime() <= reservationEndDate.getTime() && reservation.resource === resource.id;
        });
      });
      return acc;
    }, {});
  }

  getGridTemplateHeaderColumns() {
    return '1fr ' + this.displayedDates.map(() => '1fr').join(' ');
  }

  getGridTemplateRows(resource: any) {
    let maxReservations = 0;
    this.displayedDates.forEach(date => {
      let resourceDateKey = `${resource.id}-${date.toISOString()}`;
      let reservationsCount = this.reservationsByDate[resourceDateKey]?.length || 0;
      maxReservations = Math.max(maxReservations, reservationsCount);
    });
    return Array(maxReservations).fill('50px').join(' ');
  }

  ngOnInit() {
    this.groupByDates();
  }
}
