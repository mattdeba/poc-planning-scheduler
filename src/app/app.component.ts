import { Component } from '@angular/core';
import { DateHelper, Scheduler, StringHelper } from '@bryntum/scheduler'
import { LocaleManager, LocaleHelper } from '@bryntum/scheduler';
import { resources } from './resources';
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

  users = [
    { id: 1, name : 'Léo'},
    { id: 2, name : 'Luc'},
  ]

  resources = resources;
  isFiltered = false;

  events = events;

  scheduler: Scheduler | undefined;

  ngOnInit(): void {
    this.scheduler = new Scheduler({
      appendTo: 'scheduler',
      columns : [
        { text : 'Matériel', field : 'name', width : 160 },
        
      ],
      startDate : new Date(2024, 2, 4, 0),
      endDate   : new Date(2024, 2, 10, 0),
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
          {
            unit: 'hour',
            increment: 6,
            dateFormat: 'H:mm',
            align: 'start'
          },
        ]
      },
      allowOverlap: false,
      resources: this.resources,
      events: this.events,
      features: {
        eventDrag: {
          disabled: true,
        },
        eventResize: {
          disabled: true
        },
        eventEdit: {
          items: {
            nameField: {
              label: 'Utilisateur',
              type: 'textfield',
            },
            startDateField: { label: 'Date de début' },
            startTimeField: { label: 'Heure'},
            endDateField: { label: 'Date de fin' },
            endTimeField: { label: 'Heure' },
            resourceField: {
              type: 'combo',
            },
            articleField: {
              type: 'textfield',
              label: 'Article',
            },
            quantityField: {
              type: 'numberfield',
              label: 'Quantité',
            },
            unitField: {
              type: 'combo',
              label: 'Unité',
            },
            noteField: {
              type: 'textarea',
              label: 'Commentaire',
              name: 'note'
            },
          }
        }
      },
    });
  }
  filterResourcesWithEvents() {
    if (!this.isFiltered) {
      const resourceIdsWithEvents = new Set(this.events.map(event => event.resourceId));
      this.resources = this.resources.filter(resource => resourceIdsWithEvents.has(resource.id));
      this.isFiltered = true;
    } else {
      this.resources = [...resources];
      this.isFiltered = false;
    }
    this?.scheduler?.resourceStore.loadDataAsync(this.resources);
  }
  filterByResource() {
    if (this.selectedResource) {
      const filteredResources = this.resources.filter(resource => resource.id == this.selectedResource);
      this.scheduler?.resourceStore.loadDataAsync(filteredResources);
    } else {
      // Si aucune ressource n'est sélectionnée, affichez toutes les ressources
      this.scheduler?.resourceStore.loadDataAsync(this.resources);
    }
  }
}
