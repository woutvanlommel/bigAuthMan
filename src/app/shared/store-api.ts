import { Injectable } from '@angular/core';
import type { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class StoreApi {
  private baseUrl = 'https://localhost:3005/products';
  private fakeBaseUrl = 'https://fakestoreapi.com/products';

  async list(): Promise<Product[]> {
    const response = await fetch(this.baseUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  }

  async listPublic(): Promise<Product[]> {
    const response = await fetch(this.fakeBaseUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch products from public API');
    }
    return response.json();
  }

  async getByIdPublic(id: number): Promise<Product> {
    const response = await fetch(`${this.fakeBaseUrl}/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product from public API');
    }
    return response.json();
  }

  async create(product: Product): Promise<Product> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error('Failed to create product');
    }
    return response.json();
  }

  async createPublic(product: Product): Promise<Product> {
    const response = await fetch(this.fakeBaseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error('Failed to create product');
    }
    return response.json();
  }

  async update(id: number, product: Product): Promise<Product> {
    const response = await fetch(`${this.baseUrl}/${product.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error('Failed to update product');
    }
    return response.json();
  }

  async remove(id: number, product: Product): Promise<void> {
    const response = await fetch(`{$this.baseUrl}/${product.id}`, {
    method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete product');
    }
    return;
  }
}
