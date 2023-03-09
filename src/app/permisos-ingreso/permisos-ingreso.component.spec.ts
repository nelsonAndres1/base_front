import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermisosIngresoComponent } from './permisos-ingreso.component';

describe('PermisosIngresoComponent', () => {
  let component: PermisosIngresoComponent;
  let fixture: ComponentFixture<PermisosIngresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermisosIngresoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermisosIngresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
