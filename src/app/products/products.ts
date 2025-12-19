import { Component, inject, signal } from '@angular/core';
import type { Product } from '../models/product';
import { StoreApi } from '../shared/store-api';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { JsonPipe } from '@angular/common';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {

  private api = inject(StoreApi);

  products = signal<Product[]>([]);
  loading = signal(false);
  error = signal('');

  async ngOnInit() {
    this.loading.set(true);
    try {
      this.products.set(await this.api.listPublic());
    }
    catch (err) {
      this.error.set((err as Error).message);
    } finally {
      this.loading.set(false);
    }
  }
}