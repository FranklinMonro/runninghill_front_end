/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { SentenceService } from './sentence.service';

@Component({
  selector: 'app-sentences',
  templateUrl: './sentences.component.html',
  styleUrls: ['./sentences.component.scss'],
})
export class SentencesComponent implements OnInit, OnDestroy {
  private subcription: Subscription | undefined;

  public active = 1;

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
        console.log('resp', resp);
      },
      error: (err: ErrorEvent) => {
        this.toastr.error(err.message, 'Major Error', {
          timeOut: 3000,
        });
        console.log('err', err);
        this.spinner.hide();
      },
      complete: () => {
        console.log('complete');
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
