/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SentenceService } from './sentence.service';

@Component({
  selector: 'app-sentences',
  templateUrl: './sentences.component.html',
  styleUrls: ['./sentences.component.scss'],
})
export class SentencesComponent implements OnInit, OnDestroy {
  private subcription: Subscription | undefined;

  constructor(private sentenceService: SentenceService) { }

  ngOnInit() {
    this.getWordTypes();
  }

  private getWordTypes = (): void => {
    this.subcription = this.sentenceService.getWordTypes().subscribe({
      next: (resp: any) => {
        console.log('resp', resp);
      },
      error: (err: ErrorEvent) => {
        console.log('err', err);
      },
      complete: () => {
        console.log('complete');
      },
    });
  };

  ngOnDestroy() {
    if (this.subcription) {
      this.subcription.unsubscribe();
    }
  }
}
