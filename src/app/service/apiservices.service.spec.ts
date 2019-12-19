import { TestBed } from '@angular/core/testing';

import { ApiservicesService } from './apiservices.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

describe('ApiservicesService', () => {
  let httpTestingController: HttpTestingController;
  let service: ApiservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiservicesService],
      imports: [HttpClientTestingModule]
    });

    // We inject our service (which imports the HttpClient) and the Test Controller
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(ApiservicesService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
  it('should be created', () => {
    const checkservice: ApiservicesService = TestBed.get(ApiservicesService);
    expect(checkservice).toBeTruthy();
  });
});
