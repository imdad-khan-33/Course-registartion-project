const express = require('express');
const path = require('path');
const fs = require('fs');
const { verifyToken, isAdmin } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

// Ensure upload directory exists
const uploadDir = 'uploads/courses';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// POST /api/upload/course-image - Upload course thumbnail
router.post('/course-image', verifyToken, isAdmin, upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No image file provided'
            });
        }

        // Return the image URL
        const imageUrl = `/uploads/courses/${req.file.filename}`;

        res.status(200).json({
            success: true,
            message: 'Image uploaded successfully',
            data: {
                filename: req.file.filename,
                imageUrl: imageUrl,
                size: req.file.size
            }
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error while uploading image'
        });
    }
});

// DELETE /api/upload/course-image/:filename - Delete course image
router.delete('/course-image/:filename', verifyToken, isAdmin, async (req, res) => {
    try {
        const { filename } = req.params;
        const filePath = path.join(uploadDir, filename);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            res.status(200).json({
                success: true,
                message: 'Image deleted successfully'
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Image not found'
            });
        }
    } catch (error) {
        console.error('Delete image error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while deleting image'
        });
    }
});

module.exports = router;
