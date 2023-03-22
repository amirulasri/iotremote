import { TestBed } from '@angular/core/testing';

import { TurnonstateService } from './turnonstate.service';

describe('TurnonstateService', () => {
  let service: TurnonstateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TurnonstateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
