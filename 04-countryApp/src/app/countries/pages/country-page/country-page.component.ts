import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit {

  public country?: Country; //Nulo en el momento de inicializarse

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private CountriesService: CountriesService,
  ) { }


  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.CountriesService.searchCountryByAlphaCode(id)),
      )
      .subscribe(country => {
        if (!country) {
          return this.router.navigateByUrl('');
        }

        return this.country = country;


      });
  }

}




