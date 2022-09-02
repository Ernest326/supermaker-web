import React from "react";
import { createRoot } from "react-dom/client";
import { hop } from "@onehop/client";
import App from "./App";
 
// hop.init should be called as early as possible in your application's lifecycle
hop.init({
	projectId: "project_NTAzMTk3MDc5ODI0MjI0NjE": // replace with your project ID
});
 
createRoot(document.getElementById("root")).render("<h1>Test</h1>");