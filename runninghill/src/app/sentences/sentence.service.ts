/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import environment from '../../enviroment/enviroment';
import { WordTypes } from './sentences.interface';

@Injectable({
  providedIn: 'root',
})
export class SentenceService {
  constructor(private httpClient: HttpClient) { }

  public getWordTypes = (): Observable<WordTypes> => this.httpClient.get<WordTypes>(
    `${environment.apiUrl}runninghillapi/sentenceroutes/wordtype`,
    { observe: 'response' },
  ).pipe(
    map((res: any) => {
      if (!res.body.response) {
        throw new Error('No response in body');
      }
      return res;
    }),
    catchError((err: HttpErrorResponse) => { throw new Error(err.message); }),
  );
}
