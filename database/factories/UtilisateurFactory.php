<?php

namespace Database\Factories;

use App\Models\Utilisateur;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class UtilisateurFactory extends Factory
{
    protected $model = Utilisateur::class;

    public function definition()
    {
        return [
            'nom' => $this->faker->lastName,
            'prenom' => $this->faker->firstName,
            'email' => $this->faker->unique()->safeEmail,
            'motDePasse' => bcrypt('password'),
            'telephone' => $this->faker->phoneNumber,
            'adresse' => $this->faker->address,
            'CNI' => $this->faker->CNI,
            'dateNaissance' => $this->faker->date,
        ];
    }
}

