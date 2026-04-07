import { Component } from '@angular/core';
import { Debounce } from '../../decorator/debounce.decorator';
import { Retry } from '../../decorator/retry.decorator';
import { Performance } from '../../decorator/performance.decorator';



@Component({
  selector: 'app-custom-decorator',
  imports: [],
  templateUrl: './custom-decorator.html',
  styleUrl: './custom-decorator.css',
})
export class CustomDecorator {
  count = 0;
  @Debounce(300)
  onSearch(event: any) {
    console.log('debounced time', event);
  }

  constructor() {
    this.callPromise();
    // this.delayedCall()

  }

  @Retry(2)
  async retryPromiseDecorator() {
    if (!this.count) {
      this.count++;
      return Promise.reject('rejected promise');
    } else {
      return Promise.resolve('resolved success');
    }
  }

  async callPromise() {
    const data = await this.retryPromiseDecorator();
    console.log(data);
  }


  @Performance
  delayedCall(){
    for (let index = 0; index < 300000; index++) {
       
    }
  }
}
