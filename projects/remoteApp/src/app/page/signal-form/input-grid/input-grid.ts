import { Component,signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';

export interface ICollection {
  slNo: number;
  bikeName: string;
  engineType: string;
  price: number;
  model: string;
  year: number;
  color : string
}

@Component({
  selector: 'app-input-grid',
  imports: [FormField],
  templateUrl: './input-grid.html',
  styleUrl: './input-grid.css'
})
export class InputGrid {
  collectionList = signal<ICollection[]>([]);

  collectionForm = form(this.collectionList);

  tableHeaders = signal<string[]>(['Sl No', 'Bike Name', 'Engine Type', 'Price', 'Model', 'Year', 'Color', 'Action']);

  addRow() {
    this.collectionList.update(collection => [...collection, { slNo: collection.length+1, bikeName: '', engineType: '', price: 0, model: '', year: 0, color: '' }]);
  }

  removeRow(index: number) {
    this.collectionList.update(collection => collection.filter((_, i) => i !== index));
  }

  printValue(){
    console.log(this.collectionForm().value());
  }
}
