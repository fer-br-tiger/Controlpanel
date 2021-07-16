import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const cudOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class InstructorService {
  private urlBase = environment.url_base;

  private authUser = this.urlBase + '/login';
  private apiGetUsers = this.urlBase + '/usuarios';

  private apiGetCursos = this.urlBase + '/admin/cursos';
  private apiPostCurso = this.urlBase + '/cursos';
  private apiPutCurso = this.urlBase + '/cursos/';
  private apiDeleteCurso = this.urlBase + '/cursos/';

  private apiGetAlumnos = this.urlBase + '/alumnos';

  private apiGetSubrubros = this.urlBase + '/subrubros';

  private apiPostComision = this.urlBase + '/comision';

  private apiKey: string = 'c91a482fb08aff508e2c04b9ad7fed9a';

  idCurso!: number;

  private cudAuth = {
    headers: new HttpHeaders()
  };

  constructor(public http: HttpClient) { }

  authe (user: any): Observable<any> {
    const newSession = Object.assign({}, user);
    return this.http.post<any[]>(this.authUser, newSession, cudOptions);
  }

  autho (): Observable<any> {
    this.cudAuth.headers = this.cudAuth.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));

    return this.http.get(this.apiGetUsers, this.cudAuth);
  }

  getCursos(): Observable<any> {
    this.cudAuth.headers = this.cudAuth.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));

    return this.http.get(this.apiGetCursos, this.cudAuth);
  }

  getCurso(id: number): Observable<any> {
    return this.http.get(this.apiGetCursos + `/${id}`, this.cudAuth);
  }

  getAlumnos(): Observable<any> {
    this.cudAuth.headers = this.cudAuth.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));

    return this.http.get(this.apiGetAlumnos, this.cudAuth);
  }

  upload(data: any): Observable<any> {
    const formData = new FormData();
    formData.append('image', data);

    return this.http
      .post('https://api.imgbb.com/1/upload', formData, { params: { key: this.apiKey } })
      .pipe(map((response: any) => response['data']['url']));
  }

  postCurso(curso: any): Observable<any> {
    const newSession = Object.assign({}, curso);
    return this.http.post<any[]>(this.apiPostCurso, newSession, cudOptions);
  }

  postCom(com: any): Observable<any> {
    const newSession = Object.assign({}, com);
    return this.http.post<any[]>(this.apiPostComision, newSession, cudOptions);
  }

  putCurso(curso: any, id: number): Observable<any> {
    const newSession = Object.assign({}, curso);
    return this.http.put<any[]>(this.apiPutCurso + id, newSession, cudOptions);
  }

  deleteCurso(id: number): Observable<any> {
    return this.http.delete(this.apiDeleteCurso + id);
  }

  getSubrubros(): Observable<any> {
    return this.http.get(this.apiGetSubrubros);
  }
}
