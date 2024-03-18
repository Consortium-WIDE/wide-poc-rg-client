import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberPanelComponent } from '../../components/member-panel/member-panel.component';
import { MenuService } from '../../services/menu.service';
import { RaidguildDataService } from '../../services/raidguild-data.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, MemberPanelComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  userId: string | null = null;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private menuService: MenuService, private raidguildDataService: RaidguildDataService) { }

  async ngOnInit(): Promise<void> {
    this.menuService.setShowMenu(true);
    this.userId = await this.raidguildDataService.redirectIfNotLoggedIn();
  }

  async logout(): Promise<void> {
    await firstValueFrom(this.raidguildDataService.logout());
    this.router.navigateByUrl('/');
  }
}
