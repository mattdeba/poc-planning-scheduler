import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-reservation-edit',
  template: `
    <div class="overlay"></div>
    <div class="modal">
      <div>Nouvelle réservation</div>
      <form (submit)="submitForm($event)">
        <div>
          <label>Nom de la personne qui réserve:</label>
          <input [(ngModel)]="username" name="username" required>
        </div>
        <div>
          <label>Matériel:</label>
          <select [(ngModel)]="resource" name="resource" required>
            <option *ngFor="let res of resources" [value]="res.id">{{res.id}}</option>
          </select>
        </div>
        <div>
          <label>Date de début:</label>
          <input [(ngModel)]="startDate" name="startDate" type="date" required>
        </div>
        <div>
          <label>Date de fin:</label>
          <input [(ngModel)]="endDate" name="endDate" type="date" required>
        </div>
        <button type="submit">Réserver</button>
        <button type="button" (click)="closeModal.emit()">Fermer</button>
      </form>
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
      background: white;
      padding: 20px;
      border: 2px solid #333;
      box-shadow: 0 0 10px rgba(0,0,0,0.5);
      font-size: 1.2em;
      z-index: 1001;
    }
  `]
})
export class ReservationEditComponent {
  @Output() closeModal = new EventEmitter<void>();
  @Output() submitReservation = new EventEmitter<{startDate: Date, endDate: Date, resource: number, username: string}>();
  @Input() resources: {id: number}[] = []

  username = '';
  resource: number | null = null;
  startDate: string | null = null;
  endDate: string | null;

  submitForm(event: Event): void {
    if (this.startDate && this.resource && this.username && this.endDate) {
      event.preventDefault();
      let start = new Date(this.startDate);
      let end = new Date(this.endDate);
      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);
      this.submitReservation.emit({startDate: start, endDate: end, resource: +this.resource, username: this.username});
      this.closeModal.emit();
    }
  }
}
