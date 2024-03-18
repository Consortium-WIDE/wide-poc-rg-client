import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RgdmInputComponent } from './rgdm-input.component';

describe('RgdmInputComponent', () => {
  let component: RgdmInputComponent;
  let fixture: ComponentFixture<RgdmInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RgdmInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RgdmInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
