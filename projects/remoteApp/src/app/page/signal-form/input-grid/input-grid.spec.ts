import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputGrid } from './input-grid';

describe('InputGrid', () => {
  let component: InputGrid;
  let fixture: ComponentFixture<InputGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputGrid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
