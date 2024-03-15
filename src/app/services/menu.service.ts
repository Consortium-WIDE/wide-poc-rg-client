import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface MenuItem {
    title: string;
    path: string;
}

@Injectable({
    providedIn: 'root',
})
export class MenuService {
    private menuItemsSource = new BehaviorSubject<MenuItem[]>([]);
    public menuItems$ = this.menuItemsSource.asObservable();

    private showMenuSource = new BehaviorSubject<boolean>(false);
    public showMenu$ = this.showMenuSource.asObservable();

    setMenuItems(items: MenuItem[]) {
        this.menuItemsSource.next(items);
    }

    setShowMenu(show: boolean) {
        this.showMenuSource.next(show);
    }
}
