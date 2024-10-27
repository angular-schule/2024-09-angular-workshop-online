import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-rating',
    imports: [],
    templateUrl: './rating.component.html',
    styleUrl: './rating.component.scss',
})
export class RatingComponent {
  @Input() value = 0;

  getStars() {
    return new Array(this.value);
  }
}
