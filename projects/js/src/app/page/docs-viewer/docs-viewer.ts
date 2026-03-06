import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { MarkdownProcessorService } from '../../shared/services/markdown-processor.service';

@Component({
  selector: 'app-docs-viewer',
  templateUrl: './docs-viewer.html',
  styleUrl: './docs-viewer.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocsViewerComponent {
  private readonly markdownProcessor = inject(MarkdownProcessorService);
  private readonly activatedRoute = inject(ActivatedRoute);

  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);
  protected readonly renderedHtml = signal('');
  protected readonly currentDoc = signal('');

  constructor(){
    this.activatedRoute.paramMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      const docId = this.normalizeDocId(params.get('docId'));
      void this.loadDoc(docId);
    });
  }

  private async loadDoc(docId: string | null): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    this.renderedHtml.set('');

    if (!docId) {
      this.error.set('Invalid document path.');
      this.loading.set(false);
      return;
    }

    this.currentDoc.set(docId);

    try {
      const response = await fetch(`/${docId}.md`);

      if (!response.ok) {
        throw new Error(
          `Unable to load markdown file "${docId}.md" (status ${response.status})`
        );
      }

      const markdown = await response.text();
      const parsed = this.markdownProcessor.parse(markdown);

      this.renderedHtml.set(parsed.html);
    } catch (error: unknown) {
      this.error.set(error instanceof Error ? error.message : 'Unable to load markdown content.');
    } finally {
      this.loading.set(false);
    }
  }

  private normalizeDocId(rawDocId: string | null): string | null {
    if (!rawDocId) {
      return null;
    }

    const normalized = rawDocId.trim().toLowerCase();
    return /^[a-z0-9-]+$/.test(normalized) ? normalized : null;
  }
}
