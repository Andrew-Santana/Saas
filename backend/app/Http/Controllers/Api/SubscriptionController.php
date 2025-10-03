<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\SubscriptionResource;
use App\Models\Subscription;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SubscriptionController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $subscriptions = auth()->user()->subscriptions()->with('plan')->get();
        
        return response()->json([
            'success' => true,
            'data' => SubscriptionResource::collection($subscriptions),
            'message' => 'Assinaturas recuperadas com sucesso',
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'plan_id' => 'required|exists:plans,id',
            'starts_at' => 'required|date',
            'trial_ends_at' => 'nullable|date|after:starts_at',
        ]);

        // Cancel any existing active subscriptions
        auth()->user()->subscriptions()
            ->where('status', 'active')
            ->update(['status' => 'cancelled']);

        $subscription = auth()->user()->subscriptions()->create([
            'plan_id' => $request->plan_id,
            'status' => 'active',
            'starts_at' => $request->starts_at,
            'trial_ends_at' => $request->trial_ends_at,
        ]);

        $subscription->load('plan');

        return response()->json([
            'success' => true,
            'data' => new SubscriptionResource($subscription),
            'message' => 'Assinatura criada com sucesso',
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $subscription = auth()->user()->subscriptions()
            ->with('plan')
            ->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => new SubscriptionResource($subscription),
            'message' => 'Assinatura recuperada com sucesso',
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $subscription = auth()->user()->subscriptions()->findOrFail($id);

        $request->validate([
            'status' => 'sometimes|in:active,cancelled,expired,pending',
            'ends_at' => 'nullable|date|after:starts_at',
        ]);

        $subscription->update($request->all());
        $subscription->load('plan');

        return response()->json([
            'success' => true,
            'data' => new SubscriptionResource($subscription),
            'message' => 'Assinatura atualizada com sucesso',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        $subscription = auth()->user()->subscriptions()->findOrFail($id);
        $subscription->delete();

        return response()->json([
            'success' => true,
            'message' => 'Assinatura removida com sucesso',
        ]);
    }

    /**
     * Cancel the specified subscription.
     */
    public function cancel(string $id): JsonResponse
    {
        $subscription = auth()->user()->subscriptions()->findOrFail($id);
        
        $subscription->update([
            'status' => 'cancelled',
            'ends_at' => now(),
        ]);

        $subscription->load('plan');

        return response()->json([
            'success' => true,
            'data' => new SubscriptionResource($subscription),
            'message' => 'Assinatura cancelada com sucesso',
        ]);
    }
}
