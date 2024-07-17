<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Residence extends Model
{
    use HasFactory;

    protected $table = 'residences';
    
    protected $primaryKey = 'idResidence';

    protected $fillable = [
        'nomResidence',
        'description',
        'blocId',
        'nombreAppartements',
        'superficieTotale',
    ];

    public function bloc()
    {
        return $this->belongsTo(Bloc::class, 'blocId');
    }

    public function biens()
    {
        return $this->hasMany(Bien::class, 'residenceId');
    }
}
