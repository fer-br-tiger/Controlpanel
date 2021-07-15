import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { InstructorService } from 'src/app/services/instructor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mainpanel',
  templateUrl: './mainpanel.component.html',
  styleUrls: ['./mainpanel.component.scss']
})
export class MainpanelComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, instructorService: InstructorService, private router: Router) {
    instructorService.autho().subscribe(resp => {
      console.log(resp);
    }, err => {
      console.log(err);
      sessionStorage.removeItem('token');
      router.navigateByUrl('/');
    });
  }
}
