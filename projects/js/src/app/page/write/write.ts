import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MarkdownProcessorService } from '../../shared/services/markdown-processor.service';

@Component({
  selector: 'app-write',
  templateUrl: './write.html',
  styleUrl: './write.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WriteComponent {
  private readonly markdownProcessor = inject(MarkdownProcessorService);

  protected readonly markdown = signal(`# New Document\n\nStart writing your markdown here.\n\n## Section\n\n- Item 1\n- Item 2`);
  protected readonly submitMessage = signal('');

  protected readonly previewHtml = computed(() => this.markdownProcessor.parse(this.markdown()).html);

  protected onMarkdownInput(event: Event): void {
    const target = event.target;
    if (!(target instanceof HTMLTextAreaElement)) {
      return;
    }

    this.markdown.set(target.value);
    this.submitMessage.set('');
  }

  protected submit(): void {
    localStorage.setItem('write-draft-markdown', this.markdown());
    this.submitMessage.set('Draft submitted successfully.');
  }
}
