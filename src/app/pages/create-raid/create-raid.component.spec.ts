import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRaidComponent } from './create-raid.component';

describe('CreateRaidComponent', () => {
  let component: CreateRaidComponent;
  let fixture: ComponentFixture<CreateRaidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRaidComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateRaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
