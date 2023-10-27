import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TotalRecordsService {

  private countSource = new BehaviorSubject(0);
  currentCount = this.countSource.asObservable();

  constructor() { }

  getTotalRecords(count: number) {
    this.countSource.next(count)
  }
}