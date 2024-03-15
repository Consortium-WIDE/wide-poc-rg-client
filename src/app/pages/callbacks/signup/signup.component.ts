import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RaidguildDataService } from '../../../services/raidguild-data.service';
import { WideService } from '../../../services/wide.service';
import { environment } from '../../../../environments/environment.development';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  retrievedPresentation: any = {};

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private raidGuildDataService: RaidguildDataService, private wideService: WideService) { }


  async ngOnInit(): Promise<void> {
    this.issueMembershipCredential();
  }

  async issueMembershipCredential(): Promise<void> {
    this.activatedRoute.queryParams.subscribe(async (params) => {
      const token = params['token'];

      if (token) {
        this.retrievedPresentation = await firstValueFrom(this.raidGuildDataService.getDataByToken(token));

        console.log('retrievedPresentation', this.retrievedPresentation);

        let payload: any =
        {
          issuer: {
            label: 'Raid Guild Membership',
            type: ["Raid Guild Membership"],
            issuer: environment.hostUri,
            credentialSubject: {
              id: this.retrievedPresentation.data.credentialSubject.id,
              rgdmId: token,
            }
          }
        }

        const baseData = { dungeonMasterUserId: token }

        let propertyNamesToExtract = ["id", "name", "createdAt"];

        const filteredProperties = this.retrievedPresentation.data.credentialSubject.issuerDomains.map((issuerDomain: any) => issuerDomain.data.credentials).flat().filter((property: any) => propertyNamesToExtract.includes(property.name));

        const extractedProperties = filteredProperties
          .reduce((accumulator: any, currentValue: any) => {
            accumulator[currentValue.name] = currentValue.value;
            return accumulator;
          }, {});

        payload.data = { ...baseData, daoContract: extractedProperties.id, daoName: extractedProperties.name, daoCreateDate: extractedProperties.createdAt }

        await this.initiateBackIssuance(payload);
      }

    });
  }

  async initiateBackIssuance(payload: any): Promise<void> {
    let wideWindow = window.open(`${environment.wideUri}/popup/start`, 'WIDE', 'width=600, height=800');

    if (!wideWindow) {
      //TODO: Add popups / toasts
      alert('Popup was blocked. Please allow popups for this website.');
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
                  allowMultiples: false,
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
            const issuer = event.data;
            await this.registerUser(issuer.data, payload);

            this.raidGuildDataService.setAuthStatus(payload.data.id);

            this.router.navigateByUrl('/profile', { state: { userId: payload.data.id } });
          }

          if (event.data.status === 'already_exists') {
            this.beginSignInFlow();
          }
        }
      });

    }
  }

  async registerUser(issuer: any, payload: any): Promise<void> {
    const userId = issuer.credentialSubject.rgdmId;
    await firstValueFrom(this.raidGuildDataService.registerUser(userId, issuer, payload.data));
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
}
