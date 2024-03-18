import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RgdmInputComponent } from '../../components/rgdm-input/rgdm-input.component';
import { FormsModule } from '@angular/forms';
import { RgdmDropdownComponent } from '../../components/rgdm-dropdown/rgdm-dropdown.component';
import { environment } from '../../../environments/environment';
import { WideService } from '../../services/wide.service';
import { RaidguildDataService } from '../../services/raidguild-data.service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { ToastNotificationService } from '../../services/toast-notification.service';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RgdmInputComponent, RgdmDropdownComponent],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent {
  skill_types: string[] = ["NOT_APPLICABLE", "NON_TECHNICAL", "TECHNICAL", "OTHER"];
  skills: string[] = ["FRONTEND", "BACKEND", "SOLIDITY", "BIZ_DEV", "COMMUNITY", "PROJECT_MANAGEMENT", "FINANCE", "PRODUCT_DESIGN", "UX_RESEARCH", "GAME_THEORY", "DEVOPS", "TOKENOMICS", "CONTENT", "MEMES", "VISUAL_DESIGN", "UI_DESIGN", "ILLUSTRATION", "LEGAL", "ACCOUNTING"]
  guild_classes: string[] = ["COMMUNITY", "DESIGN", "TREASURY", "MARKETING", "FRONTEND_DEV", "OPERATIONS", "BIZ_DEV", "BACKEND_DEV", "PROJECT_MANAGEMENT", "SMART_CONTRACTS", "LEGAL", "ACCOUNT_MANAGER"]

  profile: any = {
    name: null,
    bio: null,
    role: null,
    primarySkill: null,
    secondarySkill: null,
    github: null,
    telegram: null,
    discord: null,
    email: null
  }

  constructor(private wideService: WideService, private router: Router, private raidGuildDataService: RaidguildDataService, private toastNotificationService: ToastNotificationService, private menuService: MenuService) { }

  async ngOnInit(): Promise<void> {
    this.menuService.setShowMenu(true);
    await this.raidGuildDataService.redirectIfNotLoggedIn();
    this.profile = await firstValueFrom(this.raidGuildDataService.getUser());
  }

  getMailFromWide(): void {
    const domain = "raidguild_email";
    const authUrl = `${environment.wideClaimEmail.serverPresentationUrl}?domain=${domain}`;

    // Update the server config
    this.wideService.updateServerConfig(domain, environment.wideClaimEmail.wideConfig).subscribe(
      () => {
        // Config updated successfully, now redirect
        window.location.href = authUrl;
      },
      error => {
        // Handle error scenario
        console.error('Error updating server config:', error);
        // Optionally, redirect or notify the user of the error
      }
    );
  }

  getDiscordHandleFromWide(): void {
    const domain = "raidguild_discordhandle";
    const authUrl = `${environment.wideClaimDiscord.serverPresentationUrl}?domain=${domain}`;

    // Update the server config
    this.wideService.updateServerConfig(domain, environment.wideClaimDiscord.wideConfig).subscribe(
      () => {
        // Config updated successfully, now redirect
        window.location.href = authUrl;
      },
      error => {
        // Handle error scenario
        console.error('Error updating server config:', error);
        // Optionally, redirect or notify the user of the error
      }
    );
  }

  async updateProfile(): Promise<void> {
    try {
      this.updateWideCredential();
    } catch (err) {
      this.toastNotificationService.error('User Profile', 'Failed to update your user profile due to an Internal Error.');
    }
  }

  async updateWideCredential(): Promise<void> {
    let wideWindow = window.open(`${environment.wideUri}/update/start`, 'WIDE', 'width=600, height=800');
    
    debugger;

    const wideCredentialId = this.profile.wideCredentialId;

    //Clone profile to payload and remove keys (these cannot be updated anyway)
    //TODO: Confirm WIDE cannot update the credentialSubjectIds. These should never change
    const payload = JSON.parse(JSON.stringify(this.profile));
    delete payload['wideCredentialId'];
    delete payload['wideCreatedAt'];

    payload['updatedAt'] = (Math.floor(Date.now() / 1000));

    if (!wideWindow) {
      this.toastNotificationService.info('Enable Popups', 'Popups are blocked for this website. Please allow popups to communicate with the WIDE platform.');
    } else {

      window.addEventListener('message', async (event) => {
        // Always check the origin for security reasons
        if (event.origin === environment.wideUri) {
          if (event.data.status === 'ready') {
            // Ensure the popup is not blocked and is fully loaded
            if (wideWindow) {
              // Create and send the message to WIDE popup
              const backIssuanceRequest = {
                config: {
                  wideCredentialId: wideCredentialId,
                  logoUri: environment.popupConfig.logoUri,
                  source: environment.popupConfig.sourceName
                },
                payload: payload
              }

              wideWindow.postMessage(backIssuanceRequest, environment.wideUri);
            } else {
              alert('cannot post message');
            }
          }

          if (event.data.status === 'closed') {
            this.profile = await firstValueFrom(this.raidGuildDataService.updateUser(this.profile));
            this.toastNotificationService.success('User Profile', 'User profile has been successfully updated.');

            this.router.navigateByUrl('/profile/edit');
          }
        }
      });

    }
  }

  reject(): void {
    this.router.navigateByUrl('profile');
  }

}
