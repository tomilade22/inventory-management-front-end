import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from "ag-grid-angular";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { RouterLink, RouterModule, RouterOutlet, Routes } from "@angular/router";
import { IngredientListComponent } from "./ingredient-list/ingredient-list.component";
import { NotFoundComponent } from "./not-found/not-found.component";

const routes: Routes = [

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Default route
  { path: 'dashboard', component: DashboardComponent },
  { path: 'ingredient-list', component: IngredientListComponent },
  { path: '**', component: NotFoundComponent },


]

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AgGridModule
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [

  ]
})
export class AppModule {
}
