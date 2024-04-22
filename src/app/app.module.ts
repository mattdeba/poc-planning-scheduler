import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {ReservationDetailComponent} from "./reservation-detail.component";
import {ReservationEditComponent} from "./reservation-edit.component";
import {FormsModule} from "@angular/forms";
import {DropdownFilterComponent} from "./dropdown-filter.component";
import { ToggleComponent } from './toggle-button.component';
import {NavbarComponent} from "./navbar.component";
import { MaterialFeatures } from './material.module';
import { DatePickerComponent } from './date-picker.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ReservationDetailComponent,
    ReservationEditComponent,
    DropdownFilterComponent,
    ToggleComponent,
    NavbarComponent,
    DatePickerComponent
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
