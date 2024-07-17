<?php

namespace Database\Factories;

use App\Models\Permission;
use Illuminate\Database\Eloquent\Factories\Factory;

class PermissionFactory extends Factory
{
    protected $model = Permission::class;

    public function definition()
    {
        return [
            'nomPermission' => $this->faker->word,
            'typePermission' => $this->faker->randomElement(['Read', 'Write', 'Execute']),
            'description' => $this->faker->paragraph
        ];
    }
}

