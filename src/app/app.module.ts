import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BryntumSchedulerModule } from '@bryntum/scheduler-angular'
import { BryntumSchedulerComponent } from '@bryntum/scheduler-angular';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, BryntumSchedulerModule
  ],
  providers: [BryntumSchedulerComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
