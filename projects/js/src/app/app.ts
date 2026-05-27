import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

interface DocMenuItem {
  id: string;
  title: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  private readonly router = inject(Router);

  protected readonly isMenuOpen = signal(true);
  protected readonly searchQuery = signal('');
  protected readonly theme = signal<'light' | 'dark'>('light');
  protected readonly currentUrl = signal(this.router.url);

  protected readonly docs = signal<DocMenuItem[]>([
    { id: 'promise-all', title: 'Promise.all' },
    { id: 'async-await', title: 'Async and Await' },
    { id: 'event-loop', title: 'Event Loop' }
  ]);

  protected readonly filteredDocs = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();

    if (!query) {
      return this.docs();
    }

    return this.docs().filter((doc) =>
      `${doc.title} ${doc.id}`.toLowerCase().includes(query)
    );
  });

  protected readonly themeLabel = computed(() =>
    this.theme() === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
  );
  protected readonly isWriteScreen = computed(() => this.currentUrl().startsWith('/write'));
  protected readonly isLoginScreen = computed(() => this.currentUrl().startsWith('/login'));
  protected readonly isStandaloneScreen = computed(
    () => this.isWriteScreen() || this.isLoginScreen()
  );
  protected readonly standaloneTitle = computed(() => (this.isWriteScreen() ? 'Write' : 'Login'));

  constructor() {
    this.router.events.pipe(takeUntilDestroyed()).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.set(event.urlAfterRedirects);
      }
    });
  }

  protected toggleMenu(): void {
    this.isMenuOpen.update((isOpen) => !isOpen);
  }

  protected closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  protected toggleTheme(): void {
    this.theme.update((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
  }

  protected onSearch(event: Event): void {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) {
      return;
    }

    this.searchQuery.set(target.value);
  }
}
