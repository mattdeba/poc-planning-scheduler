import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, NativeDateAdapter } from '@angular/material/core';
import * as moment from 'moment';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-date-picker',
  template: `
      <mat-form-field class="datePicker" appearance="fill" [style.width]="inputWidth">
          <mat-label>{{ label }}</mat-label>
          <input matInput [matDatepicker]="picker" [(ngModel)]="selectedDate" (dateChange)="onDateChange($event)"/>
          <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
      </mat-form-field>
  `,
  styles: [`
    .datePicker {
      margin-right: 10px;
      height: 80px;
    }
  `],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
    { provide: DateAdapter, useClass: NativeDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ],
})
export class DatePickerComponent {
  @Input() label = "Choisir Date";
  @Input() set selectedDate(value: string) {
    this._selectedDate = moment(value, 'YYYY-MM-DD').toDate();
  }
  get selectedDate(): string {
    return moment(this._selectedDate).format('YYYY-MM-DD');
  }
  @Input() inputWidth: string;
  @Output() selectedDateChange = new EventEmitter<string>();

  private _selectedDate: Date;

  onDateChange(event: any) {
    this.selectedDateChange.emit(moment(this._selectedDate).format('YYYY-MM-DD'));
  }

  constructor(private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('fr')
  }
}
