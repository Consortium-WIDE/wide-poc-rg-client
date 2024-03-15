import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';
import { WideService } from '../../services/wide.service';
import { RaidguildDataService } from '../../services/raidguild-data.service';
import { CommonModule } from '@angular/common';
import { RgdmCheckboxComponent } from '../../components/rgdm-checkbox/rgdm-checkbox.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RgdmCheckboxComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent implements OnInit {
  isLoggedIn: boolean = false;
  userId: string | null = null;
  wideConfirmation: boolean = true; //TODO: Change to false before deploy

  constructor(private router: Router, private wideService: WideService, private raidGuildDataService: RaidguildDataService) { }

  ngOnInit(): void {
    this.raidGuildDataService.getAuthStatus().subscribe((status: any) => {
      if (status) {
        this.userId = status.userId;

        if (this.userId) {
          this.router.navigateByUrl('/profile', { state: { userId: this.userId } });
        }
      }
    });
  }

  beginPresentationFlow(): void {
    const domain = "raidguild-signup";
    const authUrl = `${environment.wideRegisterUserRaidGuild.serverPresentationUrl}?domain=${domain}`;

    // Update the server config
    this.wideService.updateServerConfig(domain, environment.wideRegisterUserRaidGuild.wideConfig).subscribe(
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

  //TODO: Place flows in a separate service? Duplicate with singup.component.ts
  beginSignInFlow(): void {
    const domain = "raidguild-signin";
    const authUrl = `${environment.wideSigninUserRaidGuild.serverPresentationUrl}?domain=${domain}`;

    // Update the server config
    this.wideService.updateServerConfig(domain, environment.wideSigninUserRaidGuild.wideConfig).subscribe(
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

  goToWide(): void {
    window.open(environment.wideUri, "_blank");
  }
}
