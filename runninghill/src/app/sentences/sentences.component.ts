/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import {
  Component, OnDestroy, OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { SentenceService } from './sentence.service';
import { SentenceTypes, WordTypes, WordsApiDataReturn } from './sentences.interface';

@Component({
  selector: 'app-sentences',
  templateUrl: './sentences.component.html',
  styleUrls: ['./sentences.component.scss'],
})
export class SentencesComponent implements OnInit, OnDestroy {
  private subcription: Subscription | undefined;

  public active: number = 1;

  public wordType: string = '';

  public wordTypesList: WordTypes[] = [];

  public wordsList: string[] = [];

  public wordPageNumber: number = 1;

  public page: number = 1;

  public wordsPageSize: number = 4;

  public wordsCollectionSize: number = 0;

  public createSentence: string = '';

  public sentenceList: SentenceTypes[] = [];

  constructor(
    private sentenceService: SentenceService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.getWordTypes();
  }

  public getWordTypes = (): void => {
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
        // this.wordsCollectionSize = results?.total!;
        this.wordsList = results!.data!;
        this.wordsPageSize = this.wordTypesList.length;
        this.wordType = wordType;
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

  public getWordsByWordTypesPagenation = (): void => {
    this.spinner.show();
    this.subcription = this.sentenceService.getWordByTypes(this.wordType, this.wordPageNumber)
      .subscribe({
        next: (resp: any) => {
          this.toastr.success(`Words for ${this.wordType}`, 'SUCCESS');
          const { results, page } = resp.body as WordsApiDataReturn;
          this.wordsCollectionSize = results?.total!;
          this.wordsList = results!.data!;
          this.wordsPageSize = this.wordTypesList.length;
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

  public addToSentence = (word: String): void => {
    this.createSentence += word;
  };

  public clearSentence = (): void => {
    this.createSentence = '';
  };

  public postSentence = (sentence: string): void => {
    this.spinner.show();
    this.subcription = this.sentenceService.postSentences(sentence).subscribe({
      next: (resp: any) => {
        this.toastr.success('Sentences received', 'SUCCESS');
        console.log(resp.body);
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

  public getSentences = (): void => {
    this.spinner.show();
    this.subcription = this.sentenceService.getAllSentences().subscribe({
      next: (resp: any) => {
        this.toastr.success('Sentences received', 'SUCCESS');
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

  public deleteSentence = (sentenceID: string): void => {
    this.spinner.show();
    this.subcription = this.sentenceService.deleteSentences(sentenceID).subscribe({
      next: (resp: any) => {
        this.toastr.success('Sentences received', 'SUCCESS');
        console.log(resp.body);
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
