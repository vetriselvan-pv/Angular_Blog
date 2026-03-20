import { Component } from '@angular/core';
import { 
  initializeModel, 
  NgDiagramBackgroundComponent, 
  NgDiagramComponent, 
  NgDiagramNodeTemplateMap, 
  provideNgDiagram,
  NgDiagramPaletteItemComponent,
  NgDiagramPaletteItemPreviewComponent,
  type NgDiagramPaletteItem
} from 'ng-diagram';
import { FemaleNode } from '../../component/female-node/female-node';
import { MaleNode } from '../../component/male-node/male-node';

@Component({
  selector: 'app-family-tree',
  imports: [
    NgDiagramComponent,
    NgDiagramBackgroundComponent,
    NgDiagramPaletteItemComponent,
    NgDiagramPaletteItemPreviewComponent
  ],
  templateUrl: './family-tree.html',
  styleUrl: './family-tree.css',
  providers : [
    provideNgDiagram()
  ]
})
export class FamilyTree {
  nodeTemplateMap = new NgDiagramNodeTemplateMap([
    ['male', MaleNode],
    ['female', FemaleNode],
  ]);

  paletteItems: NgDiagramPaletteItem[] = [
    {
      type: 'male',
      data: { label: 'Male' }, 
      autoSize: false
    },
    {
      type: 'female',
      data: { label: 'Female' }, 
      autoSize: false
    }
  ];

  protected readonly model = initializeModel({
    nodes: [ 
      {
        id: '3',
        position: { x: 200, y: 230 }, 
        autoSize: false,
        type: 'male',
        data: {},
      },
      {
        id: '4',
        position: { x: 400, y: 400 }, 
        autoSize: false,
        type: 'female',
        data: {},
      },
    ],
    edges: [],
  });
}
