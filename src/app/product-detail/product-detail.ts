import { Component, inject, signal } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { StoreApi } from '../shared/store-api';
import type { Product } from '../models/product';


@Component({
  selector: 'app-product-detail',
  imports: [RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {
  private api = inject(StoreApi);
  private route = inject(ActivatedRoute);

  product = signal<Product | null>(null);
  loading = signal(false);
  error = signal('');

  async ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loading.set(true);
    try {
      this.product.set(await this.api.getByIdPublic(id));
    } catch (err) {
      this.error.set((err as Error).message);
    } finally {
      this.loading.set(false);
    }
  }
}
