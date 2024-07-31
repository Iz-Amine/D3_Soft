<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Projet extends Model
{
    use HasFactory;

    protected $table = 'projets';
    
    protected $primaryKey = 'idProjet';
    public $timestamps = false; 

    protected $fillable = [
        'nomProjet',
        'description',
        'adresse',
        'superficieTotale',
        'documents',
        'archived'
    ];

    public function blocs()
    {
        return $this->hasMany(Bloc::class, 'projetId');
    }
}

