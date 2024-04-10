import {Component, Input, Output, EventEmitter, ElementRef, HostListener} from '@angular/core';
@Component({
  selector: 'app-dropdown',
  template: `
    <div class="dropdown">
      <button class="dropbtn" (click)="toggleDropdown()">Filtre Matériel</button>
      <button class="resetbtn" (click)="resetFilter()">Reset</button>
      <div class="dropdown-content" *ngIf="isDropdownOpen">
        <div *ngFor="let option of options" [class.selected]="selectedOptions.includes(option.id)" (click)="updateSelectedOptions(option.id)">
          {{option.value}}
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dropbtn, .resetbtn {
      cursor: pointer;
      border: 1px solid  #D8D9DA;
      color: #606263;
      font-size: 1em;
      
      &:hover{
        background: #F3F4F5;
      }
    }
    .dropbtn{
      width: 110px;
      height: 50px;
    }
    .resetbtn {
      width: 60px;
      height: 50px;
    }

    .dropdown-content {
      position: absolute;
      width: 170px;
      max-height: 100px;
      z-index: 1;
    }

    .dropdown-content div {
      cursor: pointer;
      display: block;
      position: relative;
      z-index: 1;
    }

    .dropdown-content .selected {
      background-color: #9d9898;
    }
  `]
})
export class DropdownFilterComponent {
  @Input() options: { id: number; value: string; }[] = [];
  @Output() selectionChange: EventEmitter<number[]> = new EventEmitter();

  selectedOptions: number[] = [];
  isDropdownOpen = false;

  constructor(private eRef: ElementRef) { }

  updateSelectedOptions(optionId: number): void {
    const index = this.selectedOptions.indexOf(optionId);
    if (index > -1) {
      this.selectedOptions.splice(index, 1);
    } else {
      this.selectedOptions.push(optionId);
    }
    this.selectionChange.emit(this.selectedOptions);
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  resetFilter(): void {
    this.selectedOptions = [];
    this.isDropdownOpen = false;
    this.selectionChange.emit(this.selectedOptions);
  }

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
    }
  }
}
