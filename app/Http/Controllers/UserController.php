<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Todo;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();

        Log::info('Users fetched from the database', ['count' => count($users)]);

        return response()->json($users);
    }

    public function show()
    {
        $user = auth()->user();

        Log::info('User fetched from the database', ['user_id' => $user->id]);

        return response()->json($user);
    }

    public function changePassword(Request $request)
    {
        /** @var User $user */ // Specify the type of $user as User model
        $user = auth()->user();

        $validatedData = $request->validate([
            'current_password' => 'required',
            'new_password' => 'required|min:8',
        ]);

        // Verify the current password
        if (!Hash::check($validatedData['current_password'], $user->password)) {
            Log::warning('Change password failed: Current password is incorrect');

            return response()->json(['message' => 'Current password is incorrect'], 422);
        }

        // Check if new password is the same as current password
        if ($validatedData['new_password'] === $validatedData['current_password']) {
            Log::warning('Change password failed: New password is the same as the current password');

            return response()->json(['message' => 'New password must be different from the current password'], 406);
        }

        // Update the password
        $user->password = Hash::make($validatedData['new_password']);
        $user->save();

        Log::info('Password changed for user', ['user_id' => $user->id]);

        return response()->json(['message' => 'Password changed successfully']);
    }

    public function deleteAccount()
    {
        /** @var User $user */ // Specify the type of $user as User model
        $user = auth()->user();
        $user_id = $user->id;
        Todo::where('user_id', $user->id)->delete();
        $user->delete();

        Log::info('Account deleted and associated todos for user', ['user_id' => $user_id]);

        return response()->json(['message' => 'Account and associated todos deleted successfully']);
    }
}
