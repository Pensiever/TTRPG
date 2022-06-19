import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TTRPG';
  display : boolean;
  items: MenuItem[];
  searchValue: string = null;

  Clear() {
    this.searchValue = '';
  }
}
