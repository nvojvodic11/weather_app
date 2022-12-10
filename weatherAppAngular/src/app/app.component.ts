import { Component } from '@angular/core';
import { toolbarRoutes } from './components/utils/toolbar-routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'weatherAppAngular';
  toolbarRoutes = toolbarRoutes;

  constructor(private router: Router){}

  navigateTo(route: string){
    this.router.navigateByUrl(`/${route}`)
  }
}
