import { Component, ViewChild } from '@angular/core';
import { SchedulerComponent } from './scheduler.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(SchedulerComponent) schedulerComponent: SchedulerComponent;

}
