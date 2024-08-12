import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-common-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() control: FormControl;
  @Input() requiredMessage: string = '* This field is required';
  @Input() minlengthMessage: string = 'Minimum length required';
  @Input() maxlengthMessage: string = 'Maximum length exceeded';

  // Function to check if a validator is present
 
}
