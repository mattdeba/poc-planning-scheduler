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
    {id: 1, startDate: new Date('2024/04/01'), endDate: new Date('2024/04/02'), resource: 42, username: 'Christine'},
    {id: 2, startDate: new Date('2024/04/02'), endDate: new Date('2024/04/03'), resource: 42, username: 'Matthieu'},
  ]
  reservationsByDate: any = null;
  reservationsByResource: any = null;
  gridStyles: any = {};

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
        }).sort((a, b) => {
          let dateComparison = a.startDate.getTime() - b.startDate.getTime();
          return dateComparison === 0 ? a.id - b.id : dateComparison;
        });
      });
      return acc;
    }, {});
  }

  getGridTemplateHeaderColumnsCount() {
    return this.displayedDates.length;
  }

  getGridTemplateHeaderColumns() {
    let count = this.getGridTemplateHeaderColumnsCount();
    return '1fr ' + Array(count).fill('1fr').join(' ');
  }

  getMaxReservations(resource: any) {
    let maxReservations = 0;
    this.displayedDates.forEach(date => {
      let resourceDateKey = `${resource.id}-${date.toISOString()}`;
      let reservationsCount = this.reservationsByDate[resourceDateKey]?.length || 0;
      maxReservations = Math.max(maxReservations, reservationsCount);
    });
    return maxReservations;
  }

  getGridTemplateRows(resource: any) {
    let maxReservations = this.getMaxReservations(resource);
    return Array(maxReservations).fill('50px').join(' ');
  }

  getGridRowStyles(resource: any) {
    return {
      'grid-template-columns': this.getGridTemplateHeaderColumns(),
      'grid-template-rows': this.getGridTemplateRows(resource)
    };
  }

  getResourceNameCellStyles(resource: any) {
    return {
      'grid-row': '1 / ' + (this.getMaxReservations(resource) + 1)
    };
  }

  groupByResources() {
    this.reservationsByResource = this.resources.reduce<Record<number, any>>((acc, resource) => {
      acc[resource.id] = this.reservations.filter(reservation => reservation.resource === resource.id);
      return acc;
    }, {});
  }
  getReservationCoordinates(reservation: any, resourceId: number) {
    const reservations = this.reservationsByResource[resourceId];
    return {
      'grid-row': `${reservation.id}/${reservation.id + 1}`,
      'grid-column': '3/4'
    }
  }

  ngOnInit() {
    this.groupByDates();
    this.groupByResources();
    console.log(this.reservationsByDate);
    this.resources.forEach(resource => {
      this.gridStyles[resource.id] = {
        gridTemplateColumns: this.getGridTemplateHeaderColumns(),
        gridTemplateRows: this.getGridTemplateRows(resource)
      };
    });
  }
}
