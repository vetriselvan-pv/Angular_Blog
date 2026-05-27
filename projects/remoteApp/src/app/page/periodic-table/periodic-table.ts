import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

interface PeriodicElement {
  position: number;
  symbol: string;
  name: string;
  weight: number;
  category: string;
  col: number;
  row: number;
}

@Component({
  selector: 'app-periodic-table', 
  imports: [CommonModule],
  templateUrl: './periodic-table.html',
  styleUrls: ['./periodic-table.css'],
})
export class PeriodicTable {
  public elementDetailDialog = viewChild<any>('elementDetailDialog');
  public selectedCategory = signal<string>('All');
  public elements = signal<PeriodicElement[]>([
    { position: 1, symbol: 'H', name: 'Hydrogen', weight: 1.008, category: 'nonmetal', col: 1, row: 1 },
    { position: 2, symbol: 'He', name: 'Helium', weight: 4.0026, category: 'noble-gas', col: 18, row: 1 },
    { position: 3, symbol: 'Li', name: 'Lithium', weight: 6.94, category: 'alkali-metal', col: 1, row: 2 },
    { position: 4, symbol: 'Be', name: 'Beryllium', weight: 9.0122, category: 'alkaline-earth-metal', col: 2, row: 2 },
    { position: 5, symbol: 'B', name: 'Boron', weight: 10.81, category: 'metalloid', col: 13, row: 2 },
    { position: 6, symbol: 'C', name: 'Carbon', weight: 12.011, category: 'nonmetal', col: 14, row: 2 },
    { position: 7, symbol: 'N', name: 'Nitrogen', weight: 14.007, category: 'nonmetal', col: 15, row: 2 },
    { position: 8, symbol: 'O', name: 'Oxygen', weight: 15.999, category: 'nonmetal', col: 16, row: 2 },
    { position: 9, symbol: 'F', name: 'Fluorine', weight: 18.998, category: 'halogen', col: 17, row: 2 },
    { position: 10, symbol: 'Ne', name: 'Neon', weight: 20.180, category: 'noble-gas', col: 18, row: 2 },
    { position: 11, symbol: 'Na', name: 'Sodium', weight: 22.990, category: 'alkali-metal', col: 1, row: 3 },
    { position: 12, symbol: 'Mg', name: 'Magnesium', weight: 24.305, category: 'alkaline-earth-metal', col: 2, row: 3 },
    { position: 13, symbol: 'Al', name: 'Aluminum', weight: 26.982, category: 'post-transition-metal', col: 13, row: 3 },
    { position: 14, symbol: 'Si', name: 'Silicon', weight: 28.085, category: 'metalloid', col: 14, row: 3 },
    { position: 15, symbol: 'P', name: 'Phosphorus', weight: 30.974, category: 'nonmetal', col: 15, row: 3 },
    { position: 16, symbol: 'S', name: 'Sulfur', weight: 32.06, category: 'nonmetal', col: 16, row: 3 },
    { position: 17, symbol: 'Cl', name: 'Chlorine', weight: 35.45, category: 'halogen', col: 17, row: 3 },
    { position: 18, symbol: 'Ar', name: 'Argon', weight: 39.95, category: 'noble-gas', col: 18, row: 3 },
    { position: 19, symbol: 'K', name: 'Potassium', weight: 39.098, category: 'alkali-metal', col: 1, row: 4 },
    { position: 20, symbol: 'Ca', name: 'Calcium', weight: 40.078, category: 'alkaline-earth-metal', col: 2, row: 4 },
    { position: 21, symbol: 'Sc', name: 'Scandium', weight: 44.956, category: 'transition-metal', col: 3, row: 4 },
    { position: 22, symbol: 'Ti', name: 'Titanium', weight: 47.867, category: 'transition-metal', col: 4, row: 4 },
    { position: 23, symbol: 'V', name: 'Vanadium', weight: 50.942, category: 'transition-metal', col: 5, row: 4 },
    { position: 24, symbol: 'Cr', name: 'Chromium', weight: 51.996, category: 'transition-metal', col: 6, row: 4 },
    { position: 25, symbol: 'Mn', name: 'Manganese', weight: 54.938, category: 'transition-metal', col: 7, row: 4 },
    { position: 26, symbol: 'Fe', name: 'Iron', weight: 55.845, category: 'transition-metal', col: 8, row: 4 },
    { position: 27, symbol: 'Co', name: 'Cobalt', weight: 58.933, category: 'transition-metal', col: 9, row: 4 },
    { position: 28, symbol: 'Ni', name: 'Nickel', weight: 58.693, category: 'transition-metal', col: 10, row: 4 },
    { position: 29, symbol: 'Cu', name: 'Copper', weight: 63.546, category: 'transition-metal', col: 11, row: 4 },
    { position: 30, symbol: 'Zn', name: 'Zinc', weight: 65.38, category: 'transition-metal', col: 12, row: 4 },
    { position: 31, symbol: 'Ga', name: 'Gallium', weight: 69.723, category: 'post-transition-metal', col: 13, row: 4 },
    { position: 32, symbol: 'Ge', name: 'Germanium', weight: 72.630, category: 'metalloid', col: 14, row: 4 },
    { position: 33, symbol: 'As', name: 'Arsenic', weight: 74.922, category: 'metalloid', col: 15, row: 4 },
    { position: 34, symbol: 'Se', name: 'Selenium', weight: 78.971, category: 'nonmetal', col: 16, row: 4 },
    { position: 35, symbol: 'Br', name: 'Bromine', weight: 79.904, category: 'halogen', col: 17, row: 4 },
    { position: 36, symbol: 'Kr', name: 'Krypton', weight: 83.798, category: 'noble-gas', col: 18, row: 4 },
    { position: 37, symbol: 'Rb', name: 'Rubidium', weight: 85.468, category: 'alkali-metal', col: 1, row: 5 },
    { position: 38, symbol: 'Sr', name: 'Strontium', weight: 87.62, category: 'alkaline-earth-metal', col: 2, row: 5 },
    { position: 39, symbol: 'Y', name: 'Yttrium', weight: 88.906, category: 'transition-metal', col: 3, row: 5 },
    { position: 40, symbol: 'Zr', name: 'Zirconium', weight: 91.224, category: 'transition-metal', col: 4, row: 5 },
    { position: 41, symbol: 'Nb', name: 'Niobium', weight: 92.906, category: 'transition-metal', col: 5, row: 5 },
    { position: 42, symbol: 'Mo', name: 'Molybdenum', weight: 95.95, category: 'transition-metal', col: 6, row: 5 },
    { position: 43, symbol: 'Tc', name: 'Technetium', weight: 98, category: 'transition-metal', col: 7, row: 5 },
    { position: 44, symbol: 'Ru', name: 'Ruthenium', weight: 101.07, category: 'transition-metal', col: 8, row: 5 },
    { position: 45, symbol: 'Rh', name: 'Rhodium', weight: 102.91, category: 'transition-metal', col: 9, row: 5 },
    { position: 46, symbol: 'Pd', name: 'Palladium', weight: 106.42, category: 'transition-metal', col: 10, row: 5 },
    { position: 47, symbol: 'Ag', name: 'Silver', weight: 107.87, category: 'transition-metal', col: 11, row: 5 },
    { position: 48, symbol: 'Cd', name: 'Cadmium', weight: 112.41, category: 'transition-metal', col: 12, row: 5 },
    { position: 49, symbol: 'In', name: 'Indium', weight: 114.82, category: 'post-transition-metal', col: 13, row: 5 },
    { position: 50, symbol: 'Sn', name: 'Tin', weight: 118.71, category: 'post-transition-metal', col: 14, row: 5 },
    { position: 51, symbol: 'Sb', name: 'Antimony', weight: 121.76, category: 'metalloid', col: 15, row: 5 },
    { position: 52, symbol: 'Te', name: 'Tellurium', weight: 127.60, category: 'metalloid', col: 16, row: 5 },
    { position: 53, symbol: 'I', name: 'Iodine', weight: 126.90, category: 'halogen', col: 17, row: 5 },
    { position: 54, symbol: 'Xe', name: 'Xenon', weight: 131.29, category: 'noble-gas', col: 18, row: 5 },
    { position: 55, symbol: 'Cs', name: 'Cesium', weight: 132.91, category: 'alkali-metal', col: 1, row: 6 },
    { position: 56, symbol: 'Ba', name: 'Barium', weight: 137.33, category: 'alkaline-earth-metal', col: 2, row: 6 },
    { position: 57, symbol: 'La', name: 'Lanthanum', weight: 138.91, category: 'lanthanide', col: 3, row: 9 },
    { position: 58, symbol: 'Ce', name: 'Cerium', weight: 140.12, category: 'lanthanide', col: 4, row: 9 },
    { position: 59, symbol: 'Pr', name: 'Praseodymium', weight: 140.91, category: 'lanthanide', col: 5, row: 9 },
    { position: 60, symbol: 'Nd', name: 'Neodymium', weight: 144.24, category: 'lanthanide', col: 6, row: 9 },
    { position: 61, symbol: 'Pm', name: 'Promethium', weight: 145, category: 'lanthanide', col: 7, row: 9 },
    { position: 62, symbol: 'Sm', name: 'Samarium', weight: 150.36, category: 'lanthanide', col: 8, row: 9 },
    { position: 63, symbol: 'Eu', name: 'Europium', weight: 151.96, category: 'lanthanide', col: 9, row: 9 },
    { position: 64, symbol: 'Gd', name: 'Gadolinium', weight: 157.25, category: 'lanthanide', col: 10, row: 9 },
    { position: 65, symbol: 'Tb', name: 'Terbium', weight: 158.93, category: 'lanthanide', col: 11, row: 9 },
    { position: 66, symbol: 'Dy', name: 'Dysprosium', weight: 162.50, category: 'lanthanide', col: 12, row: 9 },
    { position: 67, symbol: 'Ho', name: 'Holmium', weight: 164.93, category: 'lanthanide', col: 13, row: 9 },
    { position: 68, symbol: 'Er', name: 'Erbium', weight: 167.26, category: 'lanthanide', col: 14, row: 9 },
    { position: 69, symbol: 'Tm', name: 'Thulium', weight: 168.93, category: 'lanthanide', col: 15, row: 9 },
    { position: 70, symbol: 'Yb', name: 'Ytterbium', weight: 173.05, category: 'lanthanide', col: 16, row: 9 },
    { position: 71, symbol: 'Lu', name: 'Lutetium', weight: 174.97, category: 'lanthanide', col: 17, row: 9 },
    { position: 72, symbol: 'Hf', name: 'Hafnium', weight: 178.49, category: 'transition-metal', col: 4, row: 6 },
    { position: 73, symbol: 'Ta', name: 'Tantalum', weight: 180.95, category: 'transition-metal', col: 5, row: 6 },
    { position: 74, symbol: 'W', name: 'Tungsten', weight: 183.84, category: 'transition-metal', col: 6, row: 6 },
    { position: 75, symbol: 'Re', name: 'Rhenium', weight: 186.21, category: 'transition-metal', col: 7, row: 6 },
    { position: 76, symbol: 'Os', name: 'Osmium', weight: 190.23, category: 'transition-metal', col: 8, row: 6 },
    { position: 77, symbol: 'Ir', name: 'Iridium', weight: 192.22, category: 'transition-metal', col: 9, row: 6 },
    { position: 78, symbol: 'Pt', name: 'Platinum', weight: 195.08, category: 'transition-metal', col: 10, row: 6 },
    { position: 79, symbol: 'Au', name: 'Gold', weight: 196.97, category: 'transition-metal', col: 11, row: 6 },
    { position: 80, symbol: 'Hg', name: 'Mercury', weight: 200.59, category: 'transition-metal', col: 12, row: 6 },
    { position: 81, symbol: 'Tl', name: 'Thallium', weight: 204.38, category: 'post-transition-metal', col: 13, row: 6 },
    { position: 82, symbol: 'Pb', name: 'Lead', weight: 207.2, category: 'post-transition-metal', col: 14, row: 6 },
    { position: 83, symbol: 'Bi', name: 'Bismuth', weight: 208.98, category: 'post-transition-metal', col: 15, row: 6 },
    { position: 84, symbol: 'Po', name: 'Polonium', weight: 209, category: 'post-transition-metal', col: 16, row: 6 },
    { position: 85, symbol: 'At', name: 'Astatine', weight: 210, category: 'halogen', col: 17, row: 6 },
    { position: 86, symbol: 'Rn', name: 'Radon', weight: 222, category: 'noble-gas', col: 18, row: 6 },
    { position: 87, symbol: 'Fr', name: 'Francium', weight: 223, category: 'alkali-metal', col: 1, row: 7 },
    { position: 88, symbol: 'Ra', name: 'Radium', weight: 226, category: 'alkaline-earth-metal', col: 2, row: 7 },
    { position: 89, symbol: 'Ac', name: 'Actinium', weight: 227, category: 'actinide', col: 3, row: 10 },
    { position: 90, symbol: 'Th', name: 'Thorium', weight: 232.04, category: 'actinide', col: 4, row: 10 },
    { position: 91, symbol: 'Pa', name: 'Protactinium', weight: 231.04, category: 'actinide', col: 5, row: 10 },
    { position: 92, symbol: 'U', name: 'Uranium', weight: 238.03, category: 'actinide', col: 6, row: 10 },
    { position: 93, symbol: 'Np', name: 'Neptunium', weight: 237, category: 'actinide', col: 7, row: 10 },
    { position: 94, symbol: 'Pu', name: 'Plutonium', weight: 244, category: 'actinide', col: 8, row: 10 },
    { position: 95, symbol: 'Am', name: 'Americium', weight: 243, category: 'actinide', col: 9, row: 10 },
    { position: 96, symbol: 'Cm', name: 'Curium', weight: 247, category: 'actinide', col: 10, row: 10 },
    { position: 97, symbol: 'Bk', name: 'Berkelium', weight: 247, category: 'actinide', col: 11, row: 10 },
    { position: 98, symbol: 'Cf', name: 'Californium', weight: 251, category: 'actinide', col: 12, row: 10 },
    { position: 99, symbol: 'Es', name: 'Einsteinium', weight: 252, category: 'actinide', col: 13, row: 10 },
    { position: 100, symbol: 'Fm', name: 'Fermium', weight: 257, category: 'actinide', col: 14, row: 10 },
    { position: 101, symbol: 'Md', name: 'Mendelevium', weight: 258, category: 'actinide', col: 15, row: 10 },
    { position: 102, symbol: 'No', name: 'Nobelium', weight: 259, category: 'actinide', col: 16, row: 10 },
    { position: 103, symbol: 'Lr', name: 'Lawrencium', weight: 262, category: 'actinide', col: 17, row: 10 },
    { position: 104, symbol: 'Rf', name: 'Rutherfordium', weight: 267, category: 'transition-metal', col: 4, row: 7 },
    { position: 105, symbol: 'Db', name: 'Dubnium', weight: 270, category: 'transition-metal', col: 5, row: 7 },
    { position: 106, symbol: 'Sg', name: 'Seaborgium', weight: 271, category: 'transition-metal', col: 6, row: 7 },
    { position: 107, symbol: 'Bh', name: 'Bohrium', weight: 270, category: 'transition-metal', col: 7, row: 7 },
    { position: 108, symbol: 'Hs', name: 'Hassium', weight: 277, category: 'transition-metal', col: 8, row: 7 },
    { position: 109, symbol: 'Mt', name: 'Meitnerium', weight: 276, category: 'transition-metal', col: 9, row: 7 },
    { position: 110, symbol: 'Ds', name: 'Darmstadtium', weight: 281, category: 'transition-metal', col: 10, row: 7 },
    { position: 111, symbol: 'Rg', name: 'Roentgenium', weight: 282, category: 'transition-metal', col: 11, row: 7 },
    { position: 112, symbol: 'Cn', name: 'Copernicium', weight: 285, category: 'transition-metal', col: 12, row: 7 },
    { position: 113, symbol: 'Nh', name: 'Nihonium', weight: 286, category: 'post-transition-metal', col: 13, row: 7 },
    { position: 114, symbol: 'Fl', name: 'Flerovium', weight: 289, category: 'post-transition-metal', col: 14, row: 7 },
    { position: 115, symbol: 'Mc', name: 'Moscovium', weight: 290, category: 'post-transition-metal', col: 15, row: 7 },
    { position: 116, symbol: 'Lv', name: 'Livermorium', weight: 293, category: 'post-transition-metal', col: 16, row: 7 },
    { position: 117, symbol: 'Ts', name: 'Tennessine', weight: 294, category: 'halogen', col: 17, row: 7 },
    { position: 118, symbol: 'Og', name: 'Oganesson', weight: 294, category: 'noble-gas', col: 18, row: 7 }
  ]);
  public hintList = signal([
    { color : '' , category : 'All' },
    { color: 'rgb(0, 96, 240)', category: 'nonmetal' },
    { color: '#cd1d5e', category: 'noble-gas' },
    { color: 'rgb(0, 117, 140)', category: 'alkali-metal' },
    { color: '#f1c40f', category: 'alkaline-earth-metal' },
    { color: '#945700', category: 'metalloid' },
    { color: '#032356', category: 'halogen' },
    { color: '#002c00', category: 'post-transition-metal' },
    { color: '#6232ec', category: 'transition-metal' },
    { color: '#003355', category: 'lanthanide' },
    { color: '#c73200', category: 'actinide' }
  ]);

  public hintOpen = signal(false);
  public selectedElement = signal<PeriodicElement|null>(null)

  showElementDetail(element:PeriodicElement){
    this.selectedElement.set(element);
    this.elementDetailDialog()?.nativeElement.showModal();
  }
}
