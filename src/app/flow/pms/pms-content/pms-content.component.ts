import { Component } from '@angular/core';

@Component({
  selector: 'app-pms-content',
  templateUrl: './pms-content.component.html',
  styleUrls: ['./pms-content.component.scss']
})
export class PmsContentComponent{
  activeTab: string = 'video';

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}