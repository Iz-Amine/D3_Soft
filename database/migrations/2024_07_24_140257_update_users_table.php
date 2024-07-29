<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->renameColumn('name', 'fname'); // Renaming 'name' to 'fname'
            $table->string('lname')->after('fname'); // Adding 'lname' column
            $table->string('telephone')->nullable()->after('password'); // Adding 'telephone' column
            $table->string('adresse')->nullable()->after('telephone'); // Adding 'adresse' column
            $table->string('CNI')->nullable()->after('adresse'); // Adding 'CNI' column
            $table->date('dateNaissance')->nullable()->after('CNI'); // Adding 'dateNaissance' column
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->renameColumn('fname', 'name'); // Renaming 'fname' back to 'name'
            $table->dropColumn(['lname', 'telephone', 'adresse', 'CNI', 'dateNaissance']); // Dropping new columns
        });
    }
};
