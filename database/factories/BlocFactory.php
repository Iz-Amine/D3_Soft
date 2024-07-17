<?php

namespace Database\Factories;

use App\Models\Bloc;
use App\Models\Projet;
use Illuminate\Database\Eloquent\Factories\Factory;

class BlocFactory extends Factory
{
    protected $model = Bloc::class;

    public function definition()
    {
        return [
            'nomBloc' => $this->faker->word,
            'description' => $this->faker->paragraph,
            'projetId' => Projet::factory(),
            'nombreEtages' => $this->faker->numberBetween(1, 10),
            'nombreAppartements' => $this->faker->numberBetween(1, 100),
            'superficieTotale' => $this->faker->numberBetween(100, 1000),
        ];
    }
}

