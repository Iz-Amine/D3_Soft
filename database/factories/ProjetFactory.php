<?php

namespace Database\Factories;

use App\Models\Projet;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProjetFactory extends Factory
{
    protected $model = Projet::class;

    public function definition()
    {
        return [
            'nomProjet' => $this->faker->word,
            'description' => $this->faker->paragraph,
            'adresse' => $this->faker->address,
            'superficieTotale' => $this->faker->numberBetween(100, 1000),
            'documents' => $this->faker->word
        ];
    }
}

