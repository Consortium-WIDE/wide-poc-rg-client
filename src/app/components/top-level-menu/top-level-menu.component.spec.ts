import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopLevelMenuComponent } from './top-level-menu.component';

describe('TopLevelMenuComponent', () => {
  let component: TopLevelMenuComponent;
  let fixture: ComponentFixture<TopLevelMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopLevelMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopLevelMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
