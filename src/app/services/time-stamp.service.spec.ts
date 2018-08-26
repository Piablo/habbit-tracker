import { TestBed, inject } from '@angular/core/testing';

import { TimeStampService } from './time-stamp.service';

describe('TimeStampService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimeStampService]
    });
  });

  it('should be created', inject([TimeStampService], (service: TimeStampService) => {
    expect(service).toBeTruthy();
  }));
});
