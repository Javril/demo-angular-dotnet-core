import { Component, ChangeDetectionStrategy, Input, OnInit, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { IUser } from 'src/app/models/IUser';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, OnChanges {

  @Input() user: IUser;

  tabs: any[] = [];

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    const user = changes.user.currentValue;
    this.tabs = [
      { title: `About ${user ? user.knownAs : ''}`, content: `${user ? user.introduction : ''}` },
      { title: 'Interests', content: `${user ? user.interests : ''}` },
      { title: 'Photos', content: 'Photos go here' }
    ];
  }
}
