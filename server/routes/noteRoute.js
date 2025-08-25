const express=require('express');
const noteRouter=express.Router();
const Note=require('../noteModel');
const { ESLINT_DEFAULT_DIRS } = require('next/dist/lib/constants');
noteRouter.get('/',async (req,res)=>{
   const notes=await Note.find({})
   res.json(notes)
})
noteRouter.post('/notes', async(req,res)=>{
         const {title, description}=req.body
    const note=await Note.create({
        title,
        description
    })
    if(note){
        res.status(201).json(note)
    }
    else{
        res.status(401)
        throw new Error("Invalid note data")
    }
})
noteRouter.put('/notes/:id', async(req,res)=>{
    const {title,description}=req.body
    const note=await Note.findById(req.params.id)
    if(note){ 
        note.title=title || note.title
        note.description=description || note.description
        const updatedNote=await note.save()
        res.json(updatedNote)
    }
    else{
        res.status(404)
        throw new Error("Note not found")
    }
})
noteRouter.delete('/notes/:id',async(req,res)=>{
    const note=await Note.deleteOne({_id:req.params.id})
    if(note){
        res.status(201).json({message:"Note deleted"})
    }
    else{
        res.status(401)
        throw new Error("Invalid note data")
    }
})
module.exports=noteRouter;