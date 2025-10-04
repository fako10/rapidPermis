import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenTheorique } from './examen-theorique';

describe('ExamenTheorique', () => {
  let component: ExamenTheorique;
  let fixture: ComponentFixture<ExamenTheorique>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamenTheorique]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamenTheorique);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
