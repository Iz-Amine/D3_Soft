<?php

namespace App\Http\Controllers;

use App\Models\Permission;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PermissionController extends Controller
{
    public function index()
    {
        // $permissions = Permission::all();
        // return Inertia::render('Permissions/Index', ['permissions' => $permissions]);
        $permissions = Permission::all()->groupBy('group');
        return response()->json($permissions);
    }

    public function create()
    {
        return Inertia::render('Permissions/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'guard_name' => 'required',
            'group' => 'nullable|string',
        ]);

        Permission::create($request->all());
        return redirect()->route('permissions.index');
    }

    public function show($id)
    {
        $permission = Permission::findOrFail($id);
        return Inertia::render('Permissions/Show', ['permission' => $permission]);
    }

    public function edit($id)
    {
        $permission = Permission::findOrFail($id);
        return Inertia::render('Permissions/Edit', ['permission' => $permission]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'guard_name' => 'required',
            'group' => 'nullable|string',
        ]);

        $permission = Permission::findOrFail($id);
        $permission->update($request->all());
        return redirect()->route('permissions.index');
    }

    public function destroy($id)
    {
        $permission = Permission::findOrFail($id);
        $permission->delete();
        return redirect()->route('permissions.index');
    }
}
