import { Component } from "@angular/core"
import { BasicDetailTypes } from "./pagesTypes"
@Component({
    standalone: true,
  })


export class FormData {

    public data = {

        basicDetails : {
            Fname: "",
            Lname:"",
            Email:"",
            Phone:0,
            Website:""
        }
        
    }
 



  }
  