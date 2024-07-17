<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFacturesTable extends Migration
{
    public function up()
    {
        Schema::create('factures', function (Blueprint $table) {
            $table->id('idFacture');
            $table->text('typeFacture')->after('userId');
            $table->date('dateEmission')->nullable();
            $table->date('dateEcheance')->nullable();
            $table->double('montant')->nullable();
            $table->string('statut')->nullable();
            $table->text('description')->nullable();
            $table->string('modePaiement')->nullable();
            $table->string('numeroFacture')->nullable();
            $table->string('categorie')->nullable();
            $table->foreignId('userId')->constrained('utilisateurs')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('factures');
    }
}
