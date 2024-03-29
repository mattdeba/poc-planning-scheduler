import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-reservation-detail',
  template: `
    <div class="modal" *ngIf="reservation" [ngStyle]="{'top.px': position.y, 'left.px': position.x}">
      <h2>Details réservation</h2>
      <p>Matériel: {{reservation.resource}}</p>
      <p>Utilisateur: {{reservation.username}}</p>
      <p>Date début: {{reservation.startDate | date:'dd/MM/yyyy'}}</p>
      <button (click)="closeModal()">Ok</button>
    </div>
  `,
  styles: [`
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
}
