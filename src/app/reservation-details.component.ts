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
              <p>Du: {{event.startDate | date:'dd/MM/YYYY'}} <span *ngIf="event.startHour">à</span> {{event.startHour}} </p>
              <p>Au: {{event.endDate | date:'dd/MM/YYYY'}} <span *ngIf="event.startHour">à</span> {{event.endHour}}</p>
              <p>Matériel: {{eventEquipment.label}}</p>
              <p>Réservation pour {{event.username}}</p>
              <p>Réservation faite le: {{dateReservation | date:'dd/MM/YYYY'}} à {{dateReservation | date: 'hh:mm'}}</p>
              <p>Volume de travail: 10Ha</p>
              <p>Responsable: Alex 06.00.00.00.00</p>
              <p>Dernière réservation par: Luc</p>
              <p>Article: article1</p>
              <p>Commentaire: ici est saisie le commentaire</p>
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
      justify-content: center;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
    
    button {
      margin: 0 25px 0 25px;
    }
    
    p {
      margin-top: 5px;
    }
  `],
})
export class ReservationDetailsComponent {
  private _event: any;
  @Input()
  set event(value: any) {
    this._event = value;
    this.eventEquipment = this.equipments.find((eq: any) => eq.key == this._event.resource);
  }
  get event() {
    return this._event;
  }
  @Output() eventSwitchToEdit = new EventEmitter<void>;
  @Output() okEvent = new EventEmitter<void>;
  @Output() deleteEvent = new EventEmitter<number>;
  @Input() equipments: any;
  eventEquipment: any;
  dateReservation = new Date();

  ngOnInit() {
    // this.eventEquipment = this.equipments.find((eq: any) => eq.key == this.event.resource)
  }

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
