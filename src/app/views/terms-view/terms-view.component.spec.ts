import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsViewComponent } from './terms-view.component';

describe('TermsViewComponent', () => {
  let component: TermsViewComponent;
  let fixture: ComponentFixture<TermsViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermsViewComponent]
    });
    fixture = TestBed.createComponent(TermsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
