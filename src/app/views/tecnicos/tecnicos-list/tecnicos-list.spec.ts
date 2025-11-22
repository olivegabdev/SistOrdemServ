import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TecnicosList } from './tecnicos-list';

describe('TecnicosList', () => {
  let component: TecnicosList;
  let fixture: ComponentFixture<TecnicosList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TecnicosList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TecnicosList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
