import { Component } from '@angular/core';
import { Combo, EventModel, EventStore, Scheduler, Store, StringHelper } from '@bryntum/scheduler'
import { LocaleManager } from '@bryntum/scheduler';
import { resourcesRaw } from './resources';
import {eventsRaw} from './events';
import '@bryntum/scheduler/locales/scheduler.locale.FrFr.js';

LocaleManager.locale = 'FrFr';
const USERNAME = 'DES RIVES';

@Component({
  selector    : 'app-root',
  templateUrl : './app.component.html',
  styleUrls   : ['./app.component.scss']
})
export class AppComponent {
  selectedEvent: { startDate: string } | null | any = null;
  editMode = false;
  filters: { usernames: string[], materielIds: number[], toValidateOnly: boolean } = {
    usernames: ['DES RIVES'],
    materielIds: [],
    toValidateOnly: false,
  }

  resources = resourcesRaw;
  resourcesDisplay = resourcesRaw;
  events = eventsRaw;
  eventsDisplay = eventsRaw;

  isSchedulerReadOnly = false;

  scheduler: Scheduler | undefined;

  ngOnInit(): void {
      const resourceStore = new Store({
        data: this.resources,
      });
      const combo = new Combo({
        appendTo: 'comboFiltre',
        store: resourceStore,
        displayField: 'name',
        width: 400,
        multiSelect: true,
        valueField: 'id',
        onChange: ({value}) => {
          this.filters.materielIds = value;
          this.refreshSchedulerResources();
        }
      })
      this.scheduler = new Scheduler({
      rowHeight: 60,
      onBeforeDragCreate: () => !this.isSchedulerReadOnly,
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
        eventMenu: {
          disabled: true,
        }
      },
      onEventSelectionChange: ({ action, selected, deselected, selection }) => {
        this.editMode = false;
        if (selected.length > 0) {
          const eventRecord = selected[0];
          const resourceRecord = this.resources.filter(resource => resource.id == eventRecord.resourceId)[0]
          this.selectedEvent = {
            id: eventRecord.id,
            materiel: resourceRecord.name,
            startDate: eventRecord.startDate,
            endDate: eventRecord.endDate,
            dateReservation: new Date(),
            name: eventRecord.name,
            resource: resourceRecord,
            quantite: eventRecord.getData('quantite'),
            unite: eventRecord.getData('unite'),
            commentaire: eventRecord.getData('commentaire'),
            article: eventRecord.getData('article'),
          }
        } else if (deselected.length > 0) {
          this.selectedEvent = null;
        }
      },
      onEventAutoCreated: ({eventRecord, resourceRecord}) => {
        const resource = this.resources.filter(resource => resource.id == resourceRecord.id)[0]
        eventRecord.name = USERNAME;
        this.scheduler?.selectEvent(eventRecord);
        this.editMode = true;
        this.selectedEvent = {
            id: eventRecord.id,
            materiel: resource.name,
            startDate: eventRecord.startDate,
            endDate: eventRecord.endDate,
            dateReservation: new Date(),
            resource: resourceRecord,
            name: USERNAME,
          }
        },
      });
      this.refreshSchedulerEventsAndResources();
      this.sortEventsFirst();
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

  onQuantiteChange($event: any) {
    this.selectedEvent.quantite = $event.value;
  }

  onCommentaireChange($event: any) {
    this.selectedEvent.commentaire = $event.value;
  }
  onArticleChange($event: any) {
    this.selectedEvent.article = $event.value;
  }
  onUniteChange($event: any) {
    this.selectedEvent.unite = $event.value;
  }

  toggleUsernames() {
    if (this.filters.usernames.length === 0) {
      this.filters.usernames = ['DES RIVES'];
    } else {
      this.filters.usernames = [];
    }
  }

  toggleToValidateOnly() {
    this.filters.toValidateOnly = !this.filters.toValidateOnly;
    this.isSchedulerReadOnly = this.filters.toValidateOnly;
  }

  sortEventsFirst() {
    this.scheduler?.resourceStore.sort((a: any, b: any) => {
      const aHasEvents = this.eventsDisplay.some(event => event.resourceId === a.id);
      const bHasEvents = this.eventsDisplay.some(event => event.resourceId === b.id);
      if (aHasEvents && !bHasEvents) {
        return -1;
      } else if (!aHasEvents && bHasEvents) {
        return 1;
      } else {
        return 0;
      }
    });
    this.scheduler?.resourceStore.clearSorters();
    this.scheduler?.scrollToTop();
  }

  updateEvent() {
    const eventInList = this.events.find(e => e.id === this.selectedEvent.id);
    if (eventInList) {
      eventInList.startDate = this.selectedEvent.startDate;
      eventInList.endDate = this.selectedEvent.endDate;
      eventInList.resourceId = this.selectedEvent.resource.id;
      eventInList.name = this.selectedEvent.name;
      eventInList.quantite = this.selectedEvent.quantite;
      eventInList.unite = this.selectedEvent.unite;
      eventInList.commentaire = this.selectedEvent.commentaire;
      eventInList.article = this.selectedEvent.article;
    } else {
      this.events.push({
        id: this.selectedEvent.id,
        startDate: this.selectedEvent.startDate,
        endDate: this.selectedEvent.endDate,
        resourceId: this.selectedEvent.resource.id,
        name: USERNAME,
        reservationDate: new Date().toISOString(),
        quantite: this.selectedEvent.quantite,
        unite: this.selectedEvent.unite,
        commentaire: this.selectedEvent.commentaire,
        article: this.selectedEvent.article,
        validationChecked: false,
        validated: false,
      });
    }
    this.refreshSchedulerEvents();
    this.editMode = false;
  }

  applyFilters = () => {
    const filtered = { events: this.events, resources: this.resources};
    if (this.filters.usernames.length > 0) {
      filtered.events = filtered.events.filter(event => this.filters.usernames.includes(event.name))
    }
    if (this.filters.materielIds.length > 0) {
      filtered.resources = filtered.resources.filter(resource => this.filters.materielIds.includes(resource.id))
    }
    if (this.filters.toValidateOnly) {
      filtered.events = filtered.events.filter(event => !event.validationChecked)
    }
    this.eventsDisplay = filtered.events;
    this.resourcesDisplay = filtered.resources;
  }

  refreshSchedulerEvents = () => {
    const scrollX = this.scheduler?.scrollable.x;
    const scrollY = this.scheduler?.scrollable.y;
    const event = this.scheduler?.eventStore.getById(this.selectedEvent?.id) as EventModel;

    this.applyFilters();
    this.scheduler?.eventStore.loadDataAsync(this.eventsDisplay);
    if (event) this.scheduler?.selectEvent(event);
    this.scheduler?.scrollable.scrollTo(this.scheduler?.scrollable.y, scrollY);
  }
  refreshSchedulerResources = () => {
    const scrollX = this.scheduler?.scrollable.x;
    const scrollY = this.scheduler?.scrollable.y;
    const event = this.scheduler?.eventStore.getById(this.selectedEvent?.id) as EventModel;

    this.applyFilters();
    this.scheduler?.resourceStore.loadDataAsync(this.resourcesDisplay);
    if (event) this.scheduler?.selectEvent(event);
    this.scheduler?.scrollable.scrollTo(this.scheduler?.scrollable.y, scrollY);
  }
  refreshSchedulerEventsAndResources = () => {
    const scrollX = this.scheduler?.scrollable.x;
    const scrollY = this.scheduler?.scrollable.y;
    const event = this.scheduler?.eventStore.getById(this.selectedEvent?.id) as EventModel;

    this.applyFilters();
    this.scheduler?.eventStore.loadDataAsync(this.eventsDisplay);
    this.scheduler?.resourceStore.loadDataAsync(this.resourcesDisplay);
    if (event) this.scheduler?.selectEvent(event);
    this.scheduler?.scrollable.scrollTo(this.scheduler?.scrollable.y, scrollY);
  }

  validateEvent = () => {
    const eventInList = this.events.find(e => e.id === this.selectedEvent.id);
    if (eventInList) {
      eventInList.validationChecked = true;
      eventInList.validated = true;
    }
    this.selectedEvent = null;
    this.refreshSchedulerEvents();
    this.editMode = false;
  }

  refuseEvent = () => {
    const eventInList = this.events.find(e => e.id === this.selectedEvent.id);
    if (eventInList) {
      eventInList.validationChecked = true;
      eventInList.validated = false;
    }
    this.selectedEvent = null;
    this.refreshSchedulerEvents();
    this.editMode = false;
  }
}
