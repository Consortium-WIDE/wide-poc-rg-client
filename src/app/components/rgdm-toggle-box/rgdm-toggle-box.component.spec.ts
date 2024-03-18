import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RgdmToggleBoxComponent } from './rgdm-toggle-box.component';

describe('RgdmToggleBoxComponent', () => {
  let component: RgdmToggleBoxComponent;
  let fixture: ComponentFixture<RgdmToggleBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RgdmToggleBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RgdmToggleBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
