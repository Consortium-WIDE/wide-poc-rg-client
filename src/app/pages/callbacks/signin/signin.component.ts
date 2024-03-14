import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RaidguildDataService } from '../../../services/raidguild-data.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private raidGuildDataService: RaidguildDataService) { }

  async ngOnInit(): Promise<void> {
    this.activatedRoute.queryParams.subscribe(async (params) => {
      const token = params['token'];

      if (token) {
        await firstValueFrom(this.raidGuildDataService.authenticate(token));
        this.router.navigateByUrl('/');
      }

    });
  }

}
