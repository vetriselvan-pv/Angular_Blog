import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { form, FormField } from '@angular/forms/signals';
import { InputGrid } from './input-grid/input-grid';

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-signal-form',
  imports: [ InputGrid],
  templateUrl: './signal-form.html',
  styleUrl: './signal-form.css',
})
export class SignalForm {
  readonly employees = signal<Employee[]>([]);

  readonly tableForm = form(this.employees);

  addRow() {
    this.employees.update(emps => [
      ...emps,
      { id: Date.now().toString(), name: '', email: '', role: '' }
    ]);
  }

  removeRow(index: number) {
    this.employees.update(emps => emps.filter((_, i) => i !== index));
  }
}
