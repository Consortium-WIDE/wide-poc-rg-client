import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RgdmToggleBoxComponent } from '../rgdm-toggle-box/rgdm-toggle-box.component';
import { ToastNotificationService } from '../../services/toast-notification.service';
import { Router } from '@angular/router';
import { RaidguildDataService } from '../../services/raidguild-data.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-member-panel',
  standalone: true,
  imports: [CommonModule, RgdmToggleBoxComponent],
  templateUrl: './member-panel.component.html',
  styleUrl: './member-panel.component.scss'
})
export class MemberPanelComponent implements OnInit {
  profile: any = null;

  constructor(private router: Router, private raidGuildDataService: RaidguildDataService, private toastNotificationService: ToastNotificationService) { }

  async ngOnInit(): Promise<void> {
    try {
      this.profile = await firstValueFrom(this.raidGuildDataService.getUser());
    } catch (err) {
      this.toastNotificationService.error('User Profile', 'Failed to retrieve User Profile due to an Internal Error.');
    }
  }

  editProfile(): void {
    this.router.navigateByUrl('profile/edit');
  }
}
