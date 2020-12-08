import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreatePeepDto } from './peep.dto';



@Injectable()
export class RegFormService {
  constructor(private http: HttpClient) {
  }

  register(peepDto: CreatePeepDto): Observable<any> {
    return this.http.post(`http://localhost:3000/peeps`, peepDto);
}

  getPeeps(): Observable<any> {
    return this.http.get(`http://localhost:3000/peeps`);
  }

}

