import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VincularHorariosComponent } from './vincular-horarios.component';

describe('VincularHorariosComponent', () => {
  let component: VincularHorariosComponent;
  let fixture: ComponentFixture<VincularHorariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VincularHorariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VincularHorariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
