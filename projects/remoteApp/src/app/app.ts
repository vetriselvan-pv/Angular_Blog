import { Component, ElementRef, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initializeModel, ModelAdapter, NgDiagramComponent, provideNgDiagram } from 'ng-diagram';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgDiagramComponent],
  providers : [ provideNgDiagram()],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('remoteApp');

  protected readonly model = initializeModel({
    nodes: [
      { id: '1', position: { x: 100, y: 150 }, data: { label: 'Node 1' } },
      { id: '2', position: { x: 400, y: 150 }, data: { label: 'Node 2' } },
    ],
    edges: [
      {
        id: '1',
        source: '1',
        sourcePort: 'port-right',
        targetPort: 'port-left',
        target: '2',
        data: {},
      },
    ],
  });
}
