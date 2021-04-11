<?php

namespace App\Http\Controllers;


use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function store(Request $request ){
  

        $request->validate([
            'name'=>['required'],
            'title'=>['required'],
            'content'=>['required'],
            'date'=>['required'],
            'status'=>['required'],
            
        ]);

        Task::create([

            
            'user_id' => Auth::id(),
            'name'=>$request->name,  
            'title'=>$request->title,
            'content'=>$request->content,
            'date'=>$request->date,
            'status'=>$request->status,
            
        ]); 

    }

    public function index(){

            $task = Task::all();
    
            return $task;   

    }

    public function update(Request $request, $id){

    
        Task::where('id', $id)->update(array('status' => $request->status));
        
    }

    public function destroy($id)
    {
        return Task::findOrFail($id)->delete();
    }
}
