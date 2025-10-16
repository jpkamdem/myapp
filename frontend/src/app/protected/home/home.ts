import { Component } from '@angular/core';
import { ApiService } from '../../shared/services/api-service';

@Component({
  selector: 'app-home',
  imports: [],
  providers: [ApiService],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
