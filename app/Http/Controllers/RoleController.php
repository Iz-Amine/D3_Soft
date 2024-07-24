<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    // Afficher la liste des rôles et des permissions
    public function index()
    {
        $permissions = Permission::all()->groupBy('group');
        $roles = Role::withCount('permissions')->get();

        return Inertia::render('Roles_Permission/Roles_Permission', [
            'roles' => $roles,
            'permissions' => $permissions,
        ]);
    }

    // Créer un nouveau rôle
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:roles,name',
            'permissions' => 'required|array',
        ]);

        $role = Role::create(['name' => $request->name]);
        $role->syncPermissions($request->permissions);

        return Inertia::location(route('roles'));  // Redirige vers la page des rôles
    }

    // Mettre à jour un rôle existant
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|unique:roles,name,' . $id,
            'permissions' => 'required|array',
        ]);

        $role = Role::findOrFail($id);
        $role->update(['name' => $request->name]);
        $role->syncPermissions($request->permissions);

        // return response()->json(['success' => 'Role updated successfully!'], 200);  
        return Inertia::location(route('roles'));  // Redirige vers la page des rôles
    }

    // Afficher un rôle spécifique
    public function show($id)
    {
        $role = Role::with('permissions')->findOrFail($id);

        return response()->json([
            'role' => $role,
            'permissions' => $role->permissions
        ]);
    }

    // Supprimer un rôle
    public function destroy($id)
    {
        $role = Role::findOrFail($id);
        $role->delete();

        // return response()->json(['success' => 'Role deleted successfully!'], 200);  
        return redirect()->route('roles')->with('success', 'Role deleted successfully!');
    }
}
