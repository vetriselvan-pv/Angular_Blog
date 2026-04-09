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

  it('should initiate with empty array',() => {
    expect(component.collectionForm().value()).toHaveLength(0)
  });

  it('should trigger addRow method',()=>{
    const method = vi.spyOn(component,'addRow') 
    const addBtn : HTMLButtonElement = fixture.nativeElement.querySelector('#addBtn');
    addBtn.click(); 
    expect(method).toHaveBeenCalled();
  });

  it('should update the formarray of the signal form',() => {
    component.addRow();
    expect(component.collectionForm().value()).toHaveLength(1)
  });

  it('should remove the data from the signal ', () => {
    component.addRow(); 
    component.removeRow(0);
    expect(component.collectionForm().value()).toHaveLength(0);
  });

  it('should printvalue on click the submit button', () => {
    const submitEvent = vi.spyOn(component,'printValue');
    const submitBtn = fixture.nativeElement.querySelector('#submitBtn');
    submitBtn.click(); 
    expect(submitEvent).toHaveBeenCalled();

  });

  it('should iterate table header', () => {
    const tableHeader = fixture.nativeElement.querySelector('#header_1');
    expect(tableHeader).toBeTruthy();
  });

  it('should trigger the delete row method', () => {
    const deleteAction = vi.spyOn(component, 'removeRow');
    component.addRow();
    fixture.detectChanges();
    const removeBtn = fixture.nativeElement.querySelector('#removeBtn');
    removeBtn.click();
    expect(deleteAction).toHaveBeenCalled();
  })

});
