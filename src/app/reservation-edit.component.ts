import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-edit-event',
  template: `
      <div class="event-editor">
        <mat-card class="matCard">
            <mat-card-header class="header">
                <mat-card-title>MODIFIER RÉSERVATION</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="user">
                  <mat-form-field class="userForm">
                      <mat-label>Choix utilisateur</mat-label>
                      <mat-select [(value)]="userSelected">
                          <mat-option *ngFor="let user of users" [value]="user">
                              {{user.label}}
                          </mat-option>
                      </mat-select>
                  </mat-form-field>
              </div>
              <div class="equipment">
                  <mat-form-field class="equipmentForm" >
                      <mat-label>Choix matériel</mat-label>
                      <mat-select [(value)]="equipmentSelected">
                          <mat-option *ngFor="let equipment of equipments" [value]="equipment">
                              {{equipment.label}}
                          </mat-option>
                      </mat-select>
                  </mat-form-field>
              </div>
              <div class="hourDate">
                  <app-date-picker [inputWidth]="'160px'" [selectedDate]="startDate" (selectedDateChange)="changeStartDate($event)" [label]="'Date début'" class="startDate"></app-date-picker>
                  <mat-form-field class="hour">
                      <mat-label>Heure début</mat-label>
                      <mat-select [(value)]="startHour">
                          <mat-option *ngFor="let hour of hours" [value]="hour">
                              {{hour}}
                          </mat-option>
                      </mat-select>
                  </mat-form-field>
              </div>
              <div class="hourDate">
                  <app-date-picker [inputWidth]="'160px'" [selectedDate]="endDate" (selectedDateChange)="changeEndDate($event)" [label]="'Date fin'"></app-date-picker>
                  <mat-form-field class="hour">
                      <mat-label>Heure fin</mat-label>
                      <mat-select [(value)]="endHour">
                          <mat-option *ngFor="let hour of hours" [value]="hour">
                              {{hour}}
                          </mat-option>
                      </mat-select>
                  </mat-form-field>
              </div>
            </mat-card-content>
            <mat-card-actions class="actions">
              <button mat-button color="primary" (click)="sendSaveEvent()">ENREGISTRER</button>
              <button mat-button (click)="sendCancelEvent()">ANNULER</button>
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
    .hour {
        width: 130px;
        margin-left: 10px;
    }
    .hourDate {
        display: flex;
        justify-content: center;
    }
    .matCard {
      width: 90%;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      margin-bottom: 10px;
    }

    .actions {
      margin-top: 10px;
      display: flex;
      justify-content: center;
    }
    button {
      margin: 0 25px 0 25px;
    }
    
    .equipmentForm {
      width: 310px;
      display: block;
    }
    .userForm {
      width: 310px;
    }
    
    .cardContent {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    
    .user {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    .equipment {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  `],
})
export class ReservationEditComponent {
  startDate = new Date().toISOString().split('T')[0];
  endDate = new Date().toISOString().split('T')[0];
  startHour = '08:00';
  endHour = '18:00';
  hours: string[] = this.generateHours();
  equipmentSelected: any;
  userSelected: any;
  @Input() event: any;
  @Input() equipments: any;
  @Input() users: any;
  @Output() saveEvent = new EventEmitter<any>;
  @Output() cancelEvent = new EventEmitter<void>;


ngOnInit() {
  this.startDate = this.event.startDate;
  this.endDate = this.event.endDate;
  this.equipmentSelected = this.equipments.find((equipment: any) => equipment.key === this.event.resource);
  this.userSelected = this.users.find((u: any) => u.label == this.event.username) || this.users[0];
}

  sendSaveEvent() {
    this.event.startDate = this.startDate;
    this.event.endDate = this.endDate;
    this.event.startHour = this.startHour;
    this.event.endHour = this.endHour;
    this.event.username = this.userSelected.label;
    this.event.resource = this.equipmentSelected.key;
    this.saveEvent.emit(this.event);
  }

  sendCancelEvent() {
    this.cancelEvent.emit(this.event.id);
  }

  generateHours(): string[] {
    let hours = [];
    for(let i = 0; i < 24; i++) {
      for(let j = 0; j < 60; j += 30) {
        let hour = i < 10 ? '0' + i : i;
        let minute = j < 10 ? '0' + j : j;
        hours.push(`${hour}:${minute}`);
      }
    }
    return hours;
  }

  getNearestHalfHour(hour: number, minute: number): string {
    let newHour: number;
    let newMinute: number;

    if (minute <= 15) {
      newHour = hour;
      newMinute = 0;
    } else if (minute > 15 && minute < 45) {
      newHour = hour;
      newMinute = 30;
    } else {
      newHour = hour + 1;
      newMinute = 0;
    }

    const hourString = newHour < 10 ? '0' + newHour : newHour;
    const minuteString = newMinute === 0 ? '00' : newMinute;

    return `${hourString}:${minuteString}`;
  }

  changeStartDate(date: any) {
    this.startDate = date;
  }
  changeEndDate(date: any) {
    this.endDate = date;
  }

  convertToDate(date: Date, hour: string): Date {
    date.setHours(12, 0, 0, 0);
    let dateString = date.toISOString().split('T')[0];
    return new Date(`${dateString} ${hour}`);
  }
}
