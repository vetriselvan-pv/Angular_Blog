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
<<<<<<< HEAD
  protected readonly title = signal('remoteApp');


=======
  readonly title = signal('remoteApp');
>>>>>>> origin/main
}
