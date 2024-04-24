import {Component, EventEmitter, Input, Output} from '@angular/core';
import {dateToString, getTodayString } from './utils';

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
            <button class="btn-validate" type="submit">Sauvegarder</button>
            <button class="btn-close" type="button" (click)="closeModal.emit()">Annuler</button>
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
      font-size: 1.1em;
      z-index: 1001;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 30%;
      height: 60%;
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
      font-size: 1.3em
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

    .btn-validate {
      border: 1px solid #D8D9DA;
      padding: 10px 20px;
      transition: background-color 0.2s ease;
      font-size: 1em;
      cursor: pointer;
    }
    .btn-validate:hover {
      background-color: #D8D9DA;
      color: white;
    }
    .btn-close {
      border: 1px solid #D8D9DA;
      padding: 10px 20px;
      transition: background-color 0.2s ease;
      font-size: 1em;
      cursor: pointer;
    }
    .btn-close:hover {
      background-color: #D8D9DA;
      color: white;
    }

    .label {
      margin-top: 20px;
    }
    .validation-buttons {
      margin-top: 30px;
    }

    .edit-title {
      padding: 20px;
    }
  `]
})
export class ReservationEditHtmlComponent {
  @Output() closeModal = new EventEmitter<void>();
  @Output() submitReservation = new EventEmitter<{id: number | undefined, startDate: string, endDate: string, resource: number, username: string, status: string}>();
  @Input() resources: {id: number, value: string}[] = []
  @Input() reservationToEdit: {id: number | undefined, startDate: string, endDate: string, resource: { id: number, value: string }, username: string, status: string} | null;

  username = '';
  resource: number | null = null;
  startDate: string | null = getTodayString();
  endDate: string | null = getTodayString();

  ngOnInit() {
    this.startDate = this.reservationToEdit?.startDate || getTodayString();
    this.endDate = this.reservationToEdit?.endDate || getTodayString();
    this.resource = this.reservationToEdit?.resource.id || null;
    this.username = this.reservationToEdit?.username || '';
  }

  submitForm(event: Event): void {
    if (this.startDate && this.resource && this.username && this.endDate) {
      event.preventDefault();
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);
      this.submitReservation.emit({id: this.reservationToEdit?.id, startDate: dateToString(start), endDate: dateToString(end), resource: +this.resource, username: this.username, status: 'toValid'});
      this.closeModal.emit();
    }
  }
}