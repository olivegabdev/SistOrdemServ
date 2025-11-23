import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChamadosForm } from './chamados-form';

describe('ChamadosForm', () => {
  let component: ChamadosForm;
  let fixture: ComponentFixture<ChamadosForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChamadosForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChamadosForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
