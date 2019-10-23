import {Component, ElementRef, HostBinding, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  @HostBinding('class.app-root') public selfClass = true;
  author = '<%= author %>';

  public constructor(private activatedRoute: ActivatedRoute, private router: Router) {}
  goToComponent() {
  }
}
