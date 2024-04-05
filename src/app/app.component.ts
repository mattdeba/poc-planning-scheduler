import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bryntumScheduler';
  rawResources = [{id: 42, value: 'Tracteur 42'}, {id: 43, value: 'Tracteur 43'}, {id: 45, value: 'Tracteur 45'}, {id: 46, value: 'Tracteur 46'}, {id: 47, value: 'Tracteur 47'}];
  resources = this.rawResources;
  displayedDates = [new Date('2024/04/01'), new Date('2024/04/02'), new Date('2024/04/03'), new Date('2024/04/04'),
    new Date('2024/04/05'), new Date('2024/04/06'), new Date('2024/04/07'),
    new Date('2024/04/08'), new Date('2024/04/09'), new Date('2024/04/10'),
    new Date('2024/04/11'), new Date('2024/04/12'), new Date('2024/04/13'),
    new Date('2024/04/14'), new Date('2024/04/15')
  ]
  reservations = [
    {id: 1, startDate: new Date('2024/04/01'), endDate: new Date('2024/04/02'), resource: 42, username: 'Matthieu'},
    {id: 2, startDate: new Date('2024/04/02'), endDate: new Date('2024/04/03'), resource: 43, username: 'Estelle'},
    {id: 3, startDate: new Date('2024/04/04'), endDate: new Date('2024/04/05'), resource: 45, username: 'Céline'},
    {id: 4, startDate: new Date('2024/03/30'), endDate: new Date('2024/04/01'), resource: 46, username: 'Dimitri'},
    {id: 5, startDate: new Date('2024/03/30'), endDate: new Date('2024/04/05'), resource: 47, username: 'Guillaume'},
  ]
  cellWidth = '6vw';
  cellHeight = '50px';
  selectedReservation: {startDate: Date, endDate: Date, resource: number, username: string} | null;
  modalPosition: { x: number, y: number };
  enableScroll = true;
  showEdition = false;


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

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getReservationsByResource(resourceId: number): any[] {
    const displayedDatesSet = new Set(this.displayedDates.map(date => this.formatDate(date)));
    return this.reservations.filter(reservation => {
      if (reservation.resource !== resourceId) {
        return false;
      }
      for (let date = new Date(reservation.startDate); date <= reservation.endDate; date.setDate(date.getDate() + 1)) {
        if (displayedDatesSet.has(this.formatDate(date))) {
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
    console.log(reservation, resourceId);
    if (!reservationStyle) {
      return null
    }
    return {
      'grid-row': `${reservationIndex}/${reservationIndex + 1}`,
      'grid-column': reservationStyle.gridSpan
    }
  }

  getReservationContentBorders(reservation: any, resourceId: number) {
    const reservationStyle = this.getGridColumn(reservation);
    if (!reservationStyle) {
      return null
    }
    return {
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

  showModal(reservation: {startDate: Date, endDate: Date, resource: number, username: string}, event: MouseEvent): void {
    this.selectedReservation = reservation;
    this.modalPosition = { x: event.clientX, y: event.clientY };
    this.enableScroll = false;
  }
  closeModal(): void {
    this.selectedReservation = null;
    this.enableScroll = true;
  }

  addReservation(reservation: {startDate: Date, endDate: Date,  resource: number, username: string}): void {
    this.reservations.push({id: this.reservations.length + 1, ...reservation});
  }
}
