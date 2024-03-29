import { Component } from '@angular/core';

@Component({
  selector: 'app-reservation-edit',
  template: `
    <div class="modal">
      <div>Nouvelle réservation</div>
    </div>
  `,
  styles: [`
    .modal {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  `]
})
export class ReservationEditComponent {

}
