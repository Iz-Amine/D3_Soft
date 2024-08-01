<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $users = User::all();
        // $users = User::all();
        $users = User::with('roles')->get();
        $roles = Role::all();
        // return response()->json(['users' => $users, 'success' => 'Users fetched successfully!'], 200);
        return Inertia::render(
            'Users/Users',
            [
                'users' => $users,
                'roles' => $roles
            ]
        );
    }

    public function store(Request $request)
    {
        $request->validate([
            'fname' => 'required|string|max:255',
            'lname' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'telephone' => 'nullable|string|max:255',
            'adresse' => 'nullable|string|max:255',
            'CNI' => 'nullable|string|max:255',
            'dateNaissance' => 'nullable|date',
            'roles' => 'required|array',
            'roles.*' => 'exists:roles,name',
        ]);

        $user = User::create([
            'fname' => $request->fname,
            'lname' => $request->lname,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'telephone' => $request->telephone,
            'adresse' => $request->adresse,
            'CNI' => $request->CNI,
            'dateNaissance' => $request->dateNaissance,
        ]);

        $user->syncRoles($request->roles);
        // return response()->json(['success' => 'User created successfully!'], 200);  

        return redirect()->route('users')->with('success', 'User created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'fname' => 'required|string|max:255',
            'lname' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $id,
            'password' => 'nullable|string|min:8|confirmed',
            'telephone' => 'nullable|string|max:255',
            'adresse' => 'nullable|string|max:255',
            'CNI' => 'nullable|string|max:255',
            'dateNaissance' => 'nullable|date',
            'roleIds' => 'required|array',
            'roleIds.*' => 'exists:roles,id',
        ]);

        $user = User::findOrFail($id);
        $user->fname = $request->fname;
        $user->lname = $request->lname;
        $user->email = $request->email;
        if ($request->password) {
            $user->password = Hash::make($request->password);
        }
        $user->telephone = $request->telephone;
        $user->adresse = $request->adresse;
        $user->CNI = $request->CNI;
        $user->dateNaissance = $request->dateNaissance;
        $user->save();

        // Sync roles
        $user->syncRoles($request->roleIds);

        // return response()->json(['success' => 'User updated successfully!'], 200);
        return redirect()->route('users')->with('success', 'User updated successfully!');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        // return response()->json(['success' => 'User deleted successfully!'], 200);

        return redirect()->route('users')->with('success', 'User deleted successfully!');
    }

    /**
     * Restore the specified resource from storage.
     */
    public function restore(string $id)
    {
        $user = User::withTrashed()->findOrFail($id);
        $user->restore(); // Restore the soft deleted user
        return response()->json(['success' => 'User restored successfully!'], 200);
    }
}
