import { Injectable } from '@angular/core';

export interface DocSection {
  id: string;
  title: string;
  level: 1 | 2 | 3;
}

export interface MarkdownParseResult {
  html: string;
  sections: DocSection[];
  pageTitle: string;
}

@Injectable({
  providedIn: 'root'
})
export class MarkdownProcessorService {
  parse(markdown: string): MarkdownParseResult {
    const lines = markdown.split(/\r?\n/);
    const htmlParts: string[] = [];
    const sections: DocSection[] = [];

    const slugCounter = new Map<string, number>();

    let inCodeBlock = false;
    let inList = false;
    let listTag: 'ul' | 'ol' | null = null;
    let inTable = false;
    let pageTitle = '';

    const closeList = (): void => {
      if (inList && listTag) {
        htmlParts.push(`</${listTag}>`);
      }
      inList = false;
      listTag = null;
    };

    const closeTable = (): void => {
      if (inTable) {
        htmlParts.push('</tbody></table>');
      }
      inTable = false;
    };

    for (let index = 0; index < lines.length; index += 1) {
      const rawLine = lines[index];
      const line = rawLine.trimEnd();
      const clean = line.trim();
      const nextLine = index + 1 < lines.length ? lines[index + 1].trim() : '';

      if (clean.startsWith('```')) {
        closeList();
        closeTable();
        if (!inCodeBlock) {
          inCodeBlock = true;
          htmlParts.push('<pre class="md-pre"><code class="md-code-block">');
        } else {
          inCodeBlock = false;
          htmlParts.push('</code></pre>');
        }
        continue;
      }

      if (inCodeBlock) {
        htmlParts.push(`${this.escapeHtml(rawLine)}\n`);
        continue;
      }

      if (!clean) {
        closeList();
        closeTable();
        continue;
      }

      const isTableHeader = this.isTableRow(clean) && this.isTableSeparator(nextLine);
      if (isTableHeader) {
        closeList();
        closeTable();

        const headerCells = this.parseTableCells(clean);
        htmlParts.push(
          `<table class="md-table"><thead class="md-thead"><tr class="md-tr">${headerCells
            .map((cell) => `<th class="md-th">${this.renderInline(cell)}</th>`)
            .join('')}</tr></thead><tbody class="md-tbody">`
        );
        inTable = true;
        index += 1;
        continue;
      }

      if (inTable && this.isTableRow(clean)) {
        const cells = this.parseTableCells(clean);
        htmlParts.push(
          `<tr class="md-tr">${cells
            .map((cell) => `<td class="md-td">${this.renderInline(cell)}</td>`)
            .join('')}</tr>`
        );
        continue;
      }

      closeTable();

      const orderedMatch = clean.match(/^(\d+)\.\s+(.*)$/);
      const unorderedMatch = clean.match(/^[-*]\s+(.*)$/);

      if (orderedMatch) {
        if (!inList || listTag !== 'ol') {
          closeList();
          inList = true;
          listTag = 'ol';
          htmlParts.push('<ol class="md-ol">');
        }
        htmlParts.push(`<li class="md-li">${this.renderInline(orderedMatch[2])}</li>`);
        continue;
      }

      if (unorderedMatch) {
        if (!inList || listTag !== 'ul') {
          closeList();
          inList = true;
          listTag = 'ul';
          htmlParts.push('<ul class="md-ul">');
        }
        htmlParts.push(`<li class="md-li">${this.renderInline(unorderedMatch[1])}</li>`);
        continue;
      }

      closeList();

      const headingMatch = clean.match(/^(#{1,3})\s+(.+)$/);
      if (headingMatch) {
        const level = headingMatch[1].length as 1 | 2 | 3;
        const headingText = headingMatch[2].trim();
        const slug = this.makeSlug(headingText, slugCounter);

        htmlParts.push(
          `<h${level} id="${slug}" class="md-h${level}">${this.renderInline(headingText)}</h${level}>`
        );
        sections.push({ id: slug, title: headingText, level });

        if (!pageTitle && level === 1) {
          pageTitle = headingText;
        }
        continue;
      }

      htmlParts.push(`<p class="md-p">${this.renderInline(clean)}</p>`);
    }

    closeList();
    closeTable();

    if (inCodeBlock) {
      htmlParts.push('</code></pre>');
    }

    return {
      html: htmlParts.join(''),
      sections,
      pageTitle
    };
  }

  private isTableRow(line: string): boolean {
    const clean = line.trim();
    if (!clean.includes('|')) {
      return false;
    }

    return this.parseTableCells(clean).length > 1;
  }

  private isTableSeparator(line: string): boolean {
    const cells = this.parseTableCells(line);
    if (cells.length < 2) {
      return false;
    }

    return cells.every((cell) => /^:?-{3,}:?$/.test(cell));
  }

  private parseTableCells(line: string): string[] {
    const noStartPipe = line.startsWith('|') ? line.slice(1) : line;
    const noEdgePipes = noStartPipe.endsWith('|') ? noStartPipe.slice(0, -1) : noStartPipe;

    return noEdgePipes.split('|').map((cell) => cell.trim());
  }

  private makeSlug(text: string, slugCounter: Map<string, number>): string {
    const base = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');

    const safeBase = base || 'section';
    const currentCount = slugCounter.get(safeBase) ?? 0;
    slugCounter.set(safeBase, currentCount + 1);

    return currentCount === 0 ? safeBase : `${safeBase}-${currentCount + 1}`;
  }

  private renderInline(text: string): string {
    const escaped = this.escapeHtml(text);

    return escaped
      .replace(/`([^`]+)`/g, '<code class="md-code-inline">$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong class="md-strong">$1</strong>')
      .replace(
        /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
        '<a class="md-link" href="$2" target="_blank" rel="noopener">$1</a>'
      );
  }

  private escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
}
