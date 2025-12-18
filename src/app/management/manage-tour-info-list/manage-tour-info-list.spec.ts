import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTourInfoList } from './manage-tour-info-list';

describe('ManageTourInfoList', () => {
  let component: ManageTourInfoList;
  let fixture: ComponentFixture<ManageTourInfoList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageTourInfoList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageTourInfoList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
