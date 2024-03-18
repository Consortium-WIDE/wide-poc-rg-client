import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-multi-select-tags',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './multi-select-tags.component.html',
  styleUrl: './multi-select-tags.component.scss'
})
export class MultiSelectTagsComponent {
  @Input() allTags: string[] = [];
  @Output() selectedTagsChange = new EventEmitter<string[]>();

  selectedTags: string[] = [];
  filteredTags: string[] = [];
  currentInput: string = '';

  onInput(target: any): void {
    this.currentInput = target.value;
    this.filteredTags = this.allTags
      .filter(tag => 
        tag.toLowerCase().includes(this.currentInput.toLowerCase()) &&
        !this.selectedTags.includes(tag) // Exclude already selected tags
      )
  }

  showAll(): void {
    if (this.filteredTags.length > 0) {
      this.filteredTags = [];
    } else {
      this.filteredTags = this.allTags.filter(tag => !this.selectedTags.includes(tag));
    }
  }

  onSelectTag(tag: string): void {
    if (!this.selectedTags.includes(tag)) {
      this.selectedTags.push(tag);
      this.selectedTagsChange.emit(this.selectedTags);
      this.currentInput = '';
      this.filteredTags = [];
    }
  }

  onRemoveTag(tag: string): void {
    this.selectedTags = this.selectedTags.filter(t => t !== tag);
    this.selectedTagsChange.emit(this.selectedTags);
  }
}