<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUtilisateurRoleTable extends Migration
{
    public function up()
    {
        Schema::create('utilisateur_role', function (Blueprint $table) {
            $table->foreignId('idUser')->constrained('utilisateurs')->onDelete('cascade');
            $table->foreignId('idRole')->constrained('roles')->onDelete('cascade');
            $table->primary(['idUser', 'idRole']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('utilisateur_role');
    }
}
