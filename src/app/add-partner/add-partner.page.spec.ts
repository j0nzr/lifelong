import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPartnerPage } from './add-partner.page';

describe('AddPartnerPage', () => {
  let component: AddPartnerPage;
  let fixture: ComponentFixture<AddPartnerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPartnerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPartnerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
