import { TestBed } from '@angular/core/testing';

import { ControlStockService } from './control-stock.service';

describe('ControlStockService', () => {
  let service: ControlStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlStockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
