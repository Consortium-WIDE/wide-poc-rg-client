import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { TopLevelMenuComponent } from '../../components/top-level-menu/top-level-menu.component';
import { MenuService } from '../../services/menu.service';
import { filter, map, mergeMap } from 'rxjs';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, TopLevelMenuComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private menuService: MenuService) { }

  ngOnInit() {
    // Listen to changes in parent route's data
    this.activatedRoute.data.subscribe((data: any) => {
      // Assuming 'showTopMenu' and 'menuItems' are defined at this level
      this.menuService.setShowMenu(data.showTopMenu);
      if (data.menuItems) {
        this.menuService.setMenuItems(data.menuItems);
      }
    });
  }
}