/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import environment from '../../enviroment/enviroment';
import { SentenceTypes, WordTypes, WordsApiDataReturn } from './sentences.interface';

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

  public getAllSentences = (): Observable<SentenceTypes> => this.httpClient.get<SentenceTypes>(
    `${environment.apiUrl}runninghillapi/sentenceroutes/sentence`,
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

  public postSentences = (sentence: string): Observable<boolean> => this.httpClient.post<boolean>(
    `${environment.apiUrl}runninghillapi/sentenceroutes/sentence/${sentence}`,
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

  public deleteSentences = (
    sentenceID: string,
  ): Observable<boolean> => this.httpClient.delete<boolean>(
    `${environment.apiUrl}runninghillapi/sentenceroutes/sentence/${sentenceID}/false`,
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
