import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { FormDataService } from '../form-data.service';
import { CommonComponent } from '../common/common.component';


@Component({
  selector: 'app-basic-details',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, CommonComponent],
  templateUrl: './basic-details.component.html',
  styleUrl: './basic-details.component.css'
})
export class BasicDetailsComponent {
  basicForm: FormGroup;

  constructor(private formService: FormDataService, private fb: FormBuilder) {}

  @ViewChild(CommonComponent) commonComponent: CommonComponent;

  ngOnInit() {
    console.log('ng init called');
    const basicData = this.formService.data.basicDetails;

    // Initialize the form
    this.basicForm = this.fb.group({
      Email: [basicData.Email || '', [Validators.required, Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])/)]],
      Website: [basicData.Website || '', [Validators.required, Validators.pattern(/(https?:\/\/)?([\w\d-_]+)\.([\w\d-_\.]+)\/?\??([^#\n\r]*)?#?([^\n\r]*)/)]]
    });
  }

  checkisValid() {
    return this.basicForm.valid && this.commonComponent.checkisValid();
  }

  handleBasicForm() {
    if (this.basicForm.valid) {
      const data = this.basicForm.value;
      this.formService.addBasicData(data);
      this.commonComponent.handleCommonForm();
    } else {
      this.basicForm.markAllAsTouched();
      this.commonComponent.handleCommonForm();
      console.log('form is not valid');
    }
  }
}

