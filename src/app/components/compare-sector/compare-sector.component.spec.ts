import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareSectorComponent } from './compare-sector.component';

describe('CompareSectorComponent', () => {
  let component: CompareSectorComponent;
  let fixture: ComponentFixture<CompareSectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareSectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareSectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
