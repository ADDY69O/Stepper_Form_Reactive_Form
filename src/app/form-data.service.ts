import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {

  constructor() { }

  public data = {
    common: { Fname: "", Lname: "", Phone: null, dob: null },
    basicDetails: { Email: "", Website: "" },
    familyDetails: [
      { Fname: "", Lname: "", Phone: null, dob: "", relation: "" }
    ],
    creative: [
      { firstName: "", image: "" } // Adjusted to match with CreativeComponent
    ],
    address: { city: "", state: "", country: "" }
  };

  addCommonData(data: any) {
    this.data.common = data;
    console.log(this.data.common);
  }

  addBasicData(data: any) {
    this.data.basicDetails = data;
    console.log(this.data.basicDetails);
  }

  addFamilyData(index: number, data: any) {
    if (this.data.familyDetails[index]) {
      this.data.familyDetails[index] = data;
    } else {
      this.data.familyDetails.push(data);
    }
    console.log(this.data.familyDetails);
  }

  addCreativePicture(name: string, file: File) {
    const imageUrl = URL.createObjectURL(file);
    const index = this.data.creative.findIndex(c => c.firstName === name);
    if (index > -1) {
      this.data.creative[index] = { firstName: name, image: imageUrl };
    } else {
      this.data.creative.push({ firstName: name, image: imageUrl });
    }
    console.log(this.data.creative)
  }

  addAddress (country: string, city: string, state: string){
    this.data.address.city = city;
    this.data.address.country = country;
    this.data.address.state = state;

  }

  removeCreativePicture(name: string) {
    this.data.creative = this.data.creative.filter(c => c.firstName !== name);
  }

  getCreativePictures() {
    return this.data.creative;
  }
}
