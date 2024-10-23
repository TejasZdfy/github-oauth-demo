import { Schema, model } from "mongoose";

const integrationSchema = new Schema({
	userId: { type: String, required: true },
	username: { type: String, required: true },
	token: { type: String, required: true },
	dateConnected: { type: Date, required: true },
});

export default model("github-integration", integrationSchema);
