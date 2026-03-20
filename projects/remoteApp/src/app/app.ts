import { Component, ElementRef, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';  

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  providers: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('remoteApp');


}
