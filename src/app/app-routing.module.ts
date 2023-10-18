import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainViewComponent} from "./views/main-view/main-view.component";
import {AboutViewComponent} from "./views/about-view/about-view.component";
import {TermsViewComponent} from "./views/terms-view/terms-view.component";

const routes: Routes = [
  {path: "", component: MainViewComponent},
  {path: "about", component: AboutViewComponent},
  {path: "terms", component: TermsViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
