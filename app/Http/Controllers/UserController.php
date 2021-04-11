<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    public function register(Request $request ){

        $request->validate([
            'name'=>['required'],
            'email'=>['required', 'email', 'unique:users'],
            'password'=>['required', 'min:6'],
            'roles'=> ['required'],
            'quote'=> ['required'],
            'author'=> ['required'],
            'avatar'=> ['required'],

        ]);

        User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>Hash::make($request->password),
            'roles'=>$request->roles,
            'quote'=>$request->quote,
            'author'=>$request->author,
            'avatar'=>$request->avatar,
        ]);

    }

    public function delete($id)
    {
        return User::findOrFail($id)->delete();
    }

    public function update(Request $request, $id){

        $request->validate([

            'name'=>['required'],
            'email'=>['required', 'email'],
            'roles'=> ['required'],
            'quote'=> ['required'],
            'author'=> ['required'],

        ]);


        User::where('id', $id)->update([
            'name'=>$request->name,
            'email'=>$request->email,
            'roles'=>$request->roles,
            'quote'=>$request->quote,
            'author'=>$request->author,
        ]);
        
    }

    public function login(Request $request ){

        $request->validate([
            'email'=>['required', 'email'],
            'password'=>['required', 'min:6'],
        ]);

        if (Auth::attempt($request->only('email','password'))){
            return response()->json(Auth::user(),200);
        }
        throw ValidationException::withMessages([
            'email'=>['The provided credentials are incorect.']
        ]);
        
    }

    public function logout(){
        Auth::logout();
    }

    public function userlogged(){

        $user = Auth::user();

        return $user;   

    }
}
