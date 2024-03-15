import { Component, ElementRef, ViewChild } from '@angular/core';
import { DateHelper, Scheduler, StringHelper } from '@bryntum/scheduler'
import { LocaleManager, LocaleHelper } from '@bryntum/scheduler';
import { resourcesRaw } from './resources';
import { events } from './events';
import '@bryntum/scheduler/locales/scheduler.locale.FrFr.js';

LocaleManager.locale = 'FrFr';
@Component({
  selector    : 'app-root',
  templateUrl : './app.component.html',
  styleUrls   : ['./app.component.scss']
})
export class AppComponent {
  selectedResource: number | null = null;
  selectedEvent: { startDate: string } | null | any = null;
  editMode = false;
  toggleStates = {
    nameFilter: true,
    resourceFilter: true
  };

  allResources = resourcesRaw;
  resources = resourcesRaw;
  isFiltered = false;

  events = events;

  scheduler: Scheduler | undefined;

  ngOnInit(): void {
    this.scheduler = new Scheduler({
      rowHeight: 60,
      eventRenderer({eventRecord, resourceRecord, renderData}) {
        renderData.style = 'border-radius: 5px;';
        return eventRecord.name;
      },
      appendTo: 'scheduler',
      columns : [
        { text : 'Code', field : 'code', width : 150 },
        { text : 'Matériel', field : 'name', width : 300 },
      ],
      startDate : new Date(2024, 2, 4, 0),
      endDate   : new Date(2024, 2, 11, 0),
      viewPreset: {
        displayDateFormat: 'H:mm',
        shiftIncrement: 1,
        shiftUnit: 'WEEK',
        timeResolution: {
          unit: 'minute',
          increment: 30
        },
        headers: [
          {
            unit: 'day',
            increment: 1,
            dateFormat: 'ddd D/M',
            align: 'center'
          },
        ]
      },
      allowOverlap: false,
      resources: this.resources,
      events: this.events,
      features: {
        eventEdit: {
          disabled: true,
        },
        eventDrag: {
          disabled: true,
        },
        eventResize: {
          disabled: true
        },
      },
      onEventSelectionChange: ({ action, selected, deselected, selection }) => {
        this.editMode = false;
        if (selected.length > 0) {
          const eventRecord = selected[0];
          const resourceRecord = this.allResources.filter(resource => resource.id == eventRecord.resourceId)[0]
          this.selectedEvent = {
            id: eventRecord.id,
            name: resourceRecord.name,
            startDate: eventRecord.startDate,
            endDate: eventRecord.endDate,
            dateReservation: new Date(),
            username: eventRecord.name.split(' - ')[1],
            resource: resourceRecord
          }
        } else if (deselected.length > 0) {
          this.selectedEvent = null;
        }
      },
      onEventAutoCreated: ({eventRecord, resourceRecord}) => {
        const resource = this.allResources.filter(resource => resource.id == resourceRecord.id)[0]
        eventRecord.name = 'DES RIVES';
        this.scheduler?.selectEvent(eventRecord);
        this.editMode = true;
        this.selectedEvent = {
          id: eventRecord.id,
          name: resource.name,
          startDate: eventRecord.startDate,
          endDate: eventRecord.endDate,
          dateReservation: new Date(),
          resource: resourceRecord,
        }
      }
    });
    this.toggleFilters(this.toggleStates);
  }
  toggleFilters(toggleStates: { nameFilter: boolean, resourceFilter: boolean }) {
    let filteredResources;
    let filteredEvents = [...events]; // Commencez avec tous les événements

    if (toggleStates.nameFilter) {
      // Appliquer le filtre par nom si le bouton correspondant est activé
      filteredEvents = filteredEvents.filter(event => event.name === 'DES RIVES');
    }

    if (toggleStates.resourceFilter) {
      // Appliquer le filtre par ressource si le bouton correspondant est activé
      const resourceIds = new Set(filteredEvents.map(event => event.resourceId));
      filteredResources = this.resources.filter(resource => resourceIds.has(resource.id));
    } else {
      filteredResources = this.resources;
    }

    this.events = filteredEvents;
    this.scheduler?.eventStore.loadDataAsync(this.events);
    this.scheduler?.resourceStore.loadDataAsync(filteredResources);
  }
  filterByResource() {
    if (this.selectedResource) {
      const filteredResources = this.resources.filter(resource => resource.id == this.selectedResource);
      this.scheduler?.resourceStore.loadDataAsync(filteredResources);
    } else {
      this.scheduler?.resourceStore.loadDataAsync(this.resources);
    }
  }

  deleteEvent(event:any) {
    const eventIndex = this.events.findIndex(e => e.id === event.id);

    if (eventIndex !== -1) {
      this.events.splice(eventIndex, 1);
    }

    const schedulerEvent = this.scheduler?.eventStore.getById(event.id);
    if (schedulerEvent) {
      this.scheduler?.eventStore.remove(schedulerEvent);
    }

    this.selectedEvent = null;
  }

  editEvent(event:any) {
    this.editMode = true;
  }

  onDateChange(event: any) {
    const { source, value, oldValue, valid, userAction } = event;

    if (source.id === 'startDate') {
        this.selectedEvent.startDate = new Date(value);
    } else if (source.id === 'endDate') {
        this.selectedEvent.endDate = new Date(value);
    }
  }
  onResourceChange(event: any) {
    const selectedResourceId = event.value;
    this.selectedEvent.resource = this.resources.find(resource => resource.id === selectedResourceId);
  }

  updateEvent() {
    const event = this.scheduler?.eventStore.getById(this.selectedEvent.id);
    if (event) {
      event.set('startDate', this.selectedEvent.startDate);
      event.set('endDate', this.selectedEvent.endDate);
      event.set('resourceId', this.selectedEvent.resource.id);
    }
    this.editMode = false;
  }
}
