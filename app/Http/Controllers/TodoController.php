<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Todo;
use App\Models\User;


class TodoController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $todos = Todo::where('user_id', $user->id)->get();

        Log::info('Todos fetched from the database', ['user_id' => $user->id, 'count' => count($todos)]);

        
        return response()->json($todos);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
        ]);

        /** @var User $user */ // Specify the type of $user as User model
        $user = auth()->user();
        
        $todo = $user->todos()->create($validatedData);

        Log::info('Todo created', ['user_id' => $user->id, 'todo_id' => $todo->id]);

        return response()->json($todo, 201);
    }

    public function update(Request $request, Todo $todo)
    {
        $user = auth()->user();
        
        if ($user->id !== $todo->user_id) {
            Log::warning('Update todo failed: Not authorized', ['user_id' => $user->id, 'todo_id' => $todo->id]);
            return response()->json(['message' => 'Not authorized'], 403);
        }
        
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
        ]);

        $todo->update($validatedData);

        Log::info('Todo updated', ['user_id' => $user->id, 'todo_id' => $todo->id]);

        return response()->json($todo);
    }

    public function destroy(Todo $todo)
    {
        $user = auth()->user();
        
        if ($user->id !== $todo->user_id) {
            Log::warning('Delete todo failed: Not authorized', ['user_id' => $user->id, 'todo_id' => $todo->id]);
            return response()->json(['message' => 'Not authorized'], 403);
        }
        $todo_id = $todo->id;
        
        $todo->delete();

        Log::info('Todo deleted', ['user_id' => $user->id, 'todo_id' => $todo_id]);

        return response()->json(null, 204);
    }

    public function deleteAllTodos()
    {
        /** @var User $user */ // Specify the type of $user as User model
        $user = auth()->user();

        $user->todos()->delete();
        
        Log::info('All todos deleted', ['user_id' => $user->id]);
        
        return response()->json(['message' => 'All todos deleted successfully']);
    }
}
