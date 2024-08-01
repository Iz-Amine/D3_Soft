<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBiensTable extends Migration
{
    public function up()
    {
        Schema::create('biens', function (Blueprint $table) {
            $table->id('idBien');
            $table->string('typeBien');
            $table->double('superficie');
            $table->integer('numero')->nullable();
            $table->integer('etage')->nullable();
            // $table->foreignId('residenceId')->nullable()->constrained('residences')->onDelete('cascade');
            $table->string('statut');
            $table->foreignId('userId')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('biens');
    }
}
