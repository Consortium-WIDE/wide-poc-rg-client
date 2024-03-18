import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RaidguildDataService {
  private apiUrl: string = environment.rgApiUri;
  private authStatus: BehaviorSubject<{ userId: string | null }> =
    new BehaviorSubject<{ userId: string | null }>({ userId: null });

  constructor(private http: HttpClient, private router: Router) {
    this.initializeAuthStatus(); // Check login status on service initialization
  }

  private initializeAuthStatus(): void {
    this.checkLoginStatus().subscribe({
      next: (response) => {
        if (response) {
          // User already logged in
          this.setAuthStatus(response.userId);
        } else {
          // User not logged in
          this.setAuthStatus(null);
        }
      },
      error: (error) => {
        console.error('Error checking login status:', error);
        this.setAuthStatus(null);
      }
    });
  }

  checkLoginStatus(): Observable<any> {
    return this.http.get(`${this.apiUrl}/rg/user/status`, { withCredentials: true });
  }

  setAuthStatus(userId: string | null): void {
    this.authStatus.next({ userId });
  }

  getAuthStatus() {
    return this.authStatus.asObservable(); // Allow components to subscribe
  }

  async redirectIfNotLoggedIn(): Promise<any> {
    const loginStatus = await firstValueFrom(this.checkLoginStatus());

    if (!loginStatus) {
      this.router.navigateByUrl('/');
    }

    return loginStatus;
  }

  authenticate(token: string): Observable<any> {
    return new Observable(observer => {
      this.checkLoginStatus().subscribe({
        next: (statusResponse) => {
          if (!statusResponse) {
            // User not logged in, proceed with authentication
            this.http.post(`${this.apiUrl}/rg/authenticate`, { authToken: token }, { withCredentials: true })
              .subscribe({
                next: (response: any) => {
                  this.setAuthStatus(response.user.userId); // Set loggedIn true and userId
                  observer.next(response);
                  observer.complete();
                },
                error: (error) => {
                  this.setAuthStatus(null); // Reset the status on error
                  observer.error(error);
                }
              });
          }
        },
        error: (error) => {
          // Error when checking login status, likely need to handle or notify the user
          observer.error(error);
        }
      });
    });
  }

  getDataByToken(token: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/rg/data/${token}`);
  }

  registerUser(userId: string, issuer: any, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/rg/user/register/${userId}`, { wideCredentialId: issuer.wideInternalId, data: data }, { withCredentials: true });
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/rg/logout`, {}, { withCredentials: true });
  }

  getUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/rg/user`, { withCredentials: true });
  }

  updateUser(profile: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/rg/user`, profile, { withCredentials: true });
  }

  createRaid(raid: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/rg/raids`, raid, { withCredentials: true });
  }

  // Get a specific raid by its ID
  getRaidById(raidId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/rg/raids/${raidId}`, { withCredentials: true });
  }

  // Update a specific raid by its ID
  updateRaid(raidId: string, raid: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/rg/raids/${raidId}`, raid, { withCredentials: true });
  }

  // Delete a specific raid by its ID
  deleteRaid(raidId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/rg/raids/${raidId}`, { withCredentials: true });
  }

  joinRaid(raidId: string, role: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/rg/raids/${raidId}/join`, { role: role }, { withCredentials: true });
  }

  endRaid(raidId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/rg/raids/${raidId}/end`, {}, { withCredentials: true });
  }

  leaveRaid(raidId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/rg/raids/${raidId}/leave`, {}, { withCredentials: true });
  }

  // List all raids, optionally filtering by name
  listRaids(filterName?: string): Observable<any> {
    let queryParams = '';
    if (filterName) {
      queryParams = `?status=${filterName}`;
    }
    return this.http.get(`${this.apiUrl}/rg/raids${queryParams}`, { withCredentials: true });
  }
}
