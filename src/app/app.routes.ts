import { Routes } from '@angular/router';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { LandingComponent } from './pages/landing/landing.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { ErrorComponent } from './pages/error/error.component';
import { SignupComponent } from './pages/callbacks/signup/signup.component';
import { SigninComponent } from './pages/callbacks/signin/signin.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { MenuItem } from './services/menu.service';

const menuItems: MenuItem[] = [
    { title: 'My Profile', path: '/profile'},
    { title: 'Raids', path: '/raids'},
    { title: 'Members', path: '/members'},
]

export const routes: Routes = [
    {
        path: '',
        component: BaseLayoutComponent,
        children: [
            { path: '', component: LandingComponent },
            { path: 'signup', component: SignupComponent },
            { path: 'signin', component: SigninComponent },
        ]
    },
    {
        path: '',
        component: MainLayoutComponent,
        data: {
            showTopMenu: true,
            menuItems: menuItems
        },
        children: [
            { path: 'profile', component: UserProfileComponent },
            { path: '**', component: ErrorComponent },
        ]
    }
];
