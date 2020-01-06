import { TestBed } from '@angular/core/testing';

import { ApiservicesService } from './apiservices.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { Bar } from '../bar';

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

  it('should retrive value from API via GET ', () => {
    const expectedValue: Bar[] =
      [{ buttons: [10, 38, -13, -18], bars: [62, 45, 62], limit: 230 }];


    service.getData().subscribe(
      response => {
        expect(response.length).toBe(1);
        expect(response).toEqual(expectedValue);
      }
    );

    const request = httpTestingController.expectOne(`${service.url}`);
    expect(request.request.method).toBe('GET');

    request.flush(expectedValue);
  });
});
