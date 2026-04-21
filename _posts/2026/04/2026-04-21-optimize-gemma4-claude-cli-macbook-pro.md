---
layout: post
title: Optimizing Gemma 4 and Claude CLI for Macbook PRO M2,M3,M4,M5 Pro or Max
summary: A guide to the most optimized configuration for running Gemma 4 and Claude CLI on M2 Max Macs.
categories: ai
tags: gemma4 claude-cli ollama m2-max
date: 2026-04-21 09:00:00 +0000
---

To leverage your **Macbook PRO M2,M3,M4,M5 Pro or Max** with the most optimized configuration for **Gemma 4** and the **Claude CLI**, you should use a combination of persistent environment variables (for performance) and a custom model setup (for intelligence).

Here is the "final" script and configuration plan.

### 1. The "Optimized" Server Startup

Before running the Claude CLI, you need to start the Ollama server with **Flash Attention** and **KV Cache Quantization** enabled. This is what allows your 64GB Mac to handle 64k+ context smoothly.

Run this command to start your local server:

```bash
OLLAMA_FLASH_ATTENTION=1 OLLAMA_KV_CACHE_TYPE=q8_0 ollama serve
```

_Tip: You can add these variables to your `~/.zshrc` so you never have to type them again._

---

### 2. Create the "Claude-Optimized" Model

The Claude CLI works best when the model is specifically configured for high-context coding. Run these lines to create a specialized version of Gemma 4:

```bash
# 1. Create a temporary Modelfile
cat <<EOF > Gemma-Claude.Modelfile
FROM gemma4:31b-it-q8_0
PARAMETER num_ctx 65536
PARAMETER temperature 0.2
PARAMETER top_p 0.9
PARAMETER repeat_penalty 1.1
SYSTEM "You are an expert AI software engineer. You are acting as the backend for the Claude CLI. Follow all tool-use instructions precisely and keep your responses technical and concise."
EOF

# 2. Build the model in Ollama
ollama create gemma4-claude -f Gemma-Claude.Modelfile

# 3. Clean up the temp file
rm Gemma-Claude.Modelfile
```

---

### 3. The "One-Command" Setup for Claude CLI

Finally, you need to tell the Claude CLI to look at your local Mac instead of Anthropic's servers. Add these lines to your `~/.zshrc` (or just run them in your current terminal):

```bash
# Point Claude CLI to your local Ollama instance
export ANTHROPIC_BASE_URL="http://localhost:11434/v1"
export ANTHROPIC_API_KEY="ollama"
export ANTHROPIC_MODEL="gemma4-claude"

# Optional: Disable external telemetry for 100% local privacy
export CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1
```

---

### 4. Running the Session

Now, you have two ways to start coding:

**Method A: The Direct Way (Recommended)**
Since you've set the environment variables above, simply type:

```bash
claude
```

**Method B: The "Launch" Way (Ollama 2026 Native) without Step 3**
If you haven't set the environment variables, the newest versions of Ollama have a shortcut:

```bash
CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1 ollama launch claude --model gemma4-claude
```

### Why this is the best script for you:

1.  **KV Cache Q8:** This saves ~10-15GB of RAM compared to standard `f16` cache, leaving more room for your IDE.
2.  **Flash Attention:** Reduces the "thinking time" (prefill) when you send large files.
3.  **Gemma 4 31B Q8:** You are using a high-precision 8-bit model, which is much more competent for coding than the standard 4-bit (`q4`) models most people use.
4.  **Temperature 0.2:** Locked in via the Modelfile to ensure the CLI tools don't hallucinate.

**Final Check:** In your terminal, run `ollama ls`. If you see `gemma4-claude`, you are ready to go!
