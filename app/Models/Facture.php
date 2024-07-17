<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Facture extends Model
{
    use HasFactory;

    protected $table = 'factures';
    
    protected $primaryKey = 'idFacture';

    protected $fillable = [
        'typeFacture',
        'dateEmission',
        'dateEcheance',
        'montant',
        'statut',
        'description',
        'modePaiement',
        'numeroFacture',
        'categorie',
        'userId'
    ];

    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class, 'userId');
    }
}
