import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormDataService } from '../form-data.service';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-common',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.css']
})
export class CommonComponent {
  commonForm: FormGroup;

  @Input() member: any;
  @Input() memberIndex: number;
  @Output() sendCommonData: EventEmitter<any> = new EventEmitter();


  constructor(private formService: FormDataService, private fb: FormBuilder) {}


  ngOnInit() {
    const commonData = this.member || this.formService.data.common;

    this.commonForm = this.fb.group({
      Fname: [commonData.Fname || '', [Validators.required, Validators.minLength(6)]],
      Lname: [commonData.Lname || ''],
      Phone: [commonData.Phone || '', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      dob: [commonData.dob ? new Date(commonData.dob).toISOString().substring(0, 10) : '', Validators.required]
    });
  }

  checkisValid() {
    return this.commonForm.valid;
  }

  handleCommonForm() {
    if (this.commonForm.valid) {
      this.formService.addCommonData(this.commonForm.value);
      this.sendCommonData.emit(this.commonForm.value);
    } else {
      this.commonForm.markAllAsTouched();
      console.log('Form is not valid');
    }
  }

  handleCommonFamilyForm() {
    if (this.checkisValid()) {
      console.log(this.commonForm.value + ' within Common Module');
      this.sendCommonData.emit(this.commonForm.value);
    } else {
      this.commonForm.markAllAsTouched();
      console.log('Form is not valid');
    }
  }
}
