import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../types/user';

export interface User {
  id: number,
  name: string,
  email: string,
  status: number,
  email_verified_at: string,
  created_at: string,
}

export interface RegisterDTO {
  name: string,
  email: string,
  password: string,
  password_confirmation: string
}

interface AuthResponse {
  token: string;
  // user?: User;
  // error?: "email" | "password"
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = environment.api_url
  private authTokenKey = 'authToken'


  constructor(
    private http: HttpClient
  ) { }

    login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.url + "/login", {
      email: email,
      password: password,
      device_name: "phone"
    }).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem(this.authTokenKey, response.token);
        }
      })
    );
  }

  register(data: RegisterDTO): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.url + "/register", data)
  }

  getToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getUser() {
    return this.http.get<IUser>(this.url + "/api/user")
  }

}
