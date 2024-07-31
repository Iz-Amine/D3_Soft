<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjetsTable extends Migration
{
    public function up()
    {
        Schema::create('projets', function (Blueprint $table) {
            $table->id('idProjet');
            $table->string('nomProjet');
            $table->string('description')->nullable();
            $table->string('adresse')->nullable();
            $table->string('superficieTotale')->nullable();
            $table->string('documents')->nullable();
            $table->boolean('archived')->default(false); // Ensure this column exists
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('projets');
    }
}
