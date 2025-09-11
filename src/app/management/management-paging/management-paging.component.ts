import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-management-paging',
  templateUrl: './management-paging.component.html',
  styleUrls: ['./management-paging.component.scss'],
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManagementPagingComponent implements OnChanges {
  /** ورودی‌ها */
  @Input() pageNumber = 1;            // صفحه جاری (1-based)
  @Input() pageSize = 10;             // تعداد آیتم در هر صفحه
  @Input() totalCount = 0;            // تعداد کل آیتم‌ها (از سرور)
  @Input() maxPagesToShow = 1;        // حداکثر تعداد دکمه‌های صفحه که نمایش داده میشه (به جز first/last)

  /** خروجی */
  @Output() pageChange = new EventEmitter<number>();

  /** آرایه‌ای که template استفاده می‌کنه — شامل عدد یا رشته '...' */
  pages: Array<number | '...'> = [];

  ngOnChanges(changes: SimpleChanges) {
    this.recalc();
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.totalCount / this.pageSize));
  }

  private recalc() {
    const total = this.totalPages;
    const max = Math.max(6, this.maxPagesToShow);
    const current = Math.min(Math.max(1, this.pageNumber), total);

    // اگر تعداد صفحات کم است: همه را نشان بده
    if (total <= max) {
      this.pages = Array.from({ length: total }, (_, i) => i + 1);
      return;
    }

    const shown = max - 2; // تعداد دکمه‌های وسطی که می‌تونیم نمایش بدیم (بدون اول و آخر)

    // پنجرهٔ وسطی را حول current بساز
    let start = Math.max(2, current - Math.floor(shown / 2));
    let end = Math.min(total - 1, start + shown - 1);

    // ممکن است انتها محدود شده باشد -> دوباره سعی کن تا طول پنجره درست شود
    if (end - start + 1 < shown) {
      start = Math.max(2, end - shown + 1);
    }

    // ---------- اینجا: رفتار "لغزش" را اضافه می‌کنیم ----------
    // اگر کاربر روی آخرین صفحهٔ پنجرهٔ وسطی است (یعنی دقیقا قبل از '...') و هنوز صفحهٔ بعدی وجود دارد
    // پنجره را یک واحد به راست جابجا کن تا صفحه بعدی قابل رویت و کلیک باشد.
    if (current === end && end < total - 1) {
      // تلاش کن یک واحد جلو بروی، ولی از حد بالا عبور نکن
      const maxStart = Math.max(2, total - shown); // بیشینه مقدار start که end = total-1 شود
      start = Math.min(start + 1, maxStart);
      end = Math.min(total - 1, start + shown - 1);
    }

    // مشابه: اگر کاربر روی اولین صفحهٔ پنجرهٔ وسطی است و صفحهٔ قبلی وجود دارد
    // پنجره را یک واحد به چپ جابجا کن تا صفحهٔ قبلی قابل رویت شود.
    if (current === start && start > 2) {
      start = Math.max(2, start - 1);
      end = Math.min(total - 1, start + shown - 1);
    }

    // اگر بعد از جابجایی طول پنجره کمتر از shown شد، دوباره اصلاح کن
    if (end - start + 1 < shown) {
      start = Math.max(2, end - shown + 1);
      end = Math.min(total - 1, start + shown - 1);
    }
    // ---------------------------------------------------------

    const pages: Array<number | '...'> = [1];

    if (start > 2) pages.push('...');

    for (let p = start; p <= end; p++) pages.push(p);

    if (end < total - 1) pages.push('...');

    pages.push(total);

    this.pages = pages;
  }


  goTo(page: number) {
    if (page === this.pageNumber) return;
    if (page < 1 || page > this.totalPages) return;
    this.pageNumber = page;
    this.recalc();
    this.pageChange.emit(this.pageNumber);
  }

  prev() {
    if (this.pageNumber > 1) this.goTo(this.pageNumber - 1);
  }

  next() {
    if (this.pageNumber < this.totalPages) this.goTo(this.pageNumber + 1);
  }

  first() { this.goTo(1); }
  last() { this.goTo(this.totalPages); }
}
