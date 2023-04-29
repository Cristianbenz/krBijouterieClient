import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'filters-nav',
  imports: [CommonModule, MatSliderModule, ReactiveFormsModule, MatButtonModule, MatIconModule],
  templateUrl: './filtersNav.component.html',
  styleUrls: ['./filtersNav.component.scss'],
})
export class FiltersNavComponent {
  @Output() applyFilters = new EventEmitter();
  private _initFilter = window.sessionStorage.getItem('filters')
  public filtersForm = this._formBuilder.group({
    name: '',
    minPrice: 0,
    maxPrice: 800,
    dateOrder: '',
    priceOrder: ''
  })

  public price: 'ASC' | 'DESC' | '' = '';
  public date: 'ASC' | 'DESC' | '' = '';

  constructor(
    private _formBuilder: FormBuilder,
  ){
    const savedFilters = this._initFilter ? JSON.parse(String(this._initFilter)) : null
    savedFilters && this.filtersForm.reset(savedFilters)
  }

  order(value: 'ASC' | 'DESC' | '') {
    switch(value) {
      case '':
        return 'ASC'
      case 'ASC':
        return 'DESC'
      default:
        return ''
    }
  }

  orderByPrice() {
    if(this.date) this.date = '';
    const value = this.order(this.price)
    this.price = value
    this.filtersForm.controls.priceOrder.setValue(value)
  }

  orderByDate() {
    if(this.price) this.price = '';
    const value = this.order(this.date)
    this.date = value
    this.filtersForm.controls.dateOrder.setValue(value)
  }

  clear() {
    this.filtersForm.reset({
      name: '',
      minPrice: 0,
      maxPrice: 800,
      dateOrder: '',
      priceOrder: ''
    })
    this.date = '';
    this.price = '';
    this.apply()
  }

  apply(){
    window.sessionStorage.setItem('filters', JSON.stringify(this.filtersForm.value))
    this.applyFilters.emit(this.filtersForm.value);
  }
}