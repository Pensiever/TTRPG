import { TestBed } from '@angular/core/testing';

import { QuesterService } from './quester.service';

describe('QuesterService', () => {
  let service: QuesterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuesterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
