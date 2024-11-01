import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./shared/footer/footer.component";
import { HeaderComponent } from "./shared/header/header.component";
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, HeaderComponent, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
  
export class AppComponent {
  constructor (public loadingService: LoadingService) {

  }
}
