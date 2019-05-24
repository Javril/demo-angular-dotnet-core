import { Component, OnInit } from '@angular/core';
import { ValuesService } from '../serveices/values/values.service';
import { Observable } from 'rxjs';
import { IValue } from './IValue';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.scss']
})
export class ValueComponent implements OnInit {

  values: Observable<{values: IValue[]}>;

  valueList: any;

  constructor(
    private valuesService: ValuesService,
    private store: Store<{valueList: {values: IValue[]}}>
  ) { }

  ngOnInit() {
    this.values = this.store.select('valueList');
    // this.values.subscribe(res => {
    //   this.valueList = res.values;
    //   console.log(res.values);
    // });

    // this.valuesService.getValues()
    //   .subscribe(
    //     response => {
    //       this.values = response;
    //     },
    //     error => {
    //       console.log(error);
    //     }
    //   );
  }

}
