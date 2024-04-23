import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SchedulerComponent } from './scheduler.component';
import {ReservationDetailComponent} from "./reservation-detail.component";
import {ReservationEditHtmlComponent} from "./reservation-edit-html.component";
import {FormsModule} from "@angular/forms";
import {DropdownFilterComponent} from "./dropdown-filter.component";
import { ToggleComponent } from './toggle-button.component';
import {NavbarComponent} from "./navbar.component";
import { MaterialFeatures } from './material.module';
import { DatePickerComponent } from './date-picker.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChipsAutocompleteComponent } from './chips-autocomplete.component';
import { AppComponent } from './app.component';
import { ReservationDetailsComponent } from './reservation-details.component';
import { ReservationEditComponent } from './reservation-edit.component';
import { ReservationCreateComponent } from './reservation-create.component';

@NgModule({
  declarations: [
    AppComponent,
    SchedulerComponent,
    ReservationDetailComponent,
    ReservationEditHtmlComponent,
    DropdownFilterComponent,
    ToggleComponent,
    NavbarComponent,
    DatePickerComponent,
    ChipsAutocompleteComponent,
    ReservationDetailsComponent,
    ReservationEditComponent,
    ReservationCreateComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterialFeatures,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
