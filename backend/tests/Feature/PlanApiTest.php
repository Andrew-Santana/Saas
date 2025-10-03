<?php

namespace Tests\Feature;

use App\Models\Plan;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class PlanApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_plans(): void
    {
        // Create test plans
        Plan::factory()->create(['name' => 'Starter', 'is_active' => true]);
        Plan::factory()->create(['name' => 'Professional', 'is_active' => true]);
        Plan::factory()->create(['name' => 'Enterprise', 'is_active' => false]);

        $response = $this->getJson('/api/plans');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => [
                    '*' => [
                        'id',
                        'name',
                        'description',
                        'price',
                        'billing_cycle',
                        'max_users',
                        'features',
                        'is_active',
                        'is_popular',
                        'created_at',
                        'updated_at',
                    ]
                ],
                'message'
            ]);

        // Should only return active plans
        $this->assertCount(2, $response->json('data'));
    }

    public function test_can_show_specific_plan(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);
        
        $plan = Plan::factory()->create();

        $response = $this->getJson("/api/plans/{$plan->id}");

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'id' => $plan->id,
                    'name' => $plan->name,
                ],
                'message' => 'Plano recuperado com sucesso'
            ]);
    }

    public function test_can_create_plan_with_authentication(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $planData = [
            'name' => 'Test Plan',
            'description' => 'A test plan',
            'price' => 29.99,
            'billing_cycle' => 'monthly',
            'max_users' => 10,
            'features' => ['Feature 1', 'Feature 2'],
            'is_active' => true,
            'is_popular' => false,
        ];

        $response = $this->postJson('/api/plans', $planData);

        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
                'data' => [
                    'name' => 'Test Plan',
                    'price' => 29.99,
                ],
                'message' => 'Plano criado com sucesso'
            ]);

        $this->assertDatabaseHas('plans', [
            'name' => 'Test Plan',
            'price' => 29.99,
        ]);
    }

    public function test_plan_validation(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $response = $this->postJson('/api/plans', []);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['name', 'price', 'billing_cycle']);
    }
}
