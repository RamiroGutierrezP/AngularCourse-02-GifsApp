import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/interface';


@Injectable({
  providedIn: 'root'
})

export class GifsService {
  
  private apiKey: string = '5mZTTeuzKjBsXQS42hqD6sZnEQtVFkxF';
  private _historial: string[] = [];
  private url: string = 'https://api.giphy.com/v1/gifs';

  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor ( private http: HttpClient ){
    
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [] ;
    this.resultados = JSON.parse(localStorage.getItem('resultados')!)|| [] ;
     
  }

  buscarGifs( query: string ) {

    query = query.trim().toLocaleLowerCase();

    if ( !this._historial.includes( query )){
      this._historial.unshift ( query );
      this._historial = this._historial.slice(0,9);
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }
    
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', query)
      .set('limit', 10);
    
    this.http.get<SearchGifsResponse>(`${this.url}/search`, { params })
      .subscribe ( resp => {
        console.log( resp.data );
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      })
    }
}
