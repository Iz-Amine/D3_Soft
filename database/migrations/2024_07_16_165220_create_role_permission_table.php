<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRolePermissionTable extends Migration
{
    public function up()
    {
        Schema::create('role_permission', function (Blueprint $table) {
            $table->foreignId('idRole')->constrained('roles')->onDelete('cascade');
            $table->foreignId('idPermission')->constrained('permissions')->onDelete('cascade');
            $table->primary(['idRole', 'idPermission']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('role_permission');
    }
}
