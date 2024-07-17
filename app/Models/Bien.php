<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bien extends Model
{
    use HasFactory;

    protected $table = 'biens';
    
    protected $primaryKey = 'idBien';

    protected $fillable = [
        'typeBien',
        'superficie',
        'numero',
        'residenceId',
        'statut',
        'etage',
        'userId'
    ];

    public function residence()
    {
        return $this->belongsTo(Residence::class, 'residenceId');
    }

    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class, 'userId');
    }
}
