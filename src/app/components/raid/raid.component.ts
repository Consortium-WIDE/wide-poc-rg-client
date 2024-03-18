import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RaidguildDataService } from '../../services/raidguild-data.service';
import { first, firstValueFrom } from 'rxjs';
import { ToastNotificationService } from '../../services/toast-notification.service';

@Component({
  selector: 'app-raid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './raid.component.html',
  styleUrl: './raid.component.scss'
})
export class RaidComponent {
  @Input({ required: true }) raid: any;
  @Input({ required: true }) userId: any;
  @Input() showDebug: boolean = false;

  constructor(private raidGuildDataService: RaidguildDataService, private toastNotificationService: ToastNotificationService) { }

  isRaiding(): boolean {
    return this.raid.members.map((m: any) => m.userId).includes(this.userId);
  }

  getRaidMembers(): string {
    return this.raid.members.map((m: any) => m.memberName).join(', ');
  }

  isCleric(): boolean {
    const member = this.raid.members.filter((m: any) => m.userId === this.userId);

    if (member.length > 0) {
      const user = member[0];

      return user.role == 'Cleric';
    }
    
    return false;
  }

  async joinRaid(raidId: string): Promise<void> {
    await firstValueFrom(this.raidGuildDataService.joinRaid(raidId, 'Member'));
    const response = await firstValueFrom(this.raidGuildDataService.getRaidById(raidId));

    if (response.success) {
      this.raid = response.raid;
    } else {
      this.toastNotificationService.error('Error', 'Failed trying to join raid');
    }
  }

  async endRaid(raidId: string): Promise<void> {
    await firstValueFrom(this.raidGuildDataService.endRaid(raidId));
    const response = await firstValueFrom(this.raidGuildDataService.getRaidById(raidId));

    if (response.success) {
      this.raid = response.raid;
    } else {
      this.toastNotificationService.error('Error', 'Failed trying to end raid');
    }
  }

  async leaveRaid(raidId: string): Promise<void> {
    await firstValueFrom(this.raidGuildDataService.leaveRaid(raidId));
    const response = await firstValueFrom(this.raidGuildDataService.getRaidById(raidId));

    if (response.success) {
      this.raid = response.raid;
    } else {
      this.toastNotificationService.error('Error', 'Failed trying to leave raid');
    }
  }
}
