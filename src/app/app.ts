import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppService } from './app.service';
import { DatatableComponent } from './shared/components/datatable/datatable.component';
import { FormComponent } from './shared/components/form/form.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DatatableComponent, FormComponent],
  templateUrl: './app.html',
})
export class App {
  public appService = inject(AppService);
}
