import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RgdmToggleBoxComponent } from '../rgdm-toggle-box/rgdm-toggle-box.component';
import { ToastNotificationService } from '../../services/toast-notification.service';

@Component({
  selector: 'app-member-panel',
  standalone: true,
  imports: [CommonModule, RgdmToggleBoxComponent],
  templateUrl: './member-panel.component.html',
  styleUrl: './member-panel.component.scss'
})
export class MemberPanelComponent {
  @Input() isRaiding: boolean = false

  constructor(private toastNotificationService: ToastNotificationService) { }

  editMember(): void {
    alert('editMember!');
  }

  editBio(): void {
    alert('editBio!');
  }

  editProfile(): void {
    this.toastNotificationService.success('Test Notification', 'Hello World this is a test toast!');
  }
}
