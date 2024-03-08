import { Component, ViewChild } from '@angular/core';
import { BryntumSchedulerComponent } from '@bryntum/scheduler-angular';
import { schedulerConfig } from './app.config';
import { EventModel, Scheduler, ViewPreset, PresetManager } from '@bryntum/scheduler'

@Component({
  selector    : 'app-root',
  templateUrl : './app.component.html',
  styleUrls   : ['./app.component.scss']
})
export class AppComponent {
  resources = [
    { id : 1, name : 'Tracteur John Deere' },
    { id : 2, name : 'Tracteur New Holland' },
    { id : 3, name : 'Tonne à lisier Pichon' }
  ];

  events = [
    { resourceId : 1, startDate : '2024-03-20T08:00:00.000Z', endDate : '2024-03-20T18:00:00.000Z', eventColor: '#BCB0FF', note: "", name: 'JD6R150 Luc', iconCls: 'b-fa b-fa-tractor' },
    { resourceId : 2, startDate : '2024-03-20T08:00:00.000Z', endDate : '2024-03-20T18:00:00.000Z', eventColor: '#76F1B6', note: "", name: 'NHT7 Léo', iconCls: 'b-fa b-fa-tractor' },
  ];

  aaccessGranted = true;
  schedulerConfig = schedulerConfig;

  @ViewChild('scheduler') schedulerComponent!: BryntumSchedulerComponent;

  moveForward1Hour(options: {eventRecord?: EventModel}): void {
    const {eventRecord} = options;
    if (eventRecord) eventRecord.shift('h', 1)
  }

  handleEventMenuBeforeShow({items}: any): void {
    if (!this.aaccessGranted) {
      items.editEvent = false;
      items.deleteEvent = false;
    }
  }
}
