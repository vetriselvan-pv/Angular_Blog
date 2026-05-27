import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDecorator } from './custom-decorator';

describe('CustomDecorator', () => {
  let component: CustomDecorator;
  let fixture: ComponentFixture<CustomDecorator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomDecorator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomDecorator);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
