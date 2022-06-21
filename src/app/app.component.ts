import { Component } from '@angular/core';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { Quester } from './models/quester/quester.model';
import { QuesterService } from './services/quester.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TTRPG';
  display : boolean;
  items: MenuItem[];
  searchInput: string = null;
  contact : string
  contactList : string[] = []

  Clear() {
    this.searchInput = '';
  }
  constructor(
    private primengConfig: PrimeNGConfig,
    private _service : QuesterService
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
    this._service.getAllQuesters().subscribe((data : Quester[]) => {
      data.forEach(quester => {
        this.contact = quester.username
        this.contactList.push(this.contact)
      });
    })
  }
}
