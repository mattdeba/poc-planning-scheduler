import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bryntumScheduler';
  resources = [{id: 42}, {id: 43}, {id: 45}, {id: 46}, {id: 47}];
  rawResources = [{id: 42, value: 'Tracteur 42'}, {id: 43, value: 'Tracteur 43'}, {id: 45, value: 'Tracteur 45'}, {id: 46, value: 'Tracteur 46'}, {id: 47, value: 'Tracteur 47'}];
  displayedDates = [new Date('2024/04/01'), new Date('2024/04/02'), new Date('2024/04/03'), new Date('2024/04/04'),
    new Date('2024/04/05'), new Date('2024/04/06'), new Date('2024/04/07'),
  ]
  reservations = [
    {id: 1, startDate: new Date('2024/04/01'), endDate: new Date('2024/04/02'), resource: 42, username: 'Christine'},
    {id: 2, startDate: new Date('2024/04/02'), endDate: new Date('2024/04/03'), resource: 42, username: 'Matthieu'},
    {id: 3, startDate: new Date('2024/04/04'), endDate: new Date('2024/04/05'), resource: 42, username: 'Paul'},
    {id: 4, startDate: new Date('2024/03/30'), endDate: new Date('2024/04/01'), resource: 42, username: 'Clémence'},
    {id: 5, startDate: new Date('2024/03/30'), endDate: new Date('2024/04/05'), resource: 42, username: 'Michel'},
  ]
  cellWidth = '10vw';
  cellHeight = '30px';

  next(): void {
    this.displayedDates = this.displayedDates.map(date => {
      const newDate = new Date(date);
      newDate.setDate(newDate.getDate() + this.displayedDates.length);
      return newDate;
    });
  }

  prev(): void {
    this.displayedDates = this.displayedDates.map(date => {
      const newDate = new Date(date);
      newDate.setDate(newDate.getDate() - this.displayedDates.length);
      return newDate;
    });
  }

  getGridTemplateHeaderColumns() {
    const nbDates = this.displayedDates.length;
    const headerColumn = `${this.cellWidth} ` + Array(nbDates).fill(`${this.cellWidth}`).join(' ');
    const headerRow = `${this.cellHeight}`;
    return {
      'grid-template-columns': headerColumn,
      'grid-template-rows': headerRow,
    };
  }

  getLineCellCoordinates(resource: any, index: number) {
    const nbReservations = this.getReservationsByResource(resource.id).length;
    return {
      'grid-row': `1/${nbReservations+1}`,
      'grid-column': `${index+2}/${index+3}`,
    }
  }

  getGridRowStyles(resource: any) {
    const reservations = this.getReservationsByResource(resource.id);
    return {
      'grid-template-columns': `${this.cellWidth} ` + Array(this.displayedDates.length).fill(`${this.cellWidth}`).join(' '),
      'grid-template-rows': Array(reservations.length).fill(`${this.cellHeight}`).join(' '),
    };
  }

  getDateHeaderStyle(index: number) {
    const nbDates = this.displayedDates.length;
    return {
      'grid-column': `${index+2} / ${index+3}`
    }
  }

  filterSelection(resourcesSelected: number[]) {
    if (resourcesSelected.length === 0) {
      this.resources = this.rawResources;
    } else {
      this.resources = this.rawResources.filter(resource => resourcesSelected.includes(resource.id));
    }
  }

  getResourceNameCellStyles(resource: any) {
    const reservations = this.getReservationsByResource(resource.id);
    return {
      'grid-row': '1 / ' + (reservations.length + 1)
    };
  }

  getReservationsByResource(resourceId: number): any[] {
    const displayedDatesSet = new Set(this.displayedDates.map(date => date.getTime()));
    return this.reservations.filter(reservation => {
      if (reservation.resource !== resourceId) {
        return false;
      }
      for (let date = new Date(reservation.startDate); date <= reservation.endDate; date.setDate(date.getDate() + 1)) {
        if (displayedDatesSet.has(date.getTime())) {
          return true;
        }
      }
      return false;
    });
  }

  getReservationCoordinates(reservation: any, resourceId: number) {
    const reservations = this.getReservationsByResource(resourceId);
    const reservationIndex = reservations.findIndex((r: any) => r.id === reservation.id) + 1;
    const reservationStyle = this.getGridColumn(reservation);
    if (!reservationStyle) {
      return null
    }
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
}
