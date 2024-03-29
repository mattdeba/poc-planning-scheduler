import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-reservation-edit',
  template: `
    <div class="overlay"></div>
    <div class="modal">
      <div>Nouvelle réservation</div>
      <button (click)="closeModal.emit()">Fermer</button>
    </div>
  `,
  styles: [`
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0);
    }
    .modal {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  `]
})
export class ReservationEditComponent {
  @Output() closeModal = new EventEmitter<void>();
}
