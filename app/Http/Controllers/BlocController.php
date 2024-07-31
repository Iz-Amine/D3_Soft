<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Bloc;
use App\Models\Projet;

class BlocController extends Controller
{
    public function index(): Response
    {
        $blocs = Bloc::all();
        $projets = Projet::all();

        return Inertia::render('Bloc/Index', [
            'blocs' => $blocs,
            'projets' => $projets,
        ]);
    }

    public function create(): Response
    {
        $projets = Projet::all();
        return Inertia::render('Projet/Create', [
            'projets' => $projets, // Pass projects to the Inertia view
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nomBloc' => 'required|string|max:255',
            'description' => 'nullable|string',
            'nombreEtages' => 'required|string|max:255',
            'nombreAppartements' => 'required|string|max:255',
            'superficieTotale' => 'required|string|max:255',
            'projetId' => 'required|exists:projets,idProjet',
        ]);

        Bloc::create($validated);

        return redirect()->back()->with('success', 'Bloc added successfully');
    }

    public function edit(Bloc $bloc): Response
    {
        return Inertia::render('Bloc/UpdateBloc', [
            'blocData' => $bloc,
        ]);
    }

    public function update(Request $request, $idBloc): RedirectResponse
    {
        $request->validate([
            'nomBloc' => 'required|string|max:255',
            'description' => 'required|string',
            'projetId' => 'required|string|exists:projets,id',
            'nombreEtages' => 'required|string|max:255',
            'nombreAppartements' => 'required|string|max:255',
            'superficieTotale' => 'required|string|max:255',
        ]);

        $bloc = Bloc::findOrFail($idBloc);
        $bloc->update($request->all());

        return redirect()->route('blocs.index')->with('success', 'Bloc updated successfully.');
    }

    public function destroy($id)
    {
        $bloc = Bloc::findOrFail($id);
        $bloc->delete();

        return redirect()->route('blocs.index')->with('success', 'Bloc deleted successfully!');
    }
}
