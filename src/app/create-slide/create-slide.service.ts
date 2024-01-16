// create-slide.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CreateSlideService {
  private apiUrl = 'http://localhost:3000'; // Adjust the URL to your server

  constructor(private http: HttpClient) {}

  // Remove the local slides array
  // private slides: any[] = [];

  // Modify getSlides to make an HTTP GET request


  addSlide(slide: any) {
    return this.http.post(`${this.apiUrl}/slides`, slide);
  }
  getSlides() {
    return this.http.get<any[]>(`${this.apiUrl}/slides`);
  }
  getSlideValues() {
    return this.http.get(`${this.apiUrl}/slide-values`);
  }

  setSlideValues(values: any) {
    // You can implement an HTTP PUT request to update values on the server if needed
    console.log('Setting slide values:', values);
  }

  addSlideToModules(newSlide: any, selectedModules: string[]) {
    // You can implement an HTTP POST request to add the slide to modules on the server
    console.log('Adding slide to modules:', newSlide, selectedModules);
  }
}
