<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tasks = Task::where('user_id', Auth::user()->id)->get();
        return response()->json([
            'tasks'=>$tasks,
        ],200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'=>'required|string|max:255',
            'description'=>'required|string|max:255',
            'priority'=>'string'
        ]);

        $task = Task::create([
            'user_id'=>Auth::user()->id,
            'name'=>$request->name,
            'description'=>$request->description,
            'priority'=>$request->priority
        ]);

        if($task){
            return response()->json([
                'task'=>$task
            ],200);
        } else {
            return response()->json([
                'message'=>'Unable to create task'
            ],500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $task = Task::find($id);
        if($task){
            if(Auth::user()->id === $task->user_id){
                return response()->json([$task],200);
            }else{
                return response()->json([
                    'status'=>403,
                    'message'=>"Task not found"
                ],403);
            }
        } else {
            return response()->json([
                'status'=>404,
                'message'=>"Could not find such task"
            ],404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $task = Task::find($id);
        if($task){
            if(Auth::user()->id === $task->user_id){
                $task->update($request->all());
                return response()->json([$task],200);
            }else{
                return response()->json([
                    'status'=>403,
                    'message'=>"Task not found"
                ],403);
            }
        }else {
            return response()->json([
                'status'=>404,
                'message'=>"Could not find such task"
            ],404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $task = Task::find($id);
        if($task){
            if(Auth::user()->id === $task->user_id){
                $task->delete();
                return response(null,204);
            }else{
                return response()->json([
                    'status'=>403,
                    'message'=>"Task not found"
                ],403);
            }
        }else{
            return response()->json([
                'status'=>403,
                'message'=>"Task not found"
            ],403);
        }
    }
}
