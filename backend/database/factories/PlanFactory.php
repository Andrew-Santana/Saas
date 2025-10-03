<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Plan>
 */
class PlanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->words(2, true),
            'description' => fake()->sentence(),
            'price' => fake()->randomFloat(2, 9.99, 199.99),
            'billing_cycle' => fake()->randomElement(['monthly', 'yearly']),
            'max_users' => fake()->numberBetween(5, 100),
            'features' => fake()->words(5),
            'is_active' => true,
            'is_popular' => fake()->boolean(30),
        ];
    }
}
