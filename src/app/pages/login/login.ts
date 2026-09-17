import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {


  containerClass: 'active' | 'close' | '' = '';

  showRegister() {
    this.containerClass = 'active';
  }

  showLogin() {
    this.containerClass = 'close';
  }
  currentYear = new Date().getFullYear();




  userForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })


}


