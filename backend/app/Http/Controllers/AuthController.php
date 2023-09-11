<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\StoreUserRequest;

class AuthController extends Controller
{
    public function login(Request $request){
        $request->validate([
            'email'=>'required|string|max:255',
            'password'=>'required|string|min:6'
        ]);

        if(!Auth::attempt(['email'=>$request->email, 'password'=>$request->password])){
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        } else {
            $user = Auth::user();
            return response()->json([
                'user' => $user,
                'token' => $user->createToken('API Token of ' . $user->name)->plainTextToken
            ],200);
        }
    }
    
    public function register(Request $request){
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:6',
        ]);
    
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);
    
        if ($user) {
            return response()->json([
                'user' => $user,
                'token' => $user->createToken('API Token of ' . $user->name)->plainTextToken
            ], 201); // 201 Created status code
        } else {
            return response()->json([
                'message' => 'Something went wrong'
            ], 500);
        }


    }
    public function logout(){
        Auth::user()->currentAccessToken()->delete();
        return response()->json(['message'=>"You have logged out"],200);
    }
}
