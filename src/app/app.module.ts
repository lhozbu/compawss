import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MainViewComponent} from './views/main-view/main-view.component';
import {AboutViewComponent} from './views/about-view/about-view.component';
import {TermsViewComponent} from './views/terms-view/terms-view.component';
import {HeaderSectionComponent} from './components/header-section/header-section.component';
import {FooterSectionComponent} from './components/footer-section/footer-section.component';
import {SearchSectionComponent} from './components/search-section/search-section.component';
import {SearchFilterComponent} from './components/search-section/search-filter/search-filter.component';
import {SearchInputComponent} from './components/search-section/search-input/search-input.component';
import {SearchMapComponent} from './components/search-section/search-map/search-map.component';
import {SearchResultsComponent} from './components/search-section/search-results/search-results.component';
import {FormsModule} from "@angular/forms";
import {LoadingModalComponent} from './components/loading-modal/loading-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    AboutViewComponent,
    TermsViewComponent,
    HeaderSectionComponent,
    FooterSectionComponent,
    SearchSectionComponent,
    SearchFilterComponent,
    SearchInputComponent,
    SearchMapComponent,
    SearchResultsComponent,
    LoadingModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
