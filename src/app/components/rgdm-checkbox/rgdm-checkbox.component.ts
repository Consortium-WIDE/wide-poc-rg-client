import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-rgdm-checkbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rgdm-checkbox.component.html',
  styleUrl: './rgdm-checkbox.component.scss'
})
export class RgdmCheckboxComponent {
  @Input() checked: boolean = false;
  @Output() checkedChange = new EventEmitter<boolean>();
  @Input() label: string = '';
  @Input() labelPosition: 'left' | 'right' = 'right'; // New input for label position

  toggleCheckbox() {
    this.checked = !this.checked;
    this.checkedChange.emit(this.checked);
  }
}
