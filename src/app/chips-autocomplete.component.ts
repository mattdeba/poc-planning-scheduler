import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'chips-autocomplete',
  template: `
      <form>
          <mat-form-field class="example-chip-list" appearance="fill">
              <mat-label>Choix matériels</mat-label>
              <mat-chip-grid class="filterGrid" #chipGrid aria-label="Equipment selection">
                  <mat-chip-row *ngFor="let equipment of equipments" (removed)="remove(equipment)">
                      {{equipment.value}}
                      <button matChipRemove [attr.aria-label]="'remove ' + equipment">
                          <mat-icon><i class="fa fa-close"></i></mat-icon>
                      </button>
                  </mat-chip-row>
              </mat-chip-grid>
              <input placeholder="Matériels..." #equipmentInput [formControl]="equipmentCtrl"
                     [matChipInputFor]="chipGrid" [matAutocomplete]="auto"
                     [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
                     (matChipInputTokenEnd)="add($event)"/>
              <mat-autocomplete #auto="matAutocomplete" (optionSelected)="selected($event)" >
                  <mat-option *ngFor="let equipment of filteredEquipments | async" [value]="equipment">
                      {{equipment.value}}
                  </mat-option>                      
              </mat-autocomplete>
          </mat-form-field>
      </form>
  `,
  styles: [`
      .example-chip-list {
          width: 500px;
          margin-right: 20px;
      }
  `],
})
export class ChipsAutocompleteComponent {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  equipmentCtrl = new FormControl('');
  filteredEquipments: Observable<any[]>;
  equipments: any[] = [];
  @Input() allEquipments: any[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  @Output() equipmentSelectionChange = new EventEmitter<any[]>();

  @ViewChild('equipmentInput') equipmentInput: ElementRef<HTMLInputElement>;

  constructor() {
    this.filteredEquipments = this.equipmentCtrl.valueChanges.pipe(
      startWith(null),
      map((equipment: string | null) => (equipment ? this._filter(equipment) : this.allEquipments.slice())),
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our equipment
    if (value) {
      const equipment = this.allEquipments.find(equip => equip.value === value);
      if (equipment && !this.equipments.includes(equipment)) {
        this.equipments.push(equipment);
        this.equipmentSelectionChange.emit(this.equipments);
      }
    }

    // Clear the input value
    event.chipInput!.clear();

    this.equipmentCtrl.setValue(null);
  }

  remove(equipment: any): void {
    const index = this.equipments.indexOf(equipment);

    if (index >= 0) {
      this.equipments.splice(index, 1);
      this.equipmentSelectionChange.emit(this.equipments);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const equipment = event.option.value;
    if (equipment && !this.equipments.includes(equipment)) {
      this.equipments.push(equipment);
      this.equipmentSelectionChange.emit(this.equipments);
    }
    this.equipmentInput.nativeElement.value = '';
    this.equipmentCtrl.setValue(null);
  }

  private _filter(value: any): any[] {
    const filterValue = typeof value === 'string' ? value.toLowerCase() : value.value.toLowerCase();

    return this.allEquipments.filter(equipment => equipment.value.toLowerCase().includes(filterValue));
  }
}
