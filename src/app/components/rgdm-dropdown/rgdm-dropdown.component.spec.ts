import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RgdmDropdownComponent } from './rgdm-dropdown.component';

describe('RgdmDropdownComponent', () => {
  let component: RgdmDropdownComponent;
  let fixture: ComponentFixture<RgdmDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RgdmDropdownComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RgdmDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
