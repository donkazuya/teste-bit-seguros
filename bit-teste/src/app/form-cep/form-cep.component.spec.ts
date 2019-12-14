import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCepComponent } from './form-cep.component';

describe('FormCepComponent', () => {
  let component: FormCepComponent;
  let fixture: ComponentFixture<FormCepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
