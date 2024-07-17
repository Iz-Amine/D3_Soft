<?php

namespace Database\Factories;

use App\Models\RolePermission;
use App\Models\Role;
use App\Models\Permission;
use Illuminate\Database\Eloquent\Factories\Factory;

class RolePermissionFactory extends Factory
{
    protected $model = RolePermission::class;

    public function definition()
    {
        return [
            'idRole' => Role::factory(),
            'idPermission' => Permission::factory()
        ];
    }
}

