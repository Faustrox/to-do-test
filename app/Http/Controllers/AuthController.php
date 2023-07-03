<?php

namespace App\Http\Controllers;

use App\Http\Controllers\BaseController as BaseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class AuthController extends BaseController
{
    /**
     * Register api
     *
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'confirm_password' => 'required|same:password',
        ]);

        if ($validator->fails()) {
            Log::warning('Registration validation failed', ['errors' => $validator->errors()]);

            return response()->json(['message' => 'Validation Error.', 'errors' => $validator->errors()], 422);
        }

        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $input['email'] = strtolower($input['email']);

        $existingUser = User::where('email', $input['email'])->first();
        if ($existingUser) {
            Log::warning('Email already registered', ['email' => $input['email']]);

            return response()->json(['message' => 'Email already registered'], 400);
        }

        $user = User::create($input);

        Log::info('User registered successfully', ['user_id' => $user->id]);

        $success['token'] = $user->createToken('MyApp')->plainTextToken;
        $success['name'] = $user->name;

        return response()->json($success, 201);
    }


    /**
     * Login api
     *
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        $emailExists = User::where('email', strtolower($request->email))->exists();
        if (!$emailExists) {
            Log::warning('Login failed: Email does not exist', ['email' => $request->email]);

            return response()->json(['message' => 'Login failed: Email does not exist.'], 404);
        }

        if (Auth::attempt($credentials)) {
            /** @var User $user */
            $user = Auth::user();

            Log::info('User logged in successfully', ['user_id' => $user->id]);

            $success['token'] =  $user->createToken('MyApp')->plainTextToken;
            $success['name'] =  $user->name;

            return response()->json($success, 200);
        }

        Log::warning('Login failed: Incorrect password', ['email' => $request->email]);

        return response()->json(['message' => 'Login failed: Incorrect password.'], 401);
    }
}
