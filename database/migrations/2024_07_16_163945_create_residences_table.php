<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateResidencesTable extends Migration
{
    public function up()
    {
        Schema::create('residences', function (Blueprint $table) {
            $table->id('idResidence');
            $table->string('nomResidence');
            $table->text('description')->nullable();
            $table->foreignId('blocId')->constrained('blocs')->onDelete('cascade');
            $table->integer('nombreAppartements')->nullable();
            $table->double('superficieTotale')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('residences');
    }
}
