import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-rgdm-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rgdm-input.component.html',
  styleUrl: './rgdm-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RgdmInputComponent),
      multi: true,
    },
  ],
})
export class RgdmInputComponent implements ControlValueAccessor {
  @Input({ required: true }) id!: string;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) name!: string;
  @Input() iconUrl?: string;
  @Input() multiline: boolean = false;
  @Input() inline: boolean = false;
  @Input() errorMessage: string = '';
  @Input() style: string = 'default';
  @Input() disabled: boolean = false;

  value: string = '';
  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // If you have an input method for binding `input` event in HTML
  onInput(evt: any): void {
    this.value = evt.target.value;
    this.onChange(this.value);
    this.onTouched();
  }

  getStyle(): string {
    let styles: string[] = [];

    if (this.inline) {
      styles.push('inline');
    }

    if (this.errorMessage.length > 0){
      styles.push('label-error');
    }
    
    styles.push(`label-${this.style}`);

    return styles.join(' ');
  }
}
