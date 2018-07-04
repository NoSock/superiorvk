import { TestBed, inject } from '@angular/core/testing';

import { AuthTransportService } from './auth-transport.service';

describe('AuthTransportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthTransportService]
    });
  });

  it('should be created', inject([AuthTransportService], (service: AuthTransportService) => {
    expect(service).toBeTruthy();
  }));
});
