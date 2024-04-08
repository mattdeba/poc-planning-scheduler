import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-reservation-detail',
  template: `
    <div class="modal-overlay" *ngIf="reservation" (click)="preventClose($event)">
        <div class="modal" *ngIf="reservation" [ngStyle]="{'top.px': position.y, 'left.px': position.x}">
            <p><strong>{{reservation.resource.value}}</strong> pour <strong>{{reservation.username}}</strong></p>
            <p>du <strong>{{reservation.startDate | date:'dd/MM/yyyy'}}</strong> au <strong>{{reservation.endDate | date:'dd/MM/yyyy'}}</strong></p>
            <div class="validation-buttons">
                <button class="button" (click)="closeModal()">Ok</button>
                <button class="button">Modifier</button>    
            </div>
        </div>
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
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      z-index: 1001;
    }
    
    p {
      font-size: 1.5em;
    }

    .validation-buttons {
      display: flex;
      justify-content: center;
      gap: 20px;
      width: 100%;
      margin-top: 15px;
    }

    .button {
      border: 1px solid #D8D9DA;
      padding: 10px 20px;
      transition: background-color 0.2s ease;
      font-size: 1em;
      cursor: pointer;
    }
    .button:hover {
      background-color: #D8D9DA;
      color: white;
    }
  `]
})
export class ReservationDetailComponent {
  @Input() reservation: {startDate: Date, endDate: Date, resource: { id: number, value: string }, username: string} | null;
  @Output() close = new EventEmitter<void>();
  @Input() position: { x: number, y: number };

  closeModal(): void {
    this.close.emit();
  }

  preventClose(event: MouseEvent): void {
    event.stopPropagation();
  }
}
