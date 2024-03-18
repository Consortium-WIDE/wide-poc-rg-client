import { TestBed } from '@angular/core/testing';

import { RaidguildDataService } from './raidguild-data.service';

describe('RaidguildDataService', () => {
  let service: RaidguildDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RaidguildDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
