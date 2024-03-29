import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-reservation-detail',
  template: `
    <div class="modal-overlay" *ngIf="reservation" (click)="preventClose($event)">
      <div class="modal" [ngStyle]="{'top.px': position.y, 'left.px': position.x}">
        <h2>Details réservation</h2>
        <p>Matériel: {{reservation.resource}}</p>
        <p>Utilisateur: {{reservation.username}}</p>
        <p>Date début: {{reservation.startDate | date:'dd/MM/yyyy'}}</p>
        <button (click)="closeModal()">Ok</button>
      </div>
    </div>
    <div class="modal" *ngIf="reservation" [ngStyle]="{'top.px': position.y, 'left.px': position.x}">
      <h2>Details réservation</h2>
      <p>Matériel: {{reservation.resource}}</p>
      <p>Utilisateur: {{reservation.username}}</p>
      <p>Date début: {{reservation.startDate | date:'dd/MM/yyyy'}}</p>
      <button (click)="closeModal()">Ok</button>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .modal {
      position: fixed;
      background: white;
      padding: 20px;
      border: 1px solid black;
      z-index: 1001;
    }
  `]
})
export class ReservationDetailComponent {
  @Input() reservation: {startDate: Date, resource: number, username: string} | null;
  @Output() close = new EventEmitter<void>();
  @Input() position: { x: number, y: number };

  closeModal(): void {
    this.close.emit();
  }

  preventClose(event: MouseEvent): void {
    event.stopPropagation();
  }
}
