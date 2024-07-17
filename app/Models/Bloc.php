<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bloc extends Model
{
    use HasFactory;

    protected $table = 'blocs';
    
    protected $primaryKey = 'idBloc';

    protected $fillable = [
        'nomBloc',
        'description',
        'projetId',
        'nombreEtages',
        'nombreAppartements',
        'superficieTotale',
    ];

    public function projet()
    {
        return $this->belongsTo(Projet::class, 'projetId');
    }

    public function residences()
    {
        return $this->hasMany(Residence::class, 'blocId');
    }
}
