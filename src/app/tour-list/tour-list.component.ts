import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { TourOrderFilter, TourPaginationFilter } from '../Models/Tour/TourPaginationFilter';
import { PluginNotifyService } from '../services/plugin-notify.service';
import { TourService } from '../services/TourService';
import { BasePaginationFilter } from '../Models/BasePaginationFilter';
import { TourList } from '../Models/Tour/TourList';
import { HttpClientModule } from '@angular/common/http';
import { PluginInitializer } from '../services/plugin-initializer';

@Component({
  selector: 'app-tour-list',
  imports: [HttpClientModule],
  templateUrl: './tour-list.component.html',
  styleUrls: ['./tour-list.component.scss'],
  providers: [TourService, PluginInitializer]
})
export class TourListComponent implements OnInit {

  BasePaginationFilter: BasePaginationFilter<TourPaginationFilter> = new BasePaginationFilter<TourPaginationFilter>();
  tourOrderFilterEnum = TourOrderFilter;
  TourPaginationFilter: TourPaginationFilter = new TourPaginationFilter()
  TourList: TourList[] = [];
  constructor(private el: ElementRef, private renderer: Renderer2, private pluginNotifyService: PluginNotifyService,
    private tourService: TourService, private PluginInitializer: PluginInitializer
  ) {
  }

  @ViewChild('orderSelect', { static: true }) orderSelectRef!: ElementRef<HTMLSelectElement>;
  ngOnInit() {
    this.pluginNotifyService.pluginInitialized$.subscribe(() => {
      debugger
      this.importClickEvent();
      this.BindTourListPagination();

    });

  }
  ngAfterViewInit() {

  }
  BindTourListPagination() {
    this.tourService.GetWithPagination(this.BasePaginationFilter).subscribe(response => {
      if (!response.succcess) {
        console.log(response.Message);
        return;
      }
      this.TourList = response.Data || [];
      (setTimeout(() => {
        this.PluginInitializer.initAOS(true);
      }, 100));
      console.log(this.TourList);
      console.log(response)
    }, (e) => {

    })
  }

  importClickEvent() {
    debugger
    const lis = this.el.nativeElement.querySelectorAll('div.search-order-select ul li');
    lis.forEach((li: HTMLElement) => {
      this.renderer.listen(li, 'click', () => {
        const dataValue = li.getAttribute('data-value');
        this.onOrderChange(dataValue);
      });
    });
  }
  getEnumEntriestourOrder(): { key: string; value: number }[] {
    return Object.entries(this.tourOrderFilterEnum)
      .filter(([key, value]) => typeof value === 'number')
      .map(([key, value]) => ({ key, value: value as number }));
  }
  onOrderChange(value: string | null) {
    debugger
    switch (value) {
      case "1":
        this.TourPaginationFilter.tourOrderFilter = TourOrderFilter.HighToLowPrice;
        break;
      case "2":
        this.TourPaginationFilter.tourOrderFilter = TourOrderFilter.LowToHighPrice;

        break;
      case "3":
        this.TourPaginationFilter.tourOrderFilter = TourOrderFilter.Newest;

        break;
      case "4":
        this.TourPaginationFilter.tourOrderFilter = TourOrderFilter.Oldest;
        break;

      default:
        this.TourPaginationFilter.tourOrderFilter = null;
        break;
    }
    this.BasePaginationFilter.Filters = this.TourPaginationFilter;
    this.BindTourListPagination();
  }

}
