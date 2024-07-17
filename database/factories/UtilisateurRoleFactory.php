<?php

namespace Database\Factories;

use App\Models\UtilisateurRole;
use App\Models\Utilisateur;
use App\Models\Role;
use Illuminate\Database\Eloquent\Factories\Factory;

class UtilisateurRoleFactory extends Factory
{
    protected $model = UtilisateurRole::class;

    public function definition()
    {
        return [
            'idUser' => Utilisateur::factory(),
            'idRole' => Role::factory()
        ];
    }
}

