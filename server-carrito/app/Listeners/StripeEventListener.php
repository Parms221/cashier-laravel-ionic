<?php

namespace App\Listeners;

use App\Models\Venta;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;
use Laravel\Cashier\Cashier;
use Laravel\Cashier\Events\WebhookReceived;

class StripeEventListener
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(WebhookReceived $event): void
    {
        Log::info('Stripe Event: ' . $event->payload['type']);
        Log::info($event->payload);

        $type = $event->payload['type'];
        if ($type == "payment_intent.succeeded") {
            $paymentIntent = $event->payload['data']['object'];
            $id = $paymentIntent['id'];

            $session = Cashier::stripe()->checkout->sessions->all([
                'payment_intent' => $id,
            ]);

            if (empty($session['data'])) {
                Log::info('No session found for payment intent: ' . $id);
                return;
            }

            $session = $session['data'][0];

            $venta = Venta::where('session_id', $session['id'])->first();

            if (empty($venta)) {
                Log::info('No venta found for session: ' . $session['id']);
                return;
            }

            $venta->payment_intent_id = $id;
            $venta->status = 'paid';
            $venta->save();
        }
    }
}
