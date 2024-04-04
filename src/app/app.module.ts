import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {ReservationDetailComponent} from "./reservation-detail.component";
import {ReservationEditComponent} from "./reservation-edit.component";
import {FormsModule} from "@angular/forms";
import {DropdownFilterComponent} from "./dropdown-filter.component";

@NgModule({
  declarations: [
    AppComponent,
    ReservationDetailComponent,
    ReservationEditComponent,
    DropdownFilterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
