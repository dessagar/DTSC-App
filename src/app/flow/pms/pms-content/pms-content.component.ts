// Import necessary modules and services
import { Component, OnInit } from '@angular/core';
import { CreateSlideService } from 'src/app/create-slide/create-slide.service';

@Component({
  selector: 'app-pms-content',
  templateUrl: './pms-content.component.html',
  styleUrls: ['./pms-content.component.scss']
})
export class PmsContentComponent implements OnInit {
  slides: any[] = [];

  constructor(private createSlideService: CreateSlideService) {}

  ngOnInit() {
    this.loadSlides();
  }

  loadSlides() {
    this.createSlideService.getSlides().subscribe((slides: any[]) => {
      this.slides = slides;
    });
  }
  
  // Define content data
  contentData = {
    title: 'Inpatient : Patient is Admitted',
    subTitle: 'Ward nurse assesses the patient at bed',
    performer: 'Ward Nurse',
    imageSrc: '../../../../assets/iMedOne-Flow/Patient Assessment at Ward.jpg',
    modalId: 'patientAssesment',
    modalTarget: '#patientAssesment'
  };

  contentData1 = {
    title: 'Inpatient : Patient is Admitted',
    subTitle: 'Ward nurse assesses the patient at bed',
    performer: 'Ward Nurse',
    imageSrc: '../../../../assets/iMedOne-Flow/Patient Assessment at Ward.jpg',
    modalId: 'patientAssesment',
    modalTarget: '#patientAssesment'
  };

  activeTab: string = 'video';  

  videoData: any[] = [
    { title: 'Video 1', text: 'Some quick example text for Video 1.', source: 'https://www.youtube.com/embed/dXOF6I7PwOU' },
    { title: 'Video 2', text: 'Some quick example text for Video 2.', source: 'https://www.youtube.com/embed/G36GbmO0AYg' },
    { title: 'Video 3', text: 'Some quick example text for Video 3.', source: 'https://www.youtube.com/embed/dXOF6I7PwOU' },
    { title: 'Video 4', text: 'Some quick example text for Video 4.', source: 'https://www.youtube.com/embed/dXOF6I7PwOU' },
  ];

  localData: any[] = [
    { title: 'Local Video 1', text: 'Some quick example text for Local Video 1.' , source: 'assets/videos/iMedOnePms.mp4'},
    { title: 'Local Video 2', text: 'Some quick example text for Local Video 2.' , source: 'assets/videos/iMedOnePms.mp4' },
    { title: 'Local Video 3', text: 'Some quick example text for Local Video 3.' , source: 'assets/videos/iMedOnePms.mp4' },
    { title: 'Local Video 3', text: 'Some quick example text for Local Video 3.' , source: 'assets/videos/iMedOnePms.mp4' }
  ];

  // Method to set the active tab
  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
  
}
