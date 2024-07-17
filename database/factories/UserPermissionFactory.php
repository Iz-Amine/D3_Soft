<?php

namespace Database\Factories;

use App\Models\UserPermission;
use App\Models\Utilisateur;
use App\Models\Permission;
use Illuminate\Database\Eloquent\Factories\Factory;

class UserPermissionFactory extends Factory
{
    protected $model = UserPermission::class;

    public function definition()
    {
        return [
            'idUser' => Utilisateur::factory(),
            'idPermission' => Permission::factory()
        ];
    }
}

