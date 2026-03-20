import { Component, input } from '@angular/core';
import {
  NgDiagramNodeSelectedDirective,
  type NgDiagramNodeTemplate,
  NgDiagramPortComponent,
  type Node,
} from 'ng-diagram';

@Component({
  imports: [NgDiagramPortComponent],
  selector: 'app-male',
  hostDirectives: [{ directive: NgDiagramNodeSelectedDirective, inputs: ['node'] }],
  template: `
    <div
      class="bg-white border-2 border-slate-200 rounded-xl shadow-sm min-w-[200px] max-h-[60px] relative flex items-center justify-center p-4"
    >
      <div
        class="absolute -top-3 -right-3 bg-white border-2 border-slate-200 rounded-full p-1 shadow-[0_2px_4px_rgba(0,0,0,0.05)] pointer-events-none flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4 text-blue-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="10" cy="14" r="5" />
          <line x1="13.5" y1="10.5" x2="19" y2="5" />
          <polyline points="15 5 19 5 19 9" />
        </svg>
      </div>

      <div
        contenteditable="true"
        class="w-full text-center text-lg font-semibold text-slate-800 outline-none focus:bg-blue-50/50 rounded transition-colors px-2 py-1 truncate"
        (keydown.enter)="$event.preventDefault()"
      >
        {{ node().data?.['label'] || 'Enter Name' }}
      </div>
    </div>
    <ng-diagram-port [side]="'left'" [type]="'both'" [id]="'port-left'" />
    <ng-diagram-port [side]="'right'" [type]="'both'" [id]="'port-right'" />
    <ng-diagram-port [side]="'top'" [type]="'both'" [id]="'port-top'" />
    <ng-diagram-port [side]="'bottom'" [type]="'both'" [id]="'port-bottom'" />
  `,
  styles: [],
})
export class MaleNode implements NgDiagramNodeTemplate {
  node = input.required<Node<any>>();
}
