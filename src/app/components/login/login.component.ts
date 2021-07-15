import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InstructorService } from 'src/app/services/instructor.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login!: FormGroup;
  isErr: boolean = false;
  messageError: string = '';

  constructor(private instructorService: InstructorService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.login = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  authUser() {
    let user = {
      username: this.login.get('username')?.value,
      password: this.login.get('password')?.value
    }

    this.instructorService.authe(user).subscribe(resp => {
      sessionStorage.setItem('token', resp.token);
      this.router.navigateByUrl('/panel');
    }, err => {
      this.messageError = err.error.error;
      this.isErr = true;
    });
  }

}
