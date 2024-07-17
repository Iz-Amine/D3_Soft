<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    protected $table = 'roles';
    
    protected $primaryKey = 'idRole';

    protected $fillable = [
        'nomRole',
        'typeRole',
        'description'
    ];

    public function utilisateurs()
    {
        return $this->belongsToMany(Utilisateur::class, 'utilisateur_role', 'idRole', 'idUser');
    }

    public function permissions()
    {
        return $this->belongsToMany(Permission::class, 'role_permission', 'idRole', 'idPermission');
    }
}

