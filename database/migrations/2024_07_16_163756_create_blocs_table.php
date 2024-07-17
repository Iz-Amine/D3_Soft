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
            $table->text('description')->nullable();
            $table->foreignId('projetId')->constrained('projets')->onDelete('cascade');
            $table->integer('nombreEtages')->nullable();
            $table->integer('nombreAppartements')->nullable();
            $table->double('superficieTotale')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('blocs');
    }
}
