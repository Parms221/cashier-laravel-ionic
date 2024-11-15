import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IDetalleVenta } from '../types/detalle';
import { PaymentSheetEventsEnum, Stripe } from '@capacitor-community/stripe';

export interface ICheckoutMobile {
  client_secret: string;
  ephemeral_key: string;
  customer_id: string
}

export interface ICheckoutWeb {
  redirect_url: string;
}

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  private url = `${environment.api_url}/api/ventas`;

  constructor(
    private http: HttpClient,
  ) {
    Stripe.initialize({
      publishableKey: environment.stripe_public_api
    })
  }


  async generateCheckoutMobile(carrito: IDetalleVenta[]) {
    const body = {
      productos: carrito.map((d) => ({
        id: d.producto.id,
        cantidad: d.cantidad
      }))
    }

    try {
      Stripe.addListener(PaymentSheetEventsEnum.Completed, () => {
        console.log('Payment completed');
      })

      const response = await firstValueFrom(this.http.post<ICheckoutMobile>(
        this.url + "/mobile", body
      ));

      console.log(response)
      console.log(response.client_secret)
      console.log(response.ephemeral_key)
      console.log(response.customer_id)

      await Stripe.createPaymentSheet({
        paymentIntentClientSecret: response.client_secret,
        customerId: response.customer_id,
        setupIntentClientSecret: response.ephemeral_key,
        // merchantDisplayName: 'Tienda de ropa',
        // style: "alwaysLight",
      })
      console.log('created payment sheet');

      const result = await Stripe.presentPaymentSheet();
      console.log('result', result);
      if (result.paymentResult === PaymentSheetEventsEnum.Completed) {
        console.log('Payment completed function');
      }
    } catch (error) {
      console.error('Error generating checkout:', error);
    }
  }


  async generateCheckoutWeb(carrito: IDetalleVenta[]) {
    const body = {
      productos: carrito.map((d) => ({
        id: d.producto.id,
        cantidad: d.cantidad
      }))
    }

    try {
      const response = await firstValueFrom(this.http.post<ICheckoutWeb>(
        this.url + "/web", body
      ));

      window.location.href = response.redirect_url;
    } catch (error) {
      console.error('Error generating checkout:', error);
    }
  }

}
