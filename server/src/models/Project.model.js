import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Title is reqired'],
            trim: true,
        },
        techStack: [{ type: String }],
        category: {
            type: String,
            enum: ['fullstack', 'frontend', 'backend', 'mini'],
            default: 'fullstack',
        },
        githubUrl: { type: String, default: '' },
        liveUrl: { type: String, default: '' },
        thumbnail: { type: String, default: '' },
        featured: { type: Boolean, default: false },
        order: { type: Number, default: 0 },
    },

    { timestamps: true }
    
);

export default mongoose.model('Project', projectSchema);