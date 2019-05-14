import { Component, OnInit } from '@angular/core';
import { ValuesService } from '../serveices/values/values.service';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.scss']
})
export class ValueComponent implements OnInit {

  values: any;

  constructor(private valuesService: ValuesService) { }

  ngOnInit() {
    this.valuesService.getValues()
      .subscribe(
        response => {
          this.values = response;
        },
        error => {
          console.log(error);
        }
    )
  }

}
