import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { CommonModule } from '@angular/common';
import { RgdmInputComponent } from '../../components/rgdm-input/rgdm-input.component';
import { RgdmDropdownComponent } from '../../components/rgdm-dropdown/rgdm-dropdown.component';
import { FormsModule } from '@angular/forms';
import { MultiSelectTagsComponent } from '../../components/multi-select-tags/multi-select-tags.component';
import { Router } from '@angular/router';
import { RaidguildDataService } from '../../services/raidguild-data.service';
import { firstValueFrom } from 'rxjs';
import { ToastNotificationService } from '../../services/toast-notification.service';

@Component({
  selector: 'app-create-raid',
  standalone: true,
  imports: [CommonModule, RgdmInputComponent, RgdmDropdownComponent, FormsModule, MultiSelectTagsComponent],
  templateUrl: './create-raid.component.html',
  styleUrl: './create-raid.component.scss'
})
export class CreateRaidComponent implements OnInit {
  raidStatuses: string[] = ['Raiding', 'Ended'];
  guild_classes: string[] = ["COMMUNITY", "DESIGN", "TREASURY", "MARKETING", "FRONTEND_DEV", "OPERATIONS", "BIZ_DEV", "BACKEND_DEV", "PROJECT_MANAGEMENT", "SMART_CONTRACTS", "LEGAL", "ACCOUNT_MANAGER"]

  raid: any = {

  }

  constructor(private router: Router, private menuService: MenuService, private raidGuildDataService: RaidguildDataService, private toastNotificationService: ToastNotificationService) { }

  async ngOnInit(): Promise<void> {
    this.menuService.setShowMenu(true);
    await this.raidGuildDataService.redirectIfNotLoggedIn();
  }

  onSelectedTagsChange(newTags: string[]): void {
    // Update your array of selected tags with the new value
    this.raid.selectedTags = newTags;
    // If you need to do anything else when the tags change, do it here
  }

  async createRaid(): Promise<void> {
    //hardcode when creating raid
    this.raid.status = 'Raiding';

    if (this.raid && this.raid.raidName && this.raid.summary && this.raid.status) {
      await firstValueFrom(this.raidGuildDataService.createRaid(this.raid));
      this.router.navigateByUrl('raids');
    } else {
      this.toastNotificationService.error('Cannot Raid', 'Please fill in all fields before creating raid');
    }
  }

  reject(): void {
    this.router.navigateByUrl('raids');
  }
}
