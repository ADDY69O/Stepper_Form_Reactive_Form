import { Component, ViewChildren, QueryList, ElementRef, Renderer2 } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms'; // Updated
import { CommonModule } from '@angular/common';
import { FormDataService } from '../form-data.service';
import { CommonComponent } from '../common/common.component';

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
  imports: [CommonComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './family-details.component.html',
  styleUrls: ['./family-details.component.css'],
})
export class FamilyDetailsComponent {
  @ViewChildren(CommonComponent) commonComponents: QueryList<CommonComponent>;
  @ViewChildren('relationInput') relationInputs: QueryList<ElementRef>;

  familyForm: FormGroup;
  noOfFamilyMembers: FamilyMember[] = []; // Define noOfFamilyMembers

  constructor(private formService: FormDataService, private renderer: Renderer2, private fb: FormBuilder) {
    this.familyForm = this.fb.group({
      familyMembers: this.fb.array([])
    });
  }

  ngOnInit() {
    this.noOfFamilyMembers = this.formService.data.familyDetails || [];
    this.noOfFamilyMembers.forEach(member => this.addFamilyMember(member));
  }

  get familyMembers(): FormArray {
    return this.familyForm.get('familyMembers') as FormArray; // Cast to FormArray
  }

  addFamilyMember(member?: FamilyMember) {
    const familyMemberForm = this.fb.group({
      Fname: [member?.Fname || '', Validators.required],
      Lname: [member?.Lname || '', Validators.required],
      Phone: [member?.Phone || '', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      dob: [member?.dob || '', Validators.required],
      relation: [member?.relation || '', Validators.required],
    });

    this.familyMembers.push(familyMemberForm);
  }

  removeFamilyMember(index: number) {
    if (index > -1) {
      this.familyMembers.removeAt(index); // Now it should work
    }
  }

  checkisValid(): boolean {
    return this.familyForm.valid;
  }

  handleFamilyForm() {
   
    setTimeout(() => {
      console.log(this.familyForm);
      if (!this.familyForm.invalid) {
        this.familyForm.value.familyMembers.forEach((member, index) => {
          this.formService.addFamilyData(index, member);
        });
        console.log('All family data saved:', this.formService.data.familyDetails);
        this.commonComponents.forEach((component) => component.handleCommonFamilyForm());
      } else {
        this.commonComponents.forEach((component) => component.handleCommonFamilyForm());
        console.log('Form is not valid');
      }
    },2000);
  }

  updateFamilyMemberData(index: number, data: Partial<FamilyMember>) {
    const memberForm = this.familyMembers.at(index);
    if (memberForm) {
      memberForm.patchValue(data);
    }
  }
}
