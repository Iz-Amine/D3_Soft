<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserPermissionTable extends Migration
{
    public function up()
    {
        Schema::create('user_permission', function (Blueprint $table) {
            $table->foreignId('idUser')->constrained('utilisateurs')->onDelete('cascade');
            $table->foreignId('idPermission')->constrained('permissions')->onDelete('cascade');
            $table->primary(['idUser', 'idPermission']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('user_permission');
    }
}
