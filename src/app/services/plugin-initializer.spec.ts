import { TestBed } from '@angular/core/testing';

import { PluginInitializer } from './plugin-initializer';

describe('PluginInitializer', () => {
  let service: PluginInitializer;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PluginInitializer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
