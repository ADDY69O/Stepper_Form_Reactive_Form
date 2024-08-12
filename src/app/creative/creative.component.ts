import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { FormDataService } from '../form-data.service';

@Component({
  selector: 'app-creative',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './creative.component.html',
  styleUrls: ['./creative.component.css'],
})
export class CreativeComponent implements OnInit {
  familyDetails = [];
  creative = [];
  showValidationError = false; // Flag to show validation error
  creativeForm: FormGroup;

  constructor(private formDataService: FormDataService, private fb: FormBuilder) {
    this.creativeForm = this.fb.group({
      photos: this.fb.group({})
    });
  }

  ngOnInit() {
    this.familyDetails = this.formDataService.data.familyDetails;
    this.creative = this.formDataService.getCreativePictures();
    console.log('Creative Pictures:', this.creative);
    this.initializePhotosForm();
  }

  initializePhotosForm() {
    const photosGroup = this.familyDetails.reduce((group, member) => {
      group[member.Fname] = [null];
      return group;
    }, {});
    this.creativeForm.setControl('photos', this.fb.group(photosGroup));
  }

  addPhoto(name: string, event: any) {
    const file = (event.target as HTMLInputElement).files?.[0];
    console.log(file);
    if (file) {
      console.log('Uploading file:', file);
      this.formDataService.addCreativePicture(name, file,file.name);
      this.creative = this.formDataService.getCreativePictures(); // Refresh creative array from service
      this.creativeForm.get(['photos', name]).setValue(file);
    }
  }

  getUploadedFile(name: string) {
    console.log(this.creative);
    const data = this.creative.find((c) => c.firstName === name) || null;
    console.log(data);
    return data;
  }

  removePhoto(name: string) {
    this.formDataService.removeCreativePicture(name);
    this.creative = this.formDataService.getCreativePictures(); // Refresh creative array from service
    this.creativeForm.get(['photos', name]).setValue(null);
  }

  validatePhotos() {
    const photosControl = this.creativeForm.get('photos') as FormGroup;
    const allPhotosUploaded = this.familyDetails.every((member) =>
      photosControl.get(member.Fname)?.value
    );

    if (allPhotosUploaded) {
      this.showValidationError = false;
      console.log('All photos are uploaded. You can proceed.');
      return true;
    } else {
      this.showValidationError = true;
      console.log('Please upload photos for all family members.');
      return false;
    }
  }
}
