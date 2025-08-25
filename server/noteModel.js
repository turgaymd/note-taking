const express=require('express')
const mongoose=require('mongoose')
const noteSchema=new mongoose.Schema({
title:{
    type:String,
    required:true,
},
description:{
    type:String,
    required:true,
},
},
{
    timestamps:true
}
)
const Note=mongoose.model('Note', noteSchema)
module.exports=Note