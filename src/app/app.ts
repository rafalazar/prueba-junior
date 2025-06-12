import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppService } from './app.service';
import { DatatableComponent } from './components/datatable/datatable.component';
import { FormComponent } from "./components/form/form.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DatatableComponent, FormComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  public appService = inject(AppService);
}
