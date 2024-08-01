<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $permissions = [
            // Add your permissions here
            'create-post',
            'view-post',
            'edit-post',
            'delete-post',

            'create-project',
            'view-project',
            'edit-project',
            'delete-project',

            'create-user',
            'view-user',
            'edit-user',
            'delete-user',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission, 'guard_name' => 'web']);
        }
    }
}
