import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { CommonModule } from '@angular/common';
import { RgdmDropdownComponent } from '../../components/rgdm-dropdown/rgdm-dropdown.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RaidguildDataService } from '../../services/raidguild-data.service';
import { firstValueFrom } from 'rxjs';
import { RaidComponent } from '../../components/raid/raid.component';

@Component({
  selector: 'app-raids',
  standalone: true,
  imports: [CommonModule, RgdmDropdownComponent, FormsModule, RaidComponent],
  templateUrl: './raids.component.html',
  styleUrl: './raids.component.scss'
})
export class RaidsComponent implements OnInit {
  statusFilters: string[] = ['All', 'Raiding', 'Ended']
  sortFilters: string[] = ['Newest', 'Oldest']
  userId: any;

  filters: any = {
    status: 'All',
    sort: 'Newest'
  }

  raids: any[] = [];

  constructor(private router: Router, private menuService: MenuService, private raidguildDataService: RaidguildDataService) { }

  async ngOnInit(): Promise<void> {
    this.menuService.setShowMenu(true);
    const userResponse = await this.raidguildDataService.redirectIfNotLoggedIn();
    this.userId = userResponse.userId;

    const response = await firstValueFrom(this.raidguildDataService.listRaids());

    if (response && response.success) {
      this.raids = response.raids;
    }
  }

  newRaid(): void {
    this.router.navigateByUrl('raids/new');
  }

  async refresh(): Promise<void> {
    const response = await firstValueFrom(this.raidguildDataService.listRaids(this.filters.status));
    if (response && response.success) {
      let raidsTemp = [];

      if (this.filters.status == 'All') {
        raidsTemp = response.raids;
      } else {
        raidsTemp = response.raids.filter((r: any) => r.status === this.filters.status);
      }

      raidsTemp = raidsTemp.sort((r: any) => r.createdAt);

      if (this.filters.sort == 'Oldest') {
        raidsTemp.reverse(); 
      }

      this.raids = raidsTemp;
    }

  }
}
