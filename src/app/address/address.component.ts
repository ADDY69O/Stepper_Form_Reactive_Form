import { CommonModule } from '@angular/common';
import { Component, input, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { ApiPostService } from '../services/api-calling.service';
import { ToastrService } from 'ngx-toastr';
import { FormDataService } from '../form-data.service';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  @ViewChild('address') Form: FormGroup;
  addressForm: FormGroup;
  inputSearch = '';
  autoComplete: any[] = [];

  constructor(
    private ApiService: ApiPostService,
    private toastr: ToastrService,
    private formService: FormDataService,
    private fb: FormBuilder
  ) {
    this.addressForm = this.fb.group({
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      inputSearch: ['']
    });
  }

  ngOnInit() {
    const data = this.formService.data.address || {};
    this.addressForm.patchValue(data);
  }

  validateAddress() {
    if (this.addressForm.invalid) {
      Object.keys(this.addressForm.controls).forEach(field => {
        const control = this.addressForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
      return false;
    } else {
      this.formService.addAddress(
        this.addressForm.value.country,
        this.addressForm.value.city,
        this.addressForm.value.state
      );
      return true;
    }
  }

  handleInputChange() {
    let inputData = this.addressForm.get('inputSearch').value;
 
    this.ApiService.getPlaces(inputData).subscribe(data => this.autoComplete = data.predictions);
  }

  selectAddress(address: any) {
    this.inputSearch = address.description;
    this.autoComplete = [];

    let newArray = [];
    newArray = this.inputSearch.split(",");

    if (newArray.length < 2) {
      this.toastr.error('Only Country is Selected', 'Error');
    } else if (newArray.length < 3) {
      this.toastr.error('Only Country & state is Selected', 'Error');
    } else {
      this.toastr.success('Successfully selected', 'Success');
      this.addressForm.patchValue({
        country: newArray[newArray.length - 1],
        state: newArray[newArray.length - 2],
        city: newArray.slice(0, newArray.length - 2).join()
      });
    }
  }
}
