<?php

namespace Database\Seeders;

use App\Models\Plan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $plans = [
            [
                'name' => 'Starter',
                'description' => 'Perfeito para começar',
                'price' => 9.99,
                'billing_cycle' => 'monthly',
                'max_users' => 5,
                'features' => [
                    'Até 5 usuários',
                    '10GB de armazenamento',
                    'Suporte por email',
                    'Relatórios básicos'
                ],
                'is_active' => true,
                'is_popular' => false,
            ],
            [
                'name' => 'Professional',
                'description' => 'Para equipes em crescimento',
                'price' => 29.99,
                'billing_cycle' => 'monthly',
                'max_users' => 25,
                'features' => [
                    'Até 25 usuários',
                    '100GB de armazenamento',
                    'Suporte prioritário',
                    'Relatórios avançados',
                    'Integrações API'
                ],
                'is_active' => true,
                'is_popular' => true,
            ],
            [
                'name' => 'Enterprise',
                'description' => 'Para grandes organizações',
                'price' => 99.99,
                'billing_cycle' => 'monthly',
                'max_users' => null, // Unlimited
                'features' => [
                    'Usuários ilimitados',
                    '1TB de armazenamento',
                    'Suporte 24/7',
                    'Relatórios personalizados',
                    'Integrações ilimitadas',
                    'SLA garantido'
                ],
                'is_active' => true,
                'is_popular' => false,
            ],
        ];

        foreach ($plans as $planData) {
            Plan::create($planData);
        }
    }
}
