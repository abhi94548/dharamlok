import { Schema, model } from 'mongoose';

const postSchema = new Schema({
	userId : {
		required: true,
		type: String
	},
	description : {
		required: false,
		type: String
	},
	imageUrl : {
		required: false,
		type: String,
	},
	videoUrl : {
		required: false,
		type: String,
	},
	postType : {
		required: true,
		type: String,
	},
	createdAt:{
		type: Date,
		default: Date.now()
	},
},{collection : 'posts'})

export default model('posts',postSchema)
