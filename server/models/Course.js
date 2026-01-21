const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Course title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Course description is required'],
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Course category is required'],
        enum: ['Web Development', 'Graphic Design', 'Business Strategy', 'Data Science', 'Mobile Development', 'Other'],
        default: 'Other'
    },
    image: {
        type: String,
        default: ''
    },
    duration: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        default: 0
    },
    instructor: {
        type: String,
        default: ''
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt field before saving
courseSchema.pre('save', function() {
    this.updatedAt = Date.now();
});

module.exports = mongoose.model('Course', courseSchema);
