import { Component } from '@angular/core';
import { CheckActivityService } from './core/services/check-activity.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'burgerManagementFrontend';
  constructor(private checkActivityService: CheckActivityService) {}

  ngOnInit() {
    this.checkActivityService.startChecking();
  }
}
