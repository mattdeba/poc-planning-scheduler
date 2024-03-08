import { Component, ViewChild } from '@angular/core';
import { BryntumSchedulerComponent } from '@bryntum/scheduler-angular';
import { schedulerConfig } from './app.config';
import { EventModel, Scheduler, ViewPreset, PresetManager } from '@bryntum/scheduler'
import { LocaleManager, LocaleHelper } from '@bryntum/scheduler';
import { frenchLocale } from './frenchLocale';

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

  resources = [
    { id : 1, name : 'Tracteur John Deere' },
    { id : 2, name : 'Tracteur New Holland' },
    { id : 3, name : 'Tonne à lisier Pichon' }
  ];

  events = [
    { resourceId : 1, startDate : '2024-03-20T08:00:00.000Z', endDate : '2024-03-20T18:00:00.000Z', eventColor: '#BCB0FF', note: "", name: 'Luc - JD6R150', iconCls: 'b-fa b-fa-tractor' },
    { resourceId : 2, startDate : '2024-03-20T08:00:00.000Z', endDate : '2024-03-20T18:00:00.000Z', eventColor: '#76F1B6', note: "", name: 'Léo NHT7', iconCls: 'b-fa b-fa-tractor' },
  ];

  ngOnInit(): void {
    const scheduler = new Scheduler({
      appendTo: 'scheduler',
      columns : [
        { text : 'Matériel', field : 'name', width : 160 }
      ],
      startDate : new Date(2024, 2, 20, 6),
      endDate   : new Date(2024, 2, 27, 20),
      viewPreset: 'dayAndMonth',
      resources: this.resources,
      events: this.events,
      features: {
        eventEdit: {
          items: {
            nameField: {
              label: 'Utilisateur',
              type: 'combo',
            },
            startDateField: { label: 'Date de début' },
            startTimeField: { label: 'Heure'},
            endDateField: { label: 'Date de fin' },
            endTimeField: { label: 'Heure' },
            resourceField: {
              type: 'combo',
              label: 'Matériels',
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
}
