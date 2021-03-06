<?php

namespace App\Http\Controllers\Post;

use Request;
use App\Http\Controllers\Controller;
use Response;
use App\Vote;

class VoteController extends Controller
{


    public static function createVote($id)
    {
        $request = Request::instance();
        // Now we can get the content from it
        $request_body = $request->getContent();
        $data = json_decode($request_body);


        if(self::hasVoted(intval($id), $data->facebook_id)){
            return Response::json(array(
                'result' => false,
                'message' => 'Voted'
            ), 400);
        }else{
            $email = null;
            if(property_exists($data, 'email')){
                $email = $data->email;
            }
            return Vote::create([
                'post_id' => intval($id),
                'facebook_id' => $data->facebook_id,
                'email' => $email,
            ]);
        }
    }

//
//    public static function checkVoted(){
//
//        if(self::hasVoted()){
//            return Response::json(array(
//                'result' => true,
//                'message' => 'Voted'
//            ));
//        }else{
//            return Response::json(array(
//                'result' => false,
//                'message' => 'Voted'
//            ));
//        }
//    }

    private static function hasVoted($post_id, $facebook_id){
        return Vote::where('facebook_id', $facebook_id)->count() > 0;
    }

}