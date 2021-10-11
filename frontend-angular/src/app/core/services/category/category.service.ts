import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {ICategory} from "../../interfaces/category.interface";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private API = `${environment.baseUrl}`+'category';
  dataChange: BehaviorSubject<ICategory[]> = new BehaviorSubject<ICategory[]>([]);

  constructor(private http: HttpClient) { }

  get data(): ICategory[] {
    return this.dataChange.value;
  }

  getCategories(): Observable<Array<ICategory>> {
    return this.http.get<any>(`${this.API}`);
  }

  getOneCategory(id?: number): Observable<ICategory>{
    return this.http.get<any>(`${this.API}/${id}`);
  }

  createCategory(category: ICategory): Observable<ICategory>{
    return this.http.post<any>(`${this.API}`, category);
  }

  deleteCategory(id?: number): Observable<ICategory>{
    return this.http.delete<any>(`${this.API}/${id}`);
  }


}
