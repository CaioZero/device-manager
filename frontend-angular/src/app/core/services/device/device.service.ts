import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {IDevice} from "../../interfaces/device.interface";

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private API = `${environment.baseUrl}`+'device';

  constructor(private http: HttpClient) { }

  getDevices(): Observable<IDevice[]>{
    return this.http.get<any>(`${this.API}`);
  }

  getOneDevice(id: number): Observable<IDevice>{
    return this.http.get<any>(`${this.API}/${id}`);
  }

  createDevice(device: IDevice): Observable<IDevice>{
    return this.http.post<any>(`${this.API}`, device);
  }

  deleteDevice(id?: number): Observable<IDevice>{
    return this.http.delete<any>(`${this.API}/${id}`);
  }
}
