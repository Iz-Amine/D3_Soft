<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Projet;
use App\Models\Bloc;

class ProjetController extends Controller
{
    public function index(): Response
    {
        // Fetch all projects from the database
        $blocs = Bloc::all();
        $projets = Projet::where('archived', false)->get();
        $archivedProjets = Projet::where('archived', true)->get();

        // Pass the projects to the Inertia view
        return Inertia::render('Project/Index', [
            'auth' => [
                'user' => auth()->user(), // Pass authenticated user data
            ],
            'blocs' => $blocs,
            'projets' => $projets,
            'archivedProjets' => $archivedProjets,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Project/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'nomProjet' => 'required|string|max:255',
            'description' => 'required|string',
            'adresse' => 'required|string|max:255',
            'superficieTotale' => 'required|string|max:255',
            'documents' => 'required|string|max:255',
        ]);

        Projet::create($request->all());

        return Redirect::route('project.index')->with('success', 'Project added successfully.');
    }

    public function edit(Projet $projet): Response
    {
        return Inertia::render('Project/UpdateProject', [
            'projectData' => $projet,
        ]);
    }

    public function update(Request $request, $idProjet): RedirectResponse
    {
        $request->validate([
            'nomProjet' => 'required|string|max:255',
            'description' => 'required|string',
            'adresse' => 'required|string|max:255',
            'superficieTotale' => 'required|string|max:255',
            'documents' => 'required|string|max:255',
        ]);

        $projet = Projet::findOrFail($idProjet);

        $projet->update($request->all());

        return Redirect::route('project.index')->with('success', 'Project updated successfully.');
    }

    public function archive($id)
    {
        $projet = Projet::findOrFail($id);
        $projet->archived = true;
        $projet->save();

        // return response()->json(['message' => 'Project archived successfully']);
        return redirect()->route('project.index')->with('success', 'Project archived successfully!');
    }

    public function archivedProjects()
    {
        $archivedProjets = Projet::where('archived', true)->get();
        return response()->json(['archivedProjets' => $archivedProjets]);
    }

    public function unarchive($id)
    {
        $project = Projet::find($id);

        if (!$project) {
            return response()->json(['message' => 'Project not found'], 404);
        }

        $project->archived = false;
        $project->save();

        return redirect()->route('project.index')->with('success', 'Project unarchived successfully!');
    }
}
