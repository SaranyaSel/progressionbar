import { Component, OnInit } from '@angular/core';
import { ApiservicesService } from './service/apiservices.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorMsg } from './errorMsg';
import { Observable } from 'rxjs';
import { Bar } from './bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string;
  result: any;
  buttons: number[];
  bars: number[];
  limit: number;
  barForm: FormGroup;
  inputArrayBar: any;
  currentBar: number;
  selectStyle: string;
  errorMsg = new ErrorMsg();
  constructor(private apiService: ApiservicesService) {
    this.title = 'Progress Bar';
  }
  ngOnInit() {
    this.getBarData();
    this.barForm = new FormGroup({
      selectedbar: new FormControl('', Validators.required)
    });
  }

  getBarData(): void {
    this.apiService.getData().subscribe(
      (response) => {
        // console.log(response);
        this.result = response;
        this.buttons = this.result.buttons;
        this.bars = this.result.bars;
        this.limit = this.result.limit;
        // console.log(this.buttons, this.bars, this.limit);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  onChange(event) {
    this.currentBar = event;
    console.log(event);
  }
  calculate(value) {
    let total;
    if (this.barForm.controls.selectedbar.value) {
      this.selectStyle = '';
      this.errorMsg.valid = true;
      this.errorMsg.message = '';
      this.errorMsg.type = 'selectedbar';
      total = this.bars[this.currentBar] + value;
      if (total >= 0) {
        this.bars[this.currentBar] = total;
        // if (this.bars[this.currentBar] >= this.limit) {
        //   console.log('condition triggers');
        // }
        // console.log(this.bars[this.currentBar], this.limit);
      }

    } else {
      // console.log(this.barForm.controls.selectedbar.status);
      if (this.barForm.controls.selectedbar.status === 'INVALID') {
        this.selectStyle = 'error-msg';
        this.errorMsg.valid = false;
        this.errorMsg.message = 'Please select which progression bar';
        this.errorMsg.type = 'selectedbar';
        // console.log('not selected');
      }
    }
  }
}
