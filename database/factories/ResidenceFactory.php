<?php

namespace Database\Factories;

use App\Models\Residence;
use App\Models\Bloc;
use Illuminate\Database\Eloquent\Factories\Factory;

class ResidenceFactory extends Factory
{
    protected $model = Residence::class;

    public function definition()
    {
        return [
            'nomResidence' => $this->faker->word,
            'description' => $this->faker->paragraph,
            'blocId' => Bloc::factory(),
            'nombreAppartements' => $this->faker->numberBetween(1, 100),
            'superficieTotale' => $this->faker->numberBetween(100, 1000),
        ];
    }
}


