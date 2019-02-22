import { TestBed } from '@angular/core/testing';

import { SlideMenuService } from './slide-menu.service';

describe('SlideMenuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SlideMenuService = TestBed.get(SlideMenuService);
    expect(service).toBeTruthy();
  });
});
