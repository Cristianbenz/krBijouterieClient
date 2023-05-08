import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { FormsModule } from '@angular/forms';

import { CardComponent } from "../../components/categoryCard/categoryCard.component";
import { ContactComponent } from "src/app/components/contact/contact.component";
import { CategoryService } from "src/app/services/categoryService";
import { ICategory } from "src/app/models/category";

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, RouterModule, CardComponent, ContactComponent, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  public search = '';
  public categories: Array<ICategory> = []

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _categoryService: CategoryService
  ) { }
  
  ngOnInit(): void {
    this._categoryService.getAll(false)
    .subscribe(response => this.categories = response.data)
  }

  ngAfterViewInit(): void {
    this._route.fragment.subscribe(value => {
      if(value) {
        const el = document.getElementById(value)
        el && el.scrollIntoView({'behavior': 'smooth'})
      }
    })
  }

  submit(evt: any) {
    evt.preventDefault()
    this._router.navigate(['productos/todos', {name: this.search}])
  }
}