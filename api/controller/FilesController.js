import db, { errMsg } from '../models/index.js'
import file from '../models/file.js'
import post from '../models/post.js';
import fs from 'fs';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class FilesController{
    
    static async index(request, response){

        const {post_id} = request.params
        
        const sequelize = (await db).sequelize;
        const files = await file(sequelize).findAll({where: {
            postId: post_id,
        }})
        
        return response.json(files)
    }

    static async getFile (req, res) {
        const { id } = req.params;
        const sequelize = (await db).sequelize;
        const fileEntry = await file(sequelize).findOne({ where: { id } });
    
        if (!fileEntry) {
            return res.status(404).json({ message: 'File not found.' });
        }
    
        const filePath = path.join(__dirname, '..', fileEntry.url); // Adjust the path as necessary
        res.sendFile(filePath); // Send the file to the client
    }


    static async addFile(req, res) {
        try {
            const { postId, type } = req.body;
    
            // Check if a file is uploaded
            if (!req.file) {
                return errMsg(res, 'No file uploaded.');
            }
    
            const sequelize = (await db).sequelize;
    
            // Check if the post exists
            const postEntry = await post(sequelize).findOne({ where: { id: postId } });
            if (!postEntry) {
                return errMsg(res, "No post found with id " + postId);
            }
    
            // Assuming you're saving the file to the server and getting the file path
            const filePath = `uploads/${req.file.filename}`;
    
            // Create the file entry in the database
            const fileEntry = await file(sequelize).create({
                postId: postId,
                type: type,
                url: filePath, // Store the file path
            });
    
            // Send the response
            return res.status(201).json({
                message: "New file uploaded successfully",
                file: fileEntry.get(),
            });
            
        } catch (e) {
            console.error(e); // Log the error for debugging
            return errMsg(res, e); 
        }
    }

    static async deleteFileFunc(fileId, sequelize) {
        try {
            // Fetch the file record from the database
            const fileEntry = await file(sequelize).findOne({ where: { id: fileId } });
            if (!fileEntry) {
                throw new Error("No file found with id " + fileId);
            }
    
            // Construct the file path
            const filePath = path.join(__dirname, '..', fileEntry.url); // Adjust the path as necessary
    
            // Delete the file from the filesystem
            fs.unlink(filePath, async (err) => {
                if (err) {
                    console.error(err);
                    throw new Error("Could not delete the file.");
                }
    
                // Remove the file entry from the database
                await fileEntry.destroy();
    
                // Return success message
                return {
                    message: "File deleted successfully",
                };
            });
        } catch (e) {
            console.error(e);
            throw new Error(e.message);
        }
    }

    static async deleteFile(req, res) {
        const { fileId } = req.body; // Get file ID from request body
        const sequelize = (await db).sequelize; // Get the sequelize instance
    
        try {
            const message = await FilesController.deleteFileFunc(fileId, sequelize);
            return res.status(200).json(message);
        } catch (error) {
            return errMsg(res, error.message);
        }
    }
    

    

}