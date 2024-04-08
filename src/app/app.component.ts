import { Component } from '@angular/core';
import { formatDate } from './utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bryntumScheduler';
  rawResources = [{id: 39, value: 'Tracteur JD'}, {id: 40, value: 'Tracteur New Holland'}, {id: 41, value: 'Tracteur Case IH'}, {id: 42, value: 'Benne Jeantil'}, {id: 43, value: 'Tonne à lisier'}];
  resources = this.rawResources;
  displayedDates = [new Date('2024/04/01'), new Date('2024/04/02'), new Date('2024/04/03'), new Date('2024/04/04'),
    new Date('2024/04/05'), new Date('2024/04/06'), new Date('2024/04/07'),
    new Date('2024/04/08'), new Date('2024/04/09'), new Date('2024/04/10'),
  ]
  reservations = [
    {id: 1, startDate: new Date('2024/03/31'), endDate: new Date('2024/04/16'), resource: 39, username: 'Matthieu'},
    {id: 2, startDate: new Date('2024/04/02'), endDate: new Date('2024/04/03'), resource: 40, username: 'Estelle'},
    {id: 3, startDate: new Date('2024/04/04'), endDate: new Date('2024/04/05'), resource: 41, username: 'Céline'},
    {id: 4, startDate: new Date('2024/03/30'), endDate: new Date('2024/04/01'), resource: 42, username: 'Guillaume'},
    {id: 5, startDate: new Date('2024/03/30'), endDate: new Date('2024/04/05'), resource: 43, username: 'Attmane'},
  ]
  cellWidth = '8vw';
  cellHeight = '50px';
  selectedReservation: {id: number | undefined, startDate: Date, endDate: Date, resource: { id: number, value: string }, username: string} | null;
  modalPosition: { x: number, y: number };
  enableScroll = true;
  showEdition = false;
  showDetail = false;
  offset = 1;//nombre de colonnes pour les ressources.


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
    const maxNbReservations = this.getMaxResaPerDay(reservations, this.displayedDates);
    return {
      'grid-template-columns': `${this.cellWidth} ` + Array(this.displayedDates.length).fill(`${this.cellWidth}`).join(' '),
      'grid-template-rows': Array(maxNbReservations).fill(`${this.cellHeight}`).join(' '),
      'min-height': `${this.cellHeight}`
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
    const displayedDatesSet = new Set(this.displayedDates.map(date => formatDate(date)));
    return this.reservations.filter(reservation => {
      if (reservation.resource !== resourceId) {
        return false;
      }
      for (let date = new Date(reservation.startDate); date <= reservation.endDate; date.setDate(date.getDate() + 1)) {
        if (displayedDatesSet.has(formatDate(date))) {
          return true;
        }
      }
      return false;
    });
  }

  getMaxResaPerDay(resas: any[], dates: any[]) {
    let maxResaPerDay = 0;
    dates.forEach(date => {
      const reservationsOnDate = resas.filter(resa => resa.startDate <= date && resa.endDate >= date);
      maxResaPerDay = Math.max(maxResaPerDay, reservationsOnDate.length);
    })
    return maxResaPerDay;
  }

  getReservationIndices(resa: any, dates: any[]) {
    const timeDates = dates.map(d => d.toLocaleDateString());
    let startIndex = null;
    let endIndex = null;
    for (let i = 0; i < dates.length; i++) {
      if (timeDates[i] === resa.startDate.toLocaleDateString()) {
        startIndex = i;
      }
      if (timeDates[i] === resa.endDate.toLocaleDateString()) {
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
      //ATTENTION dans la comparaison des dates avec le UTC et la date locale.
      if (resa.startDate < this.displayedDates[0] && resa.endDate > this.displayedDates[this.displayedDates.length - 1]) {
        return {startIndex: 0, endIndex: timeDates.length - 1}
      }
    }
    return {startIndex: null, endIndex: null};
  }

  getReservationsByResourceWithCoordinates(resourceId: number): any[] {
    const reservations = this.getReservationsByResource(resourceId);
    const nbLines = this.getMaxResaPerDay(reservations, this.displayedDates);
    const spaces = Array.from({length: nbLines}, () => Array(this.displayedDates.length).fill(true));
    reservations.forEach(resa => {
      const { startIndex, endIndex } = this.getReservationIndices(resa, this.displayedDates);
      if (startIndex!=null && endIndex!=null) {
        for (let i = 0; i < nbLines; i++) {
          if (spaces[i].slice(startIndex, endIndex + 1).every(space => space === true)) {
            spaces[i].fill(false, startIndex, endIndex + 1);
            resa.startColIndex = startIndex;
            resa.endColIndex = endIndex;
            resa.rowIndex = i;
            break;
          }
        }
      } else {
        resa.startColIndex = null;
        resa.endColIndex = null;
        resa.rowIndex = null;
      }
    });
    return reservations;
  }

  getReservationCoordinates(reservation: any) {
    if (reservation.startColIndex!=null && reservation.endColIndex!=null && reservation.rowIndex!=null) {
      return {
        'grid-column': `${this.offset + reservation.startColIndex + 1}/${this.offset + reservation.endColIndex + 2}`,
        'grid-row': `${reservation.rowIndex + 1}/${reservation.rowIndex + 2}`
      }
    }
    return null;
  }

  getReservationContentBorders(reservation: any, resourceId: number) {
    const reservationStyle = this.getGridBorders(reservation);
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

  getGridBorders(reservation: any): any {
    const dates = this.displayedDates.map(d => d.toLocaleDateString());
    let startIndex: number | null = null;
    let endIndex: number | null = null;
    let roundedLeft = false;
    let roundedRight = false;
    for (let i = 0; i < dates.length; i++) {
      if (dates[i] === reservation.startDate.toLocaleDateString()) {
        startIndex = i;
      }
      if (dates[i] === reservation.endDate.toLocaleDateString()) {
        endIndex = i;
      }
    }
    if (startIndex !== null && endIndex !== null) {
      roundedLeft = true;
      roundedRight = true;
    } else if (startIndex !== null && endIndex === null) {
      roundedLeft = true;
    } else if (startIndex === null && endIndex !== null) {
      roundedRight = true;
    } else if (startIndex === null && endIndex === null) {
      const firstDisplayedDate = this.displayedDates[0];
      const lastDisplayedDate = this.displayedDates[this.displayedDates.length - 1];

      if (reservation.startDate < firstDisplayedDate && reservation.endDate > lastDisplayedDate) {
        roundedLeft = false;
        roundedRight = false;
      }
    }
    return {roundedLeft, roundedRight};
  }

  showModal(reservation: {id: number | undefined, startDate: Date, endDate: Date, resource: number, username: string}, event: MouseEvent): void {
    this.showDetail = true;
    const resource = this.resources.find(r => r.id === reservation.resource);
    if (resource) {
      this.selectedReservation = {...reservation, resource };
    }
    this.modalPosition = { x: event.clientX, y: event.clientY };
    this.enableScroll = false;
  }

  closeModal(): void {
    this.selectedReservation = null;
    this.showDetail = false;
    this.enableScroll = true;
  }
  switchToEditMode(reservation: any): void {
    this.selectedReservation = reservation;
    this.showDetail = false;
    this.showEdition = true;
  }

  addReservation(reservation: {id: number | undefined, startDate: Date, endDate: Date,  resource: number, username: string}): void {
    if (reservation?.id !== undefined) {
      const index = this.reservations.findIndex((r) => r.id === reservation.id);
      if (index !== -1) {
        this.reservations.splice(index, 1, reservation as {id: number, startDate: Date, endDate: Date,  resource: number, username: string});
      }
    }
    else {
      this.reservations.push({...reservation, id: this.reservations.length + 1});
    }
  }
}
