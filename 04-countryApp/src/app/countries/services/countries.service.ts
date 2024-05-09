import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, count, map, of } from 'rxjs';
import { Country } from '../interfaces/country';


@Injectable({ providedIn: 'root' })
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) { }



  searchCountryByAlphaCode(code: string): Observable<Country | null> {
    const url = `${this.apiUrl}/alpha/${code}`;
    return this.http.get<Country[]>(url)
      .pipe(
        map(countries => countries.length > 0 ? countries[0] : null),
        catchError(error => of(null))
      );
  }


  /*El retorno es un Observable, de un arreglo de paises, por tanto hay que
  decirselo al get tambien, si no da error*/
  searchCapital(term: string): Observable<Country[]> {
    //Mas fácil de leer de esta manera el codigo de abajo
    const url = `${this.apiUrl}/capital/${term}`;
    return this.http.get<Country[]>(url)
      .pipe(
        catchError(error => of([]))
      );
  }

  searchCountry(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/translation/${term}`;
    return this.http.get<Country[]>(url)
      .pipe(
        catchError(error => of([]))
      );
  }

  searchRegion(region: string): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${region}`;
    return this.http.get<Country[]>(url)
      .pipe(
        catchError(error => of([]))
      );
  }
}