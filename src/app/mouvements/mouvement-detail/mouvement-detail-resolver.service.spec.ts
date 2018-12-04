import { TestBed } from '@angular/core/testing';

import { MouvementDetailResolverService } from './mouvement-detail-resolver.service';

describe('MouvementDetailResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MouvementDetailResolverService = TestBed.get(MouvementDetailResolverService);
    expect(service).toBeTruthy();
  });
});
