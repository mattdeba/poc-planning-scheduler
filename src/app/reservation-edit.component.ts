import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-reservation-edit',
  template: `
    <div class="overlay"></div>
    <div class="modal">
      <div class="edit-title">Editer la réservation</div>
      <form (submit)="submitForm($event)">
        <div class="label">
            <label for="startDate">Date de début:</label>
        </div>
        <div class="date-container">
            <input [(ngModel)]="startDate" name="startDate" type="date" required>
        </div>
        <div class="label">
            <label for="endDate">Date de fin:</label>
        </div>
        <div class="date-container">
            <input [(ngModel)]="endDate" name="endDate" type="date" required>
        </div>

        <div class="label">
            <label for="resource">Matériel:</label>
        </div>
        <div class="materiel-container">
            <div>
                <select class="materiel-choice" [(ngModel)]="resource" name="resource" required>
                    <option *ngFor="let res of resources" [value]="res.id">{{res.value}}</option>
                </select>    
            </div>
        </div>
        <div class="label">
            <label for="username">Adhérent:</label>
        </div>
        <div class="user-container">
          <input class="user-choice" [(ngModel)]="username" name="username" required>
        </div>
        <div class="validation-buttons">
            <button class="button" type="submit">Réserver</button>
            <button class="button" type="button" (click)="closeModal.emit()">Fermer</button>      
        </div>
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
      background: rgba(0, 0, 0, 0);
    }

    .modal {
      padding: 20px;
      font-size: 1.2em;
      z-index: 1001;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 30%;
      height: 80%;
      background: white;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      overflow: auto;
    }

    input{
      border: 1px solid #F3F4F5;
      appearance: none;
      position: relative;
      background-size: 1.5em;
      font-size: 1em;
    }

    select{
      border: 1px solid #F3F4F5;
      position: relative;
      background-size: 1.5em;
      font-size: 1em;
    }

    .edit-title {
      font-weight: bold;
      color: #52c541;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5em
    }
    
    .date-container, .materiel-container, .user-container {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
    
    .user-choice {
      background-color: white;
    }

    .validation-buttons {
      display: flex;
      justify-content: center;
      gap: 20px;
      width: 100%;
      margin-top: 15px;
      margin-bottom: 15px;
    }
  `]
})
export class ReservationEditComponent {
  @Output() closeModal = new EventEmitter<void>();
  @Output() submitReservation = new EventEmitter<{startDate: Date, endDate: Date, resource: number, username: string}>();
  @Input() resources: {id: number, value: string}[] = []

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
