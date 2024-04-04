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
    {id: 3, startDate: new Date('2024/04/04'), endDate: new Date('2024/04/05'), resource: 42, username: 'Paul'},
    {id: 4, startDate: new Date('2024/03/30'), endDate: new Date('2024/04/01'), resource: 42, username: 'Clémence'},
    {id: 5, startDate: new Date('2024/03/30'), endDate: new Date('2024/04/05'), resource: 42, username: 'Michel'},
    {id: 1, startDate: new Date('2024/04/01'), endDate: new Date('2024/04/02'), resource: 43, username: 'Christine'},
    {id: 2, startDate: new Date('2024/04/02'), endDate: new Date('2024/04/03'), resource: 43, username: 'Matthieu'},
    {id: 3, startDate: new Date('2024/04/04'), endDate: new Date('2024/04/05'), resource: 43, username: 'Paul'},
    {id: 4, startDate: new Date('2024/03/30'), endDate: new Date('2024/04/01'), resource: 43, username: 'Clémence'},
    {id: 5, startDate: new Date('2024/03/30'), endDate: new Date('2024/04/05'), resource: 43, username: 'Michel'},
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

  getNbReservations(resource: any) {
    return this.reservations.filter(reservation => reservation.resource === resource.id).length;
  }

  getGridTemplateRows(resource: any) {
    let maxReservations = this.getNbReservations(resource);
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
      'grid-row': '1 / ' + (this.getNbReservations(resource) + 1)
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
    const reservationIndex = reservations.findIndex((r: any) => r.id === reservation.id) + 1;
    const reservationStyle = this.getGridColumn(reservation);
    return {
      'grid-row': `${reservationIndex}/${reservationIndex + 1}`,
      'grid-column': reservationStyle.gridSpan,
      'border-top-left-radius': reservationStyle.roundedLeft ? '10px' : '0',
      'border-bottom-left-radius': reservationStyle.roundedLeft ? '10px' : '0',
      'border-top-right-radius': reservationStyle.roundedRight ? '10px' : '0',
      'border-bottom-right-radius': reservationStyle.roundedRight ? '10px' : '0'
    }
  }

  getGridColumn(reservation: any): any {
    const dates = this.displayedDates.map(d => d.toLocaleDateString());
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
      gridSpan = `${startIndex + 2}/${dates.length + 2}`;
      roundedLeft = true;
    } else if (startIndex === null && endIndex !== null) {
      gridSpan = `2/${endIndex + 3}`;
      roundedRight = true;
    } else if (startIndex === null && endIndex === null) {
      const firstDisplayedDate = this.displayedDates[0];
      const lastDisplayedDate = this.displayedDates[this.displayedDates.length - 1];

      if (reservation.startDate < firstDisplayedDate && reservation.endDate > lastDisplayedDate) {
        gridSpan = `2/${dates.length + 2}`;
        roundedLeft = false;
        roundedRight = false;
      }
    }
    return gridSpan ? {gridSpan, roundedLeft, roundedRight} : null;
  }

  ngOnInit() {
    this.groupByDates();
    this.groupByResources();
    this.resources.forEach(resource => {
      this.gridStyles[resource.id] = {
        gridTemplateColumns: this.getGridTemplateHeaderColumns(),
        gridTemplateRows: this.getGridTemplateRows(resource)
      };
    });
  }
}
