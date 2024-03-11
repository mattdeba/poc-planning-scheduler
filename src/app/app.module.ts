import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BryntumSchedulerModule } from '@bryntum/scheduler-angular'
import { BryntumSchedulerComponent } from '@bryntum/scheduler-angular';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, BryntumSchedulerModule, FormsModule
  ],
  providers: [BryntumSchedulerComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
