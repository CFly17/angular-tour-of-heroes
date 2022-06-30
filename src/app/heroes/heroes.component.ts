import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[] = [];
  selectedHero?: Hero;

  constructor(private heroService: HeroService,
    // private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
  //   this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  // }

  // getHeroes(): void {
  //   this.heroes = this.heroService.getHeroes();
  // }

  //In the below updated method, Observable.subscribe() is the critical difference.

  //The above version SYNCHRONOUSLY assigns an array of heroes to the component's heroes property.
    //as if the server could return heroes instantly or the browser
    //could freeze the UI while it waited for the server's response.
  
  //The new version waits for the Observable to emit the array of heroes
    //which could happen now or several minutes from now.
    //The subscribe() method passes the emitted array to the callback
    //which sets the component's heroes property.

  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }

}
