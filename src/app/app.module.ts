import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {ReservationDetailComponent} from "./reservation-detail.component";
import {ReservationEditComponent} from "./reservation-edit.component";
import {FormsModule} from "@angular/forms";
import {DropdownFilterComponent} from "./dropdown-filter.component";
import { ToggleComponent } from './toggle-button.component';
import {NavbarComponent} from "./navbar.component";
import {SchedulerComponent} from "./scheduler-component";

@NgModule({
  declarations: [
    AppComponent,
    ReservationDetailComponent,
    ReservationEditComponent,
    DropdownFilterComponent,
    ToggleComponent,
    NavbarComponent,
    SchedulerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
