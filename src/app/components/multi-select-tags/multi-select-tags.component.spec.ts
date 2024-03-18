import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiSelectTagsComponent } from './multi-select-tags.component';

describe('MultiSelectTagsComponent', () => {
  let component: MultiSelectTagsComponent;
  let fixture: ComponentFixture<MultiSelectTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiSelectTagsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultiSelectTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
