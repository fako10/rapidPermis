import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionAdmin } from './question-admin';

describe('QuestionAdmin', () => {
  let component: QuestionAdmin;
  let fixture: ComponentFixture<QuestionAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
