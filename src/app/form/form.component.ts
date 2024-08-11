import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'; // Updated
import { pageType } from '../modal/pagesTypes';
import { BasicDetailsComponent } from '../basic-details/basic-details.component';
import { CreativeComponent } from '../creative/creative.component';
import { FamilyDetailsComponent } from '../family-details/family-details.component';
import { ResultComponent } from '../result/result.component';
import { AddressComponent } from '../address/address.component';
import { CommonComponent } from '../common/common.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BasicDetailsComponent, CreativeComponent, FamilyDetailsComponent, ResultComponent, AddressComponent, CommonComponent],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  @ViewChild(BasicDetailsComponent) BasicDetailComponent: BasicDetailsComponent;
  @ViewChild(FamilyDetailsComponent) FamilyDetailsComponent: FamilyDetailsComponent;
  @ViewChild(CreativeComponent) CreativeComponent: CreativeComponent;
  @ViewChild(AddressComponent) AddressComponent: AddressComponent;

  constructor(private toastr: ToastrService, private router: Router) {}

  selected: number = 1;
  pages: number[] = [1, 2, 3, 4, 5];
  stepperPages: pageType[] = [
    { page: 1, title: "Basic Details", editable: false },
    { page: 2, title: "Family Details", editable: false },
    { page: 3, title: "Creative", editable: false },
    { page: 4, title: "Address", editable: false },
    { page: 5, title: "Submission", editable: false },
  ];

  isValid: boolean = false;

  data = {
    basicDetails: {
      Email: "",
      Fname: "",
      Lname: "",
      Phone: 0,
      Website: "",
    }
  };

  updateBasicDetails(data: any) {
    console.log(data);
    this.data.basicDetails = data;
  }

  showFormDetails(data: any) {
    console.log("Inside Parent Component");
    console.log(data);
  }

  handleNextPage = (submit: boolean = false) => {
    if (this.stepperPages[this.selected - 1].title == "Family Details") {
      if (this.FamilyDetailsComponent.checkisValid()) {
        this.FamilyDetailsComponent.handleFamilyForm();
      } else {
        this.FamilyDetailsComponent.handleFamilyForm();
        this.toastr.error('Form is not valid', 'Error');
        return;
      }
    } else if (this.stepperPages[this.selected - 1].title == "Basic Details") {
      if (this.BasicDetailComponent.checkisValid()) {
        this.BasicDetailComponent.handleBasicForm();
      } else {
        this.BasicDetailComponent.handleBasicForm();
        this.toastr.error('Form is not valid', 'Error');
        console.log("Form is not Valid")
        return;
      }
    } else if (this.stepperPages[this.selected - 1].title == "Creative") {
      if (!this.CreativeComponent.validatePhotos()) {
        this.toastr.error('Required to upload all of the photos', 'Error');
        return;
      }
    } else if (this.stepperPages[this.selected - 1].title == "Address") {
      if (!this.AddressComponent.validateAddress()) {
        this.toastr.error('Required to select the address', 'Error');
        return;
      }
    }
    if (!submit) {
      this.selected += 1;
    } else {
      this.selected = this.stepperPages.length;
      this.toastr.success("Successfully saved the changes", "Success");
    }
  }

  changePage(page: number) {
    console.log(page);
    this.stepperPages[page - 1].editable = true;
    this.selected = page;
    console.log(this.stepperPages);
    this.toastr.success('Successfully switched to page ' + page, 'Success');
  }

  handleFormSubmit() {
    if (this.selected !== this.stepperPages.length) {
      this.handleNextPage(true);
    } else {
      this.toastr.success("Form Filled Successfully", "Success");
      this.router.navigate(['/submit']);
    }
  }
}
