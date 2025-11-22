import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TecnicosForm } from './tecnicos-form';

describe('TecnicosForm', () => {
  let component: TecnicosForm;
  let fixture: ComponentFixture<TecnicosForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TecnicosForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TecnicosForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
