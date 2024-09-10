import { TestBed } from '@angular/core/testing';

import { AuthCommunicationService } from './auth-communication.service';

describe('AuthCommunicationService', () => {
  let service: AuthCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
