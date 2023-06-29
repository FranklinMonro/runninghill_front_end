/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { SentenceService } from './sentence.service';
import { WordTypes, WordsApiDataReturn } from './sentences.interface';

@Component({
  selector: 'app-sentences',
  templateUrl: './sentences.component.html',
  styleUrls: ['./sentences.component.scss'],
})
export class SentencesComponent implements OnInit, OnDestroy {
  private subcription: Subscription | undefined;

  public active = 1;

  public wordType: string = '';

  public wordTypesList: WordTypes[] = [];

  public words: string[] = [];

  public wordPageNumber: number = 1;

  constructor(
    private sentenceService: SentenceService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.getWordTypes();
  }

  private getWordTypes = (): void => {
    this.spinner.show();
    this.subcription = this.sentenceService.getWordTypes().subscribe({
      next: (resp: any) => {
        this.toastr.success('Word Types received', 'SUCCESS');
        this.wordTypesList = resp.body;
      },
      error: (err: ErrorEvent) => {
        this.toastr.error(err.message, 'Major Error', {
          timeOut: 3000,
        });
        this.spinner.hide();
      },
      complete: () => {
        this.spinner.hide();
      },
    });
  };

  public getWordsByWordTypes = (wordType: string): void => {
    this.spinner.show();
    this.subcription = this.sentenceService.getWordByTypes(wordType, 1).subscribe({
      next: (resp: any) => {
        this.toastr.success(`Words for ${wordType}`, 'SUCCESS');
        const { results, page } = resp.body as WordsApiDataReturn;
        this.words = results!.data!;
        this.wordPageNumber = Number(page!);
      },
      error: (err: ErrorEvent) => {
        this.toastr.error(err.message, 'Major Error', {
          timeOut: 3000,
        });
        this.spinner.hide();
      },
      complete: () => {
        this.spinner.hide();
      },
    });
  };

  ngOnDestroy() {
    if (this.subcription) {
      this.subcription.unsubscribe();
    }
  }
}
