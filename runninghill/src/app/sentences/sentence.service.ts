/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import environment from '../../enviroment/enviroment';
import { WordTypes, WordsApiDataReturn } from './sentences.interface';

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
      if (!res.body) {
        throw new Error('No response in body');
      }
      return res;
    }),
    catchError((err: HttpErrorResponse) => { throw new Error(err.message); }),
  );

  public getWordByTypes = (
    word: string,
    wordPageNumber: number,
  ): Observable<WordsApiDataReturn> => this.httpClient.get<WordsApiDataReturn>(
    `${environment.apiUrl}runninghillapi/wordsapi/wordtype/${word}/${wordPageNumber}`,
    { observe: 'response' },
  ).pipe(
    map((res: any) => {
      if (!res.body) {
        throw new Error('No response in body');
      }
      return res;
    }),
    catchError((err: HttpErrorResponse) => { throw new Error(err.message); }),
  );
}
