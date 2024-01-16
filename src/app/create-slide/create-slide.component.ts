import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { CreateSlideService } from '../create-slide/create-slide.service';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


@Component({
  selector: 'app-create-slide',
  templateUrl: './create-slide.component.html',
  styleUrls: ['./create-slide.component.scss']
})
export class CreateSlideComponent implements OnInit {
  slideForm!: FormGroup;

  modules: string[] = ['PMS', 'CARE', 'GRM', 'LSM'];
  moduleControls: { [key: string]: FormControl } = {};

  externalVideos!: FormArray;
  internalVideos!: FormArray;
  isExternal: boolean = true;

  constructor(
    private fb: FormBuilder,
    private createSlideService: CreateSlideService
  ) {
    this.modules.forEach((module) => {
      this.moduleControls[module] = new FormControl(false);
    });

    this.externalVideos = this.fb.array([]);
    this.internalVideos = this.fb.array([]);
  }

  ngOnInit() {
    this.slideForm = this.fb.group({
      title: ['', Validators.required],
      subtitle: [''],
      performer: [''],
      image: [''],
      externalVideos: this.externalVideos,
      internalVideos: this.internalVideos,
    });
    this.modules.forEach((module) => {
      this.moduleControls[module].reset(false);
    });
  }

  get videoControls(): AbstractControl[] {
    return this.isExternal ? this.externalVideos.controls : this.internalVideos.controls;
  }

  addExternalVideo() {
    this.externalVideos.push(
      this.fb.group({
        videoTitle: ['', Validators.required],
        videoDescription: [''],
        youtubeUrl: ['', Validators.pattern('^(https?\\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$')],
      })
    );
  }

  addInternalVideo() {
    this.internalVideos.push(
      this.fb.group({
        videoTitle: ['', Validators.required],
        videoDescription: [''],
        localVideoFile: [''],
      })
    );
  }

  removeVideo(videoType: string, index: number) {
    const videos = videoType === 'externalVideos' ? this.externalVideos : this.internalVideos;
    videos.removeAt(index);
  }

  onImageChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];

    if (file) {
      this.slideForm.patchValue({
        image: file.name,
      });

      console.log('Selected Image:', file);
    }
  }

  clearVideos() {
    const videosArray = this.isExternal ? this.externalVideos : this.internalVideos;
    while (videosArray.length !== 0) {
      videosArray.removeAt(0);
    }
  }

  // In CreateSlideComponent onSubmit method
  onSubmit(): void {
    console.log('Form submitted!'); // Add this line

    if (this.slideForm.valid) {
      const selectedModules = this.modules.filter(module => this.moduleControls[module].value);
  
      if (selectedModules.length > 0) {
        const newSlide = {
          ...this.slideForm.value,
          selectedModules: selectedModules,
        };
  
        // Add slide to the CreateSlideService
        this.createSlideService.addSlide(newSlide).subscribe(
          response => {
            console.log('Slide added successfully:', response);
            // Optionally, reset form or perform other actions
          },
          error => {
            console.error('Error adding slide:', error);
            // Handle the error appropriately
          }
        );
      }
  
      this.slideForm.reset();
      this.clearVideos();
    }
}
}