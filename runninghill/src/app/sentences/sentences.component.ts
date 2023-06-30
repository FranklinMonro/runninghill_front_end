/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import {
  Component, OnDestroy, OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { SentenceService } from './sentence.service';
import {
  SencteceReturns, SentenceTypes, WordTypes, WordsApiDataReturn,
} from './sentences.interface';

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

  public wordsPageSize: number = 4;

  public wordsCollectionSize: number = 0;

  public createSentence: string = '';

  public sentenceList: SentenceTypes[] = [];

  public sentencePageNumber: number = 1;

  public sentencePageSize: number = 10;

  public sentenceCollectionSize: number = 0;

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
        this.toastr.error(err.message, 'ERROR', {
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
        this.wordsCollectionSize = results?.total!;
        this.wordsList = results!.data!;
        this.wordsPageSize = this.wordTypesList.length;
        this.wordType = wordType;
        this.wordPageNumber = Number(page!);
      },
      error: (err: ErrorEvent) => {
        this.toastr.error(err.message, 'ERROR', {
          timeOut: 3000,
        });
        this.spinner.hide();
      },
      complete: () => {
        this.spinner.hide();
      },
    });
  };

  public getWordsByWordTypesPagenation = (pageNumber: number): void => {
    this.spinner.show();
    this.subcription = this.sentenceService.getWordByTypes(this.wordType, pageNumber)
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
          this.toastr.error(err.message, 'ERROR', {
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
    this.createSentence += ` ${word}`;
  };

  public clearSentence = (): void => {
    this.createSentence = '';
  };

  public postSentence = (sentence: string): void => {
    this.spinner.show();
    this.subcription = this.sentenceService.postSentences(sentence).subscribe({
      next: (resp: boolean) => {
        this.toastr.success('Sentences received', 'SUCCESS');
        if (!resp) {
          this.toastr.error('Sentence was not posted', 'ERROR', {
            timeOut: 3000,
          });
        }
      },
      error: (err: ErrorEvent) => {
        this.toastr.error(err.message, 'ERROR', {
          timeOut: 3000,
        });
        this.spinner.hide();
      },
      complete: () => {
        this.spinner.hide();
        this.createSentence = '';
      },
    });
  };

  public getSentences = (page: number): void => {
    this.spinner.show();
    this.subcription = this.sentenceService.getAllSentences(page).subscribe({
      next: (resp: any) => {
        this.toastr.success('Sentences received', 'SUCCESS');
        const { total, result } = resp.body as SencteceReturns;
        this.sentenceList = result;
        this.sentenceCollectionSize = total;
      },
      error: (err: ErrorEvent) => {
        this.toastr.error(err.message, 'ERROR', {
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
      next: (resp: boolean) => {
        this.toastr.success('Sentences received', 'SUCCESS');
        if (!resp) {
          this.toastr.error('Sentence was not deleted', 'ERROR', {
            timeOut: 3000,
          });
        }
        this.getSentences(1);
      },
      error: (err: ErrorEvent) => {
        this.toastr.error(err.message, 'ERROR', {
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
