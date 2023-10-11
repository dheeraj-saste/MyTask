import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private route: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    let controls = this.loginForm.controls;
    const params = {
      Username: controls['userName'].value,
      Password: controls['password'].value,
    };

    this.authService.login(params.Username, params.Password).subscribe(
      (res) => {
        if (res.userDetail.Status == 200) {
          let accessToken =
            'Basic ' + btoa(params.Username + ':' + params.Password);
          localStorage.setItem('accessToken', accessToken);
          this.route.navigate(['/mytask']);
        } else if (res.userDetail.Status != 200) {
        }
      },
      (err) => {
        alert('Something went wrong');
      }
    );
  }
}
