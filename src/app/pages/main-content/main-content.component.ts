import { Component } from '@angular/core';
import {CATEGORIES} from '../../../app/constants/constants'


@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent {

  categories = CATEGORIES

}
