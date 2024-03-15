import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'app-rgdm-toggle-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rgdm-toggle-box.component.html',
  styleUrl: './rgdm-toggle-box.component.scss'
})
export class RgdmToggleBoxComponent {
  @Input() checked: boolean = false;
  @Output() checkedChange = new EventEmitter<boolean>();
  @Input() label: string = '';
  @Input() labelPosition: 'left' | 'right' = 'right'; // New input for label position

  toggleCheckbox() {
    this.checked = !this.checked;
    this.checkedChange.emit(this.checked);
  }
}
