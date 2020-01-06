import { TestBed, async, ComponentFixture, getTestBed, inject } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiservicesService } from '../app/service/apiservices.service';
import { Observable, throwError } from 'rxjs';
import { of } from 'rxjs';
import { Bar } from './bar';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let apiService: ApiservicesService;
  let componentService: ApiservicesService;

  beforeEach(async(() => {
    let injector;
    class MockApiService {
      res = {
        buttons: [10, 38, -13, -18],
        bars: [62, 45, 62],
        limit: 230
      };

      getData() {
        return of(this.res);
      }
    }
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: ApiservicesService, useValue: MockApiService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    injector = getTestBed();
    apiService = injector.get(ApiservicesService);
    // apiService = TestBed.get(ApiservicesService);

    // create component and test fixture
    fixture = TestBed.createComponent(AppComponent);
    // get test component from the fixture
    component = fixture.componentInstance;

    // ApiservicesService provided to Component, (should return MockApiService)
    componentService = fixture.debugElement.injector.get(ApiservicesService);
  }));


  it('should create the app', async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));


  it(`should have as title 'Welcome to Progress Bar!'`, () => {
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Welcome to Progress Bar!');
  });


  it('Service injected via inject(...) and TestBed.get(...) should be the same instance',
    inject([ApiservicesService], (injectService: ApiservicesService) => {
      expect(injectService).toBe(apiService);
    })
  );

});
