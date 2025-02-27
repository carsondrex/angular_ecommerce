import { Component, inject, input } from '@angular/core';
import { Product } from '../../../models/products.model';
import { PrimaryButtonComponent } from "../../../components/primary-button/primary-button.component";
import { CartService } from '../../../service/cart.service';
import { ButtonComponent } from "../../../components/button/button.component";

@Component({
  selector: 'app-product-card',
  imports: [PrimaryButtonComponent, ButtonComponent],
  template: `
    <div class="bg-white shadow-md border rounded-xl p-6 flex flex-col gap-6 relative">
      <div class="mx-auto">
        <img [src]="product().image" class="w-[200px] h-[100px] object-contain"/>
        <div class="flex flex-col mt-2">
          <span class="text-md font-bold">{{ product().title }}</span>
          <span class="text-sm">{{ '$' + product().price }}</span>
          @if (product().stock === 0) {
            <app-button label="Sold Out" class="mt-3 w-50" />
          } @else {
            <app-primary-button label="Add to Cart" class="mt-3 w-50" (btnClicked)="cartService.addToCart(product())" />
          }
        </div>

        <span class="absolute top-2 right-3 text-sm font-bold"
        [class]="product().stock ? 'text-green-500' : 'text-red-500'">
          @if (product().stock) {
            {{ product().stock }} left
          } @else {
            Out of stock
          }
        </span>
      </div> 
    </div>
  `,
  styles: ``
})
export class ProductCardComponent {
  product = input.required<Product>();

  cartService = inject(CartService);
}
