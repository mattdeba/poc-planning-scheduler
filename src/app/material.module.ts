import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatListModule} from "@angular/material/list";
import { MatChip, MatChipsModule } from '@angular/material/chips';
import { MatHint } from '@angular/material/form-field';
import { MatBadgeModule } from '@angular/material/badge';

const features: any[] = [
  MatTableModule,
  MatButtonModule,
  MatInputModule,
  MatDialogModule,
  MatSelectModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatIconModule,
  MatGridListModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCardModule,
  ReactiveFormsModule,
  MatAutocompleteModule,
  MatListModule,
  MatChipsModule,
  MatBadgeModule,
  MatOptionModule
];
@NgModule({
  imports: [CommonModule, ...features],
  exports: [...features],
})
export class MaterialFeatures {}
