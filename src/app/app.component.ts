import { Component, ViewChild } from '@angular/core';
import { SchedulerComponent } from './scheduler.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(SchedulerComponent) schedulerComponent: SchedulerComponent;
  selectedReservation: any;
  showDetails = false;
  showEdit = false;
  showCreate = false;
  equipments: any;

  users = [
    {key:1, label:"Jean"},
    {key:2, label:"Luc"},
    {key:3, label:"Marc"},
    {key:4, label:"Lucie"}
  ];

  ngAfterViewInit() {
    this.equipments = this.schedulerComponent.rawResources.map(resource => ({
      key: resource.id,
      label: resource.value
    }));
  }

  handleDetailReservation(reservation: any) {
    const existingEvents = this.schedulerComponent.rawReservations.map((ev) => ev.id);
    if (existingEvents.includes(reservation.id)) {
      this.showDetails = true;
      this.selectedReservation = reservation;
    } else {
      this.showCreate = true;
    }
  }

  handleOkDetails() {
    this.selectedReservation = null;
    this.showDetails = false;
  }

  handleDeleteEvent(id: number) {
    this.schedulerComponent.deleteReservation(id);
    this.showDetails = false;
  }

  handleSwitchToEdit() {
    this.showDetails = false;
    this.showEdit = true;
  }

  handleCancelEdit() {
    this.showEdit = false;
  }

  handleSaveEvent(reservation: any) {
    this.showCreate = false;
    this.showEdit = false;
  }

  handleCreateEvent(reservation: any) {
    this.schedulerComponent.addReservation(reservation);
    this.showCreate = false;
    this.showEdit = false;
  }

  handleCancelCreate(event: any) {
    this.showCreate = false;
  }

  handleCreateReservation() {
    this.showCreate = true;
  }
}
