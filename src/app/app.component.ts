import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService]
})
export class AppComponent {
  title = 'country-and-state';
  value: any
  countries: any = []
  states: any = []
  countryName: any = '';
  stateName: any = ''
  selectedCountry: any = '';
  clonedCountries: { [s: string]: any } = {};
  constructor(private messageService: MessageService) {


  }
  addCountry() {
    if (this.countryName == '') {
      this.messageService.add({ severity: 'info', summary: 'Country Name', detail: 'Please Add Country Name' });
    } else {
      if (this.countries.length > 0 ? this.countries.filter((x: any) => x.cName == this.countryName.trim()).length > 0 : false) {
        this.messageService.add({ severity: 'info', summary: 'Same Country', detail: 'State Country Exist.' });
      } else {
        this.countries.push({ id: this.countries.length + 1, cName: this.countryName });
        this.countryName = '';
      }

    }
  }
  addState() {
    if (this.selectedCountry == '' || this.stateName == '') {
      this.messageService.add({ severity: 'info', summary: 'Country And State', detail: 'Please Add Country And State' });
    } else {
      if (this.states.length > 0 ? this.states.filter((x: any) => x.sName == this.stateName.trim()).length > 0 : false) {
        this.messageService.add({ severity: 'info', summary: 'Same State', detail: 'State Already Exist.' });
      } else {
        this.states.push({ id: this.states.length + 1, cName: this.selectedCountry, sName: this.stateName });
        this.selectedCountry = '';
        this.stateName = '';
      }
    }
  }
  removeCountry(index: any) {
    this.countries.splice(index, 1)
    if (this.countries.length == 0) {
      this.states = [];
    }
  }
  removeState(index: any) {
    this.states.splice(index, 1)
  }
  onRowEditInit(countries: any) {
    this.clonedCountries[countries.id as string] = { ...countries };
  }
  onRowEditCancel(countries: any, index: number) {
    this.countries[index] = this.clonedCountries[countries.id as string];
    delete this.clonedCountries[countries.id as string];
  }
}
