import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectCategoryService {
  private selectedCategory = new BehaviorSubject<string>('todos');
  selectedCategory$: Observable<string> = this.selectedCategory.asObservable();

  setCategory(category: string) {
    this.selectedCategory.next(category);
  }
}
