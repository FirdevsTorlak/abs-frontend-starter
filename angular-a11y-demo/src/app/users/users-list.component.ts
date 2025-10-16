import { NgFor, NgIf } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UsersService } from './users.service';

@Component({
  standalone: true,
  selector: 'app-users-list',
  imports: [NgFor, NgIf, RouterLink, FormsModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {
  filterTerm = signal('');
  liveMessage = signal('');
  sortKey = signal<'name'|'email'|'role'|'active'>('name');
  sortDir = signal<1|-1>(1);

  users = computed(() => {
    const term = this.filterTerm();
    const base = term ? this.svc.filter(term) : this.svc.users();
    const key = this.sortKey(); const dir = this.sortDir();
    return [...base].sort((a: any, b: any) => (a[key] > b[key] ? dir : -dir));
  });

  constructor(private svc: UsersService) {
    effect(() => {
      const count = this.users().length;
      this.liveMessage.set(`${count} Ergebnisse`);
    });
  }

  setSort(key: 'name'|'email'|'role'|'active') {
    if (this.sortKey() === key) this.sortDir.update(d => (d === 1 ? -1 : 1));
    else this.sortKey.set(key);
  }

  onKeydownTable(event: KeyboardEvent) {
    const target = event.target as HTMLElement;
    const cell = target.closest('td,th') as HTMLElement | null;
    const row = cell?.parentElement;
    if (!cell || !row) return;
    const table = row.closest('table')!;
    const cells = Array.from(row.children) as HTMLElement[];
    const colIndex = cells.indexOf(cell);
    const rows = Array.from(table.querySelectorAll('tbody tr')) as HTMLElement[];
    const rowIndex = rows.indexOf(row as HTMLTableRowElement as any);

    let next: HTMLElement | null = null;
    switch (event.key) {
      case 'ArrowRight': next = cells[Math.min(colIndex + 1, cells.length - 1)]; break;
      case 'ArrowLeft':  next = cells[Math.max(colIndex - 1, 0)]; break;
      case 'ArrowDown':  next = (rows[Math.min(rowIndex + 1, rows.length - 1)]?.children[colIndex]) as HTMLElement; break;
      case 'ArrowUp':    next = (rows[Math.max(rowIndex - 1, 0)]?.children[colIndex]) as HTMLElement; break;
    }
    if (next) { (next as HTMLElement).focus(); event.preventDefault(); }
  }
}