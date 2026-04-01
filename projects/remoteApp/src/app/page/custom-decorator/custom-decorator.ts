import { Component } from '@angular/core';
import { Debounce } from '../../decorator/debounce-decorator';

@Component({
  selector: 'app-custom-decorator',
  imports: [],
  templateUrl: './custom-decorator.html',
  styleUrl: './custom-decorator.css',
})
export class CustomDecorator {
  @Debounce(300)
  onSearch(event:any) {
    console.log('debounced time', event);
  }
}
