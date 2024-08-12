import { Component, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { FormDataService } from '../form-data.service';
import { CommonComponent } from '../common/common.component';
import { InputComponent } from '../input/input.component';

interface FamilyMember {
  Fname: string;
  Lname: string;
  Phone: number;
  dob: string;
  relation: string;
}

@Component({
  selector: 'app-family-details',
  standalone: true,
  imports: [CommonComponent, ReactiveFormsModule, CommonModule, InputComponent],
  templateUrl: './family-details.component.html',
  styleUrls: ['./family-details.component.css'],
})
export class FamilyDetailsComponent {
  @ViewChildren(CommonComponent) commonComponents: QueryList<CommonComponent>;

  familyForm: FormGroup;
  noOfFamilyMembers: FamilyMember[] = []; // Define noOfFamilyMembers

  constructor(private formService: FormDataService, private fb: FormBuilder) {
    this.familyForm = this.fb.group({
      familyMembers: this.fb.array([])
    });
  }

  ngOnInit() {
    this.noOfFamilyMembers = this.formService.data.familyDetails || [];
    this.noOfFamilyMembers.forEach(member => this.addFamilyMember(member));
  }

  getFormControl(index: number, controlName: string): FormControl {
    return this.familyMembers.at(index).get(controlName) as FormControl;
  }

  get familyMembers(): FormArray {
    return this.familyForm.get('familyMembers') as FormArray;
  }

  addFamilyMember(member?: FamilyMember) {
    const familyMemberForm = this.fb.group({
      Fname: [member?.Fname || '', Validators.required],
      Lname: [member?.Lname || '', ],
      Phone: [member?.Phone || '', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      dob: [member?.dob || '', Validators.required],
      relation: [member?.relation || '', Validators.required],
    });

    this.familyMembers.push(familyMemberForm);
  }

  removeFamilyMember(index: number) {
    if (index > -1) {
      this.familyMembers.removeAt(index);
    }
  }

  checkisValid(): boolean {
    return this.familyForm.valid;
  }

  UpdateCommonComponentValue (){
    this.commonComponents.forEach(component => component.handleCommonFamilyForm());
  }
  
  handleFamilyForm() {
    this.UpdateCommonComponentValue()
    console.log(this.familyForm.valid)
   
    if (this.familyForm.valid) {
      this.familyForm.value.familyMembers.forEach((member, index) => {
        this.formService.addFamilyData(index, member);
      });
      this.commonComponents.forEach(component => component.handleCommonFamilyForm());
      console.log('All family data saved:', this.formService.data.familyDetails);
    } else {
      console.log('Form is not valid');
      this.commonComponents.forEach(component => component.handleCommonFamilyForm());
    }
  }

  updateFamilyMemberData(index: number, data: Partial<FamilyMember>) {
    const memberForm = this.familyMembers.at(index);
    if (memberForm) {
      memberForm.patchValue(data);
    }
  }
}
