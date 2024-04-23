import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-details-event',
  template: `
      <div class="event-editor">
        <mat-card class="matCard">
          <mat-card-header class="header">
              <mat-card-title >DÉTAILS RÉSERVATION</mat-card-title>
          </mat-card-header>
          <mat-card-content>
              <p>Libellé: {{event.username}}</p>
              <p>Début: {{event.startDate | date:'dd/MM/YYYY'}} à {{event.startHour}} </p>
              <p>Fin: {{event.endDate | date:'dd/MM/YYYY'}}  à {{event.endHour}}</p>
          </mat-card-content>
          <mat-card-actions class="actions">
            <button mat-button (click)="sendOkEvent()">OK</button>
            <button mat-button color="primary" (click)="switchToEdit()">MODIFIER</button>
            <button mat-button color="warn" (click)="sendDeleteEvent()">SUPPRIMER</button>
          </mat-card-actions>
        </mat-card>
      </div>
  `,
  styles: [`
    .event-editor {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .matCard {
        width: 90%;
    }

    .actions {
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
  `],
})
export class ReservationDetailsComponent {
  @Input() event: any;
  @Output() eventSwitchToEdit = new EventEmitter<void>;
  @Output() okEvent = new EventEmitter<void>;
  @Output() deleteEvent = new EventEmitter<number>;

  switchToEdit() {
    this.eventSwitchToEdit.emit();
  }

  sendOkEvent() {
    this.okEvent.emit();
  }

  sendDeleteEvent() {
    this.deleteEvent.emit(this.event.id);
  }
}
