import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CobranzaListComponent } from './cobranza-list.component';

describe('CobranzaListComponent', () => {
  let component: CobranzaListComponent;
  let fixture: ComponentFixture<CobranzaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CobranzaListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CobranzaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
