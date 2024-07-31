<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBlocsTable extends Migration
{
    public function up()
    {
        Schema::create('blocs', function (Blueprint $table) {
            $table->id('idBloc');
            $table->string('nomBloc');  
            $table->string('description')->nullable();
            $table->string('nombreEtages')->nullable();
            $table->string('nombreAppartements')->nullable();
            $table->string('superficieTotale')->nullable();
            $table->unsignedBigInteger('projetId')->default(1)->change();
            $table->foreignId('projetId')->constrained('projets')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('blocs');
    }
}
