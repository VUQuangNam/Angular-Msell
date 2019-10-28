import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsPackageComponent } from './news-package.component';

describe('NewsPackageComponent', () => {
  let component: NewsPackageComponent;
  let fixture: ComponentFixture<NewsPackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
