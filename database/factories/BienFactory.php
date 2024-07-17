<?php

namespace Database\Factories;

use App\Models\Bien;
use App\Models\Residence;
use App\Models\Utilisateur;
use Illuminate\Database\Eloquent\Factories\Factory;

class BienFactory extends Factory
{
    protected $model = Bien::class;

    public function definition()
    {
        return [
            'typeBien' => $this->faker->randomElement(['Appartement', 'Maison', 'Studio']),
            'superficie' => $this->faker->numberBetween(20, 200),
            'numero' => $this->faker->numberBetween(1, 100),
            'residenceId' => Residence::factory(),
            'statut' => $this->faker->randomElement(['Disponible', 'Vendu', 'Loué']),
            'etage' => $this->faker->numberBetween(1, 10),
            'userId' => Utilisateur::factory()
        ];
    }
}

