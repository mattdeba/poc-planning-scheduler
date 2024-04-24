import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toggle',
  template: `
    <div class="toggle-container">
      <div class="switch-container">
          <label class="switch">
              <input type="checkbox" [checked]="isChecked" (click)="toggleChange()">
              <span class="slider round"></span>
          </label>      
      </div>
      <div class="toggle-name" (click)="toggleChange()">{{ toggleName }}</div>
    </div>
  `,
  styles: [`
    .toggle-container {
      display: grid;
      grid-template-columns: 30% 70%;
      grid-template-rows: 100%;
      height: 100%;
    }
    
    .switch-container {
      grid-row: 1/2;
      grid-column: 1/2;
      &:hover {
        cursor: pointer;
      }
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .toggle-name {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      grid-row: 1/2;
      grid-column: 2/3;
      font-size: 0.8em;
      &:hover {
        cursor: pointer;
      }
      color: #606263;
    }
    
    .switch {
      position: relative;
      display: inline-block;
      width: 30px;
      height: 17px;
    }

    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      -webkit-transition: .1s;
      transition: .1s;
    }

    .slider:before {
      position: absolute;
      content: "";
      height: 13px;
      width: 13px;
      left: 2px;
      bottom: 2px;
      background-color: white;
      -webkit-transition: .2s;
      transition: .2s;
    }

    input:checked + .slider {
      background-color: #000000;
    }

    input:focus + .slider {
      box-shadow: 0 0 1px #000000;
    }

    input:checked + .slider:before {
      -webkit-transform: translateX(13px);
      -ms-transform: translateX(13px);
      transform: translateX(13px);
    }

    /* Rounded sliders */
    .slider.round {
      border-radius: 17px;
    }

    .slider.round:before {
      border-radius: 50%;
    }
  `]
})
export class ToggleComponent {
  @Input() isChecked: boolean;
  @Input() toggleName: string;
  @Output() onChange = new EventEmitter<boolean>();

  toggleChange() {
    this.isChecked = !this.isChecked;
    this.onChange.emit(this.isChecked);
  }
}
