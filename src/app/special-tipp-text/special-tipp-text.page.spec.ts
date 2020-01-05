import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialTippTextPage } from './special-tipp-text.page';

describe('SpecialTippTextPage', () => {
  let component: SpecialTippTextPage;
  let fixture: ComponentFixture<SpecialTippTextPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialTippTextPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialTippTextPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
