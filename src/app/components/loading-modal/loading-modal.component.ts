import {AfterViewInit, Component, Injectable, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'loading-modal',
  templateUrl: './loading-modal.component.html',
  styleUrls: ['./loading-modal.component.css']
})
export class LoadingModalComponent {
  @ViewChild("loadingModal") public loadingModal: any;
  public text : string = "Loading...";

  private instance : any = null;

  /**
   *
   * @param modal
   */
  constructor(private modal : NgbModal) {
  }

  /**
   * Opens the loading modal
   * @param text
   */
  public open(text : string = "Loading...") : void {
    this.text = text;

    if(this.instance == null) {
      this.instance = this.modal.open(this.loadingModal, {
        backdrop: "static",
        keyboard: false,
        size: "sm"
      });
    }
  }

  /**
   * Closes the loading modal
   */
  public close() : void {
    if(this.instance != null) {
      this.instance.close();
      this.instance = null;
    }
  }
}
