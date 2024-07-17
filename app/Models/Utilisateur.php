<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Utilisateur extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $table = 'utilisateurs';
    
    protected $primaryKey = 'idUser';

    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'motDePasse',
        'telephone',
        'adresse',
        'CNI',
        'dateNaissance',
    ];

    public function roles()
    {
        return $this->belongsToMany(Role::class, 'utilisateur_role', 'idUser', 'idRole');
    }

    public function permissions()
    {
        return $this->belongsToMany(Permission::class, 'user_permission', 'idUser', 'idPermission');
    }

    public function factures()
    {
        return $this->hasMany(Facture::class, 'userId');
    }

    public function depenses()
    {
        return $this->hasMany(Depense::class, 'userId');
    }

    public function biens()
    {
        return $this->hasMany(Bien::class, 'userId');
    }
}
