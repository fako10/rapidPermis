import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeTest } from './free-test';

describe('FreeTest', () => {
  let component: FreeTest;
  let fixture: ComponentFixture<FreeTest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreeTest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreeTest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
