import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  constructor(private http: HttpClient) {}

  public loadLayout(layoutName: string): Observable<string> {
    const layoutUrl = `./custom-layout/${layoutName}.html`;

    return new Observable(observer => {
      const subscription: Subscription = this.http.get(layoutUrl, { responseType: 'text' }).subscribe({
        next: layoutHtml => {
          observer.next(layoutHtml);
          observer.complete();
        },
        error: err => {
          observer.error(err);
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    });
  }
}
