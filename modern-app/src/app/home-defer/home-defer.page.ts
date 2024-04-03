import { Component, OnInit } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home-defer',
  templateUrl: './home-defer.page.html',
  styleUrls: ['./home-defer.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomeDeferPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
