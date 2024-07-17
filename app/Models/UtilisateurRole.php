<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UtilisateurRole extends Model
{
    use HasFactory;

    protected $table = 'utilisateur_role';
    
    protected $fillable = [
        'idUser',
        'idRole'
    ];

    public $timestamps = false;
}

