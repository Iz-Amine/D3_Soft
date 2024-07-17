<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    use HasFactory;

    protected $table = 'permissions';
    
    protected $primaryKey = 'idPermission';

    protected $fillable = [
        'nomPermission',
        'typePermission',
        'description'
    ];

    public function roles()
    {
        return $this->belongsToMany(Role::class, 'role_permission', 'idPermission', 'idRole');
    }

    public function utilisateurs()
    {
        return $this->belongsToMany(Utilisateur::class, 'user_permission', 'idPermission', 'idUser');
    }
}

