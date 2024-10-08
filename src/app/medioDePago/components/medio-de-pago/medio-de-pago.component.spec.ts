import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedioDePagoComponent } from './medio-de-pago.component';

describe('MedioDePagoComponent', () => {
  let component: MedioDePagoComponent;
  let fixture: ComponentFixture<MedioDePagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedioDePagoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MedioDePagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
