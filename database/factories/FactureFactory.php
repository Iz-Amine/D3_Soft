<?php

namespace Database\Factories;

use App\Models\Facture;
use App\Models\Utilisateur;
use Illuminate\Database\Eloquent\Factories\Factory;

class FactureFactory extends Factory
{
    protected $model = Facture::class;

    public function definition()
    {
        return [
            'typeFacture' => $this->faker->randomElement(['Achat', 'Service', 'Autre']),
            'dateEmission' => $this->faker->date,
            'dateEcheance' => $this->faker->date,
            'montant' => $this->faker->numberBetween(100, 1000),
            'statut' => $this->faker->randomElement(['Payée', 'En attente', 'Annulée']),
            'description' => $this->faker->paragraph,
            'modePaiement' => $this->faker->randomElement(['Carte de crédit', 'Virement bancaire', 'Espèces']),
            'numeroFacture' => $this->faker->unique()->numerify('FACT-#####'),
            'categorie' => $this->faker->word,
            'userId' => Utilisateur::factory()
        ];
    }
}

