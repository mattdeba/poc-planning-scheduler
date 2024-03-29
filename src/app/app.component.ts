import { ChangeDetectorRef, Component } from '@angular/core';
import {Combo, EventModel, EventStore, Scheduler, Store, StringHelper, TabBar} from '@bryntum/scheduler'
import { LocaleManager } from '@bryntum/scheduler';
import { resourcesRaw } from './resources';
import {eventsRaw} from './events';
import '@bryntum/scheduler/locales/scheduler.locale.FrFr.js';
import {BehaviorSubject, of} from 'rxjs';

LocaleManager.locale = 'FrFr';
const USERNAME = 'DES RIVES';

@Component({
  selector    : 'app-root',
  templateUrl : './app.component.html',
  styleUrls   : ['./app.component.scss']
})
export class AppComponent {
  constructor(private cdr: ChangeDetectorRef) { }
  startDate: BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date('2024/03/05'));
  selectedEvent: { startDate: string } | null | any = null;
  editMode = false;

  validation: BehaviorSubject<'Toutes'|'A valider'|'Validée'|'Refusée'> = new BehaviorSubject<'Toutes'|'A valider'|'Validée'|'Refusée'>('Toutes');
  postResa: BehaviorSubject<'Toutes'|'avec post résa'|'sans post résa'> = new BehaviorSubject<'Toutes'|'avec post résa'|'sans post résa'>('Toutes');

  utilisateur: any = 'Toutes';
  materielIds: number[] = [];

  resources = resourcesRaw;
  resourcesDisplay = resourcesRaw;
  events = eventsRaw;
  eventsDisplay = eventsRaw;

  isSchedulerReadOnly = false;

  scheduler: Scheduler | undefined;

  ngOnInit(): void {
    const colors = ['#C8AA82', '#B8CAEA', '#CDF8CE', '#C6E1C1', '#EBEFB3', '#CCD6D5', '#CCD6D5'];
    const resourceStore = new Store({
        data: this.resources,
      });
    const combo = new Combo({
      appendTo: 'comboFiltre',
      store: resourceStore,
      displayField: 'name',
      width: '100%',
      height: 50,
      placeholder: 'Sélectionner des matériels',
      multiSelect: true,
      valueField: 'id',
      onChange: ({value}) => {
        this.materielIds = value;
        this.refreshSchedulerResources();
      }
    })
    const navbar = new TabBar({
      appendTo : 'navBar',
      width: '100%',
      height: 50,
      items    : {
        logo: {
          text : 'Accueil',
          icon : 'b-fa b-fa-home'
        },
        cuma: {
          text : 'Cuma',
          icon : 'b-fa b-fa-building'
        },
        reservation: {
          text : 'Reservation',
          icon : 'b-fa b-fa-calendar'
        },
        validationReservation: {
          text : 'Validation Reservation',
          icon : 'b-fa b-fa-check-circle'
        },
        postReservation: {
          text : 'Post Reservation',
          icon : 'b-fa b-fa-pen'
        },
        bonTravail: {
          text : 'Bon Travail',
          icon : 'b-fa b-fa-ticket'
        },
        saisieTemps: {
          text : 'Saisie Temps',
          icon : 'b-fa b-fa-clock'
        },
        validationDesBons: {
          text : 'Validation des bons',
          icon : 'b-fa b-fa-check-square'
        },
        stats: {
          text : 'Stats',
          icon : 'b-fa b-fa-chart-bar'
        },
        karnott: {
          text : 'Karnott',
          icon : 'b-fa b-fa-carrot'
        },
        profile: {
          text : 'Profil',
          icon : 'b-fa b-fa-user',
        }
      }
    });
    this.scheduler = new Scheduler({
    rowHeight: 35,
    barMargin: 2,
    height: '100%',
    onBeforeDragCreate: () => !this.isSchedulerReadOnly,
    eventRenderer({eventRecord, resourceRecord, renderData}) {
      const resourceId = Number(resourceRecord.id);
      renderData.style = `border-radius: 5px; background-color: ${colors[resourceId%7]}; color: #606263;`;
      renderData.eventStyle = `font-size: 3px`;
      return eventRecord.name;
    },
    appendTo: 'scheduler',
    columns : [
      { text : 'Code', field : 'code', width : 90 },
      { text : 'Matériel', field : 'name', width : 307 },
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
    onEventDblClick: ({eventRecord}) => {
      console.log('selection change');
      this.editMode = false;
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
      };
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
  }
  cancelSelection() {
    this.selectedEvent = null;
    if (this.scheduler) {
      this.scheduler.deselectAll();
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

  handleUser = (bodyToggle: any) => {
    const { checked } = bodyToggle;
    if (checked && this.utilisateur != 'Mes réservations') {
      this.utilisateur = 'Mes réservations';
      this.refreshSchedulerEvents();
    }
    if (!checked && this.utilisateur != 'Toutes') {
      this.utilisateur = 'Toutes';
      this.refreshSchedulerEvents();
    }
  }

  handleValidation = (bodyToggle: any) => {
    const { checked } = bodyToggle;
    if (checked) {
      this.validation.next('A valider');
      this.postResa.next('Toutes');
    }
    if (!checked) {
      this.validation.next('Toutes');
    }
    this.refreshSchedulerEvents();
  }

  handlePostResa = (bodyToggle: any) => {
    const { checked } = bodyToggle;
    if (checked) {
      this.postResa.next('sans post résa');
      this.validation.next('Toutes');
    }
    if (!checked) {
      this.postResa.next('Toutes');
    }
    this.refreshSchedulerEvents();
  }

  handleRightButtonClick = () => {
    if( this.scheduler?.startDate && this.scheduler.endDate) {
      const currentStartDate = this.scheduler.startDate;
      const currentEndDate = this.scheduler.endDate;

      const newStartDate = new Date(currentStartDate.getTime());
      newStartDate.setDate(currentStartDate.getDate() + 7);
      this.startDate.next(newStartDate);
      const newEndDate = new Date(currentEndDate.getTime());
      newEndDate.setDate(currentEndDate.getDate() + 7);

      this.scheduler.setTimeSpan(newStartDate, newEndDate);
    }
  }

  handleLeftButtonClick = () => {
    if( this.scheduler?.startDate && this.scheduler.endDate) {
      const currentStartDate = this.scheduler.startDate;
      const currentEndDate = this.scheduler.endDate;

      const newStartDate = new Date(currentStartDate.getTime());
      newStartDate.setDate(currentStartDate.getDate() - 7);
      this.startDate.next(newStartDate);
      const newEndDate = new Date(currentEndDate.getTime());
      newEndDate.setDate(currentEndDate.getDate() - 7);

      this.scheduler.setTimeSpan(newStartDate, newEndDate);
    }
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

  sortEventsFirst() {
    if (this.scheduler?.startDate && this.scheduler.endDate) {

      const { startDate, endDate } = this.scheduler;
      this.scheduler?.resourceStore.sort((a: any, b: any) => {
        const aHasEventsThisWeek = this.eventsDisplay.some(event =>
          event.resourceId === a.id &&
          (new Date(event.startDate) >= startDate) &&
          (new Date(event.endDate) <= endDate)
        );
        const bHasEventsThisWeek = this.eventsDisplay.some(event =>
          event.resourceId === b.id &&
          (new Date(event.startDate) >= startDate) &&
          (new Date(event.endDate) <= endDate)
        );

        if (aHasEventsThisWeek && !bHasEventsThisWeek) {
          return -1;
        } else if (!aHasEventsThisWeek && bHasEventsThisWeek) {
          return 1;
        } else {
          return 0;
        }
      });

      this.scheduler?.resourceStore.clearSorters();
      this.scheduler?.scrollToTop();
    }
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
        status: 'toValid',
      });
    }
    this.refreshSchedulerEvents();
    this.editMode = false;
  }

  applyFilters = () => {
    const filtered = { events: this.events, resources: this.resources};
    if (this.utilisateur === 'Mes réservations') {
      filtered.events = filtered.events.filter(event => [USERNAME].includes(event.name))
    }
    if (this.materielIds.length > 0) {
      filtered.resources = filtered.resources.filter(resource => this.materielIds.includes(resource.id))
    }
    if (this.validation.value === 'A valider') {
      filtered.events = filtered.events.filter(event => event.status === 'toValid')
    }
    if (this.validation.value === 'Refusée') {
      filtered.events = filtered.events.filter(event => event.status === 'refused')
    }
    if (this.validation.value === 'Validée') {
      filtered.events = filtered.events.filter(event => event.status === 'validated')
    }
    if (this.postResa.value === 'avec post résa') {
      filtered.events = filtered.events.filter(event => event.status === 'validatedAndPost')
    }
    if (this.postResa.value === 'sans post résa') {
      filtered.events = filtered.events.filter(event => event.status === 'validated')
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
      eventInList.status = 'validated';
    }
    this.selectedEvent = null;
    this.refreshSchedulerEvents();
    this.editMode = false;
  }

  refuseEvent = () => {
    const eventInList = this.events.find(e => e.id === this.selectedEvent.id);
    if (eventInList) {
      eventInList.status = 'refused';
    }
    this.selectedEvent = null;
    this.refreshSchedulerEvents();
    this.editMode = false;
  }

  onDateSelected(event: any) {
    const selectedDate = new Date(event.value);
    const endDate = new Date(selectedDate);
    endDate.setDate(selectedDate.getDate() + 7);

    if(this.scheduler) {
      this.scheduler.startDate = selectedDate;
      this.scheduler.endDate = endDate;
    }
  }
}
