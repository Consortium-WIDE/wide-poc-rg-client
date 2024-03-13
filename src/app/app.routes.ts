import { Routes } from '@angular/router';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { LandingComponent } from './pages/landing/landing.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { ErrorComponent } from './pages/error/error.component';

export const routes: Routes = [
    {
        path: '',
        component: BaseLayoutComponent,
        children: [
            { path: '', component: LandingComponent },
        ]
    },
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: '**', component: ErrorComponent },
        ]
    },
];
