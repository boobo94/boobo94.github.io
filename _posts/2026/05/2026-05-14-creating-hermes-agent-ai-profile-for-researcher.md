---
layout: post
title: Creating an Hermes Agent AI profile for researcher
summary: Learn how to configure Hermes and Gemma 4 for high-stakes research tasks on powerful hardware like M5 Max.
categories: research, tools, tutorials
tags: hermes, gemma4, ollama, ai-agents, research
date: 2026-05-14 00:00:00 +0000
cover: https://tse4.mm.bing.net/th/id/OIG1.sGUky.3a012Ess9NN72F?pid=ImgGn
# redirect_from:
# - /old1-route
# - /old2-route
# canonical_url: https://example.com
# sitemap: false // don't add it to sitemap
---

To apply these settings to your Hermes/Gemma 4 setup, you need to interface with two distinct layers: the **Ollama model definition** (for the hardware/inference parameters) and the **Hermes configuration files** (for the agent’s behavior).

Since you are on an M5 Max with 128GB of RAM, you have plenty of overhead to push these limits.

---

## 1. Configure Ollama (Hardware & Logic)

Ollama settings like `num_ctx` (context window) and `temperature` must be set at the model level before launching Hermes. The best way is to create a custom "Research Model" profile.

**Run these commands in your terminal:**

1. Launch the Gemma 4 prompt:
   `ollama run gemma4:26b`
2. Set the parameters inside the prompt:
   `>>> /set parameter num_ctx 32768`
   `>>> /set parameter temperature 0.7`
   `>>> /set parameter top_p 0.95`
3. Save it as a new model:
   `>>> /save gemma4:26b-research`
   `>>> /bye`

> **Note:** Now, when you start Hermes, make sure to point it to `gemma4:26b-research`.

---

## 2. Configure Hermes (Agent Behavior)

Hermes settings are stored in `~/.hermes/config.yaml`. You can edit this file directly or use the CLI.

### Set High-Stakes Research Mode

Run the following CLI commands to update your configuration:

- **Increase Iterations:** (Prevents the agent from giving up too early during research)
  `hermes config set agent.max_iterations 60`
- **Context Compression:** (With 128GB RAM, you don't need aggressive compression. Setting this to 0.7 allows the agent to keep more "raw" search results in memory before summarizing them)
  `hermes config set agent.context_compression 0.7`
- **Full Transparency:** (This shows you every search query it makes so you can spot the exact moment a hallucination starts)
  `hermes config set agent.tool_progress_display all`

### Update the System Persona

Hermes looks for a file named `SOUL.md` or uses the global system prompt. To enforce the "No Hallucination" rule:

1. Open `~/.hermes/config.yaml`.
2. Look for the `system_prompt` or `persona` section.
3. Add this specific instruction:
   > "You are a research specialist. If a search result does not contain a specific answer, you must state 'Data not found' instead of generating a plausible response. Use the `<thought>` tag for every step."

---

## 3. The `AGENTS.md` Power User Move

This is the most effective way to stop hallucinations for specific projects. Hermes automatically injects any `AGENS.md` file found in your **current working directory** into its prompt.

1. Navigate to your project folder.
2. Create a file named `AGENTS.md`.
3. Paste this inside:

```markdown
# Research Protocol

- Use the 'browser' tool for any claims involving dates, prices, or competitors.
- If the tool returns a 404 or empty result, do not invent the content.
- Cite your sources using [Source Name/URL] at the end of every paragraph.
```

---

## 4. Summary of Commands

| Feature            | Command / File                  | Recommended for M5 Max               |
| ------------------ | ------------------------------- | ------------------------------------ |
| **Switch Model**   | `hermes model`                  | Select `gemma4:26b-research`         |
| **Check Config**   | `hermes config show`            | Verify your current settings         |
| **Context Window** | `ollama /set parameter num_ctx` | `332768` (or higher)                 |
| **Verbosity**      | `hermes config set ...`         | Set `tool_progress_display` to `all` |
| **Debug Mode**     | `hermes --verbose`              | Launches with full log output        |

**Which part of the research usually trips it up—is it finding the right website, or misinterpreting the text once it's on the page?**
