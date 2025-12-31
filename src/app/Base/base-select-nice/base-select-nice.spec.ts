import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseSelectNice } from './base-select-nice';

describe('BaseSelectNice', () => {
  let component: BaseSelectNice;
  let fixture: ComponentFixture<BaseSelectNice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseSelectNice]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseSelectNice);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
