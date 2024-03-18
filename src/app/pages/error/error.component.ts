import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss'
})
export class ErrorComponent implements OnInit {
  constructor(private menuService: MenuService) { }

  ngOnInit() {
    // Example of overriding or specifying menu items for this component
    this.menuService.setShowMenu(false);
  }
}
