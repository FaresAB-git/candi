import { Component } from '@angular/core';

interface NavItem {
  label: string;
  count?: number;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  mainNavItems: NavItem[] = [
    { label: 'Toutes mes candidatures' },
    { label: 'En cours', count: 6 },
    { label: 'Entretiens', count: 3 },
    { label: 'Archivées', count: 5 },
  ];

  outilsNavItems: NavItem[] = [
    { label: 'Mes CV' },
    { label: 'Adapter un CV' },
  ];

  activeItem = 'Toutes mes candidatures';
}
