import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChamadosList } from './chamados-list';

describe('ChamadosList', () => {
  let component: ChamadosList;
  let fixture: ComponentFixture<ChamadosList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChamadosList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChamadosList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
