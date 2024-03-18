import { Component, OnInit } from '@angular/core';
import { MenuService, MenuItem } from '../../services/menu.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-top-level-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './top-level-menu.component.html',
  styleUrl: './top-level-menu.component.scss'
})
export class TopLevelMenuComponent implements OnInit {
  menuItems: MenuItem[] = [];
  showMenu: boolean = false;

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    this.menuService.menuItems$.subscribe(items => {
      this.menuItems = items;
    });

    this.menuService.showMenu$.subscribe(show => {
      this.showMenu = show;
    });
  }
}