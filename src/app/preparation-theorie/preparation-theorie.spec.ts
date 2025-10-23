import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreparationTheorie } from './preparation-theorie';

describe('PreparationTheorie', () => {
  let component: PreparationTheorie;
  let fixture: ComponentFixture<PreparationTheorie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreparationTheorie]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreparationTheorie);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
