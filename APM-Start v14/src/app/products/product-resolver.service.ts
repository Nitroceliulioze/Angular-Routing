import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { ProductService } from './product.service';
import { ProductResolved } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductResolver implements Resolve<ProductResolved> {
  constructor(private productService: ProductService) {}
  resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<ProductResolved> {
const id = route.paramMap.get('id');
if (isNaN(Number(id))) {
const message = `Product id was not a number: ${id}`;
console.error(message);
return of({ product: null, error: message });
}

return this.productService.getProduct(Number(id))
.pipe(
  map(product => ({ product: product })),
  catchError(error => {
    const message = `Retrieval error: ${error}`;
    console.error(message);
    return of({ product: null, error: message });
  })
);
}
//   resolve(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): Observable<ProductResolved> {
//     const id = route.paramMap.get('id');
//     if (isNaN(Number(id))) {
//       const message = `Product id was not a number: ${id}`;
//       console.error(message);
//       // return 1 false 2 null 3 navigate to error page; bet cia ner sansu pranesti useriu, kas nutiko. Ta galima issprest: kurti antrika servisa 2 optional parameter error message 3 custom error handler 4 resolved data
//       return of({ product: null, error: message });
//     }
//     return this.productService.getProduct(Number(id)).pipe(
//       map((product) => ({ product: product })),
//       catchError((error) => {
//         const message = `Retrieval error: ${error}`;
//         console.error(message);
//         return of({ product: null, error: message });
//       })
//     );
//   }
}
