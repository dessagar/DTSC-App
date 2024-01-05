import { Component } from '@angular/core';
import { TitleService } from './title.service'; // Update the path





@Component({
  selector: 'app-admin_dashboard',
  templateUrl: './admin_dashboard.component.html',
  styleUrls: ['./admin_dashboard.component.scss']
})
export class Admin_dashboardComponent {
  // newCardName = '';
  // isEditing = false;
  // isCardDisabled = false; // Add this property

  // constructor(private titleService: TitleService) {}

  // get cardTitle(): string {
  //   return this.titleService.getCardTitle();
  // }

  // set cardTitle(newTitle: string) {
  //   this.titleService.setCardTitle(newTitle);
  // }

  // toggleEdit() {
  //   if (this.isEditing) {
  //     this.cardTitle = this.newCardName;
  //   }
  //   this.isEditing = !this.isEditing;
  // }

  // deleteCard() {
  //   this.isCardDisabled = true;
  //   console.log('Card deleted or disabled');
  // }
  newCardName = '';
  isEditing = false;
  isCardDisabled = false;

  cards = [
    { title: 'iMedOne Overview', selected: false },
    // Add more card objects as needed
  ];

  constructor(private titleService: TitleService) {}

  get cardTitle(): string {
    return this.titleService.getCardTitle();
  }

  set cardTitle(newTitle: string) {
    this.titleService.setCardTitle(newTitle);
  }

  startEditing() {
    this.isEditing = true;
    this.newCardName = this.cardTitle; // Initialize the input field with the current title
  }

  stopEditing() {
    this.isEditing = false;
    this.cardTitle = this.newCardName;
  }

  deleteCard() {
    this.isCardDisabled = true;
    console.log('Card deleted or disabled');
  }

  deleteSelectedCards() {
    const selectedCards = this.cards.filter((card) => card.selected);
    // Perform deletion logic here (e.g., remove from array)
    for (const selectedCard of selectedCards) {
      const index = this.cards.indexOf(selectedCard);
      if (index !== -1) {
        this.cards.splice(index, 1);
      }
    }
  }
 

}
