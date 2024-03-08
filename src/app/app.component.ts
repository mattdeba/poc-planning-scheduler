import { Component, ViewChild } from '@angular/core';
import { BryntumSchedulerComponent } from '@bryntum/scheduler-angular';
import { schedulerConfig } from './app.config';
import { EventModel, Scheduler, ViewPreset, PresetManager, ResourceModel } from '@bryntum/scheduler'
import { LocaleManager, LocaleHelper } from '@bryntum/scheduler';
import { frenchLocale } from './frenchLocale';
import { resources } from './resources';
import { events } from './events';

LocaleHelper.publishLocale(frenchLocale);
LocaleManager.locale = 'Fr';
@Component({
  selector    : 'app-root',
  templateUrl : './app.component.html',
  styleUrls   : ['./app.component.scss']
})
export class AppComponent {

  users = [
    { id: 1, name : 'Léo'},
    { id: 2, name : 'Luc'},
  ]

  // resources = [
  //   { id : 1, name : 'Tracteur John Deere' },
  //   { id : 2, name : 'Tracteur New Holland' },
  //   { id : 3, name : 'Tonne à lisier Pichon' }
  // ];
  resources = resources;
  isFiltered = false;
  // events = [
  //   { resourceId : 1, startDate : '2024-03-02T08:00:00.000Z', endDate : '2024-03-02T18:00:00.000Z', eventColor: '#BCB0FF', note: "", name: 'Luc - JD6R150' },
  //   { resourceId : 2, startDate : '2024-03-02T08:00:00.000Z', endDate : '2024-03-02T18:00:00.000Z', eventColor: '#76F1B6', note: "", name: 'Léo NHT7' },
  // ];

  events = events;

  scheduler: Scheduler | undefined;

  ngOnInit(): void {
    this.scheduler = new Scheduler({
      appendTo: 'scheduler',
      columns : [
        { text : 'Matériel', field : 'name', width : 160 }
      ],
      startDate : new Date(2024, 2, 2, 0),
      endDate   : new Date(2024, 2, 8, 0),
      viewPreset: 'dayAndMonth',
      resources: this.resources,
      events: this.events,
      features: {
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
              // Spécifiez la configuration selon les besoins
            },
            unitField: {
              type: 'combo',
              label: 'Unité',
              // Spécifiez la configuration selon les besoins
            },
            noteField: {
              type: 'textarea',
              label: 'Commentaire',
              name: 'note'
            },
          }
        }
      },
      // Configurez d'autres options du scheduler selon les besoins, comme les colonnes et la source de données
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
}
