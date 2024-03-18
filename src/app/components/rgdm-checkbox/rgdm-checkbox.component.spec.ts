import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RgdmCheckboxComponent } from './rgdm-checkbox.component';

describe('RgdmCheckboxComponent', () => {
  let component: RgdmCheckboxComponent;
  let fixture: ComponentFixture<RgdmCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RgdmCheckboxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RgdmCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
