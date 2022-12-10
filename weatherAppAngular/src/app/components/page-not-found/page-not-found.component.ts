import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {
  BUTTON_TITLE = 'Home page';

  constructor(private router: Router) { }

  navigate(): void{
    this.router.navigateByUrl('/');
  }
}
