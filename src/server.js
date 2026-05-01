const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const authRoutes = require("./routes/auth.routes")
const postRoutes = require("./routes/post.routes")
const userRoutes = require("./routes/user.routes")
const commentRoutes = require("./routes/comment.routes")
const clapRoutes = require("./routes/clap.routes")
const tagRoutes = require("./routes/tag.routes")
const followRoutes = require("./routes/follow.routes")

const app = express();

// CORS configuration — allow frontend URL in production, everything in dev
const corsOptions = {
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
};
app.use(cors(corsOptions));
app.use(express.json());

connectDB();

// Health check endpoint for deployment
app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/auth",authRoutes);
app.use("/api/posts",postRoutes);
app.use("/api/users",userRoutes);
app.use("/api/comments",commentRoutes)
app.use("/api/claps",clapRoutes)
app.use("/api/tags",tagRoutes)
app.use("/api/follow",followRoutes);

// app.use("api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Global error handler — catches unhandled errors from all routes
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err.stack || err.message);
    res.status(err.status || 500).json({
        message: process.env.NODE_ENV === "production"
            ? "Internal Server Error"
            : err.message || "Internal Server Error"
    });
});

const PORT = process.env.PORT ||5000;
app.listen(PORT, ()=>{
    console.log(`server is listening on ${PORT}`);
})