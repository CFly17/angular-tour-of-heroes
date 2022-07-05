import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  //This component only receives a hero object through its hero property and displays it.
    //There are no more properties or presentation logic. 

  //the Input tag allows the external 'HeroesComponent' to bind to hero property
  @Input() hero?: Hero;

  constructor(
    //ActivatedRoute: interested in the route's parameters extracted from the URL
    //HeroService: gets hero data from the remote server, will use it to get the hero-to-display
    //Location: interacts with the browser, navigates between views:
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getHero();
  }
  
  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  saveChanges(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }

}
