import { TestBed } from '@angular/core/testing';

import { OnlineDBService } from './online-db.service';

describe('OnlineDBService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OnlineDBService = TestBed.get(OnlineDBService);
    expect(service).toBeTruthy();
  });
});
