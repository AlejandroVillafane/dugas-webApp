import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendicionFormComponent } from './rendicion-form.component';

describe('RendicionFormComponent', () => {
  let component: RendicionFormComponent;
  let fixture: ComponentFixture<RendicionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RendicionFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RendicionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
