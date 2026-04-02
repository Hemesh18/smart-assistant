import express from "express";
import cors from "cors";
import Bytez from "bytez.js";

const app = express();
app.use(cors());
app.use(express.json());

const key = "033506eb7fb646d158922249ebd8c7c2";
const sdk = new Bytez(key);

// Model (GPT-4o)
const model = sdk.model("openai/gpt-4o");

app.post("/chat", async (req, res) => {
    const userMessage = req.body.message;

    try {
        const { error, output } = await model.run([
            {
                role: "user",
                content: userMessage
            }
        ]);

        if (error) {
            return res.json({ reply: "Error: " + error });
        }

        res.json({ reply: output.text });

    } catch (err) {
        res.json({ reply: "Server error" });
    }
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});