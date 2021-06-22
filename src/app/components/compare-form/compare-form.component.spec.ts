import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareFormComponent } from './compare-form.component';

describe('CompareFormComponent', () => {
  let component: CompareFormComponent;
  let fixture: ComponentFixture<CompareFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
