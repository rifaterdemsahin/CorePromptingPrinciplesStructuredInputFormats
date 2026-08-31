#!/usr/bin/env python3
"""
Shotlist Recording Automation & Production Assistant
Core Prompting Principles & Structured Input Formats — Video 1.1

Usage:
    python3 record_shotlist.py --serve          # Start local web server and open Studio in Chrome
    python3 record_shotlist.py --shot <1-4>     # Open specific shot page in Google Chrome
    python3 record_shotlist.py --teleprompter   # Print CLI teleprompter voiceover script
    python3 record_shotlist.py --check          # Validate all 7 project pages and links
"""

import sys
import os
import time
import subprocess
import http.server
import socketserver
import webbrowser
import argparse
import json

PORT = 8080
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

SHOTS = [
    {
        "id": 1,
        "name": "Architecture & The 4 Core Components",
        "page": "index.html",
        "duration_sec": 24,
        "time_range": "0:00 - 0:24",
        "script": (
            "Welcome to Module 1.1 of the AOU Certified AI Associate Course. "
            "Today we're unpacking the foundational shift that turns unpredictable AI outputs into production-ready results — "
            "core prompting principles and structured input formats. When working with large language models, clarity isn't just about good grammar, "
            "it's about system architecture. Effective prompts contain four key components: a clear role, a rich context, an explicit task, "
            "and strict constraints. When we wrap these components inside structured input formats like Markdown or JSON, "
            "we eliminate ambiguity and make outputs deterministic."
        ),
        "actions": [
            "Start viewport focused on header badge: 'AOU AI Certified Associate • Module 1.1 Workshop'",
            "Smoothly scroll down to the Architecture Flow Diagram",
            "Guide mouse pointer across the 4 nodes: System Prompt (ROLE) -> XML Enclosure -> LLM Attention -> Structured Output",
            "Hover briefly over the 3 core concept cards (Markdown Layer, JSON Schema Layer, XML Delimiters)"
        ]
    },
    {
        "id": 2,
        "name": "Competitive Analysis — Left vs. Right Contrast",
        "page": "comparison.html",
        "duration_sec": 25,
        "time_range": "0:24 - 0:49",
        "script": (
            "Let's see this in action. Look at the left side of your screen: a standard, unstructured prompt asking for a competitive analysis. "
            "It's vague, lacks boundaries, and yields a messy essay. Now, watch what happens on the right when we reframe the exact same request "
            "using Markdown delimiters and a target JSON schema. By defining our system context, providing input parameters inside explicit tags, "
            "and requesting a strict output format, the AI skips the fluff and generates precise, machine-readable data ready for immediate integration."
        ),
        "actions": [
            "Open comparison.html with Scenario 1: Competitive Analysis selected",
            "Highlight the Left Column (Red Border). Point cursor to raw prompt and scroll through unstructured output",
            "Pan smoothly across to the Right Column (Green Border). Highlight ### ROLE, ### CONTEXT, ### TASK, and <competitor_profiles>",
            "Highlight the green JSON output block showing clean key-value arrays (differentiators, competitor_gaps)"
        ]
    },
    {
        "id": 3,
        "name": "Guided Builder — Meeting Notes & Null Constraints",
        "page": "index.html#workshop",
        "duration_sec": 23,
        "time_range": "0:49 - 1:12",
        "script": (
            "Now, let's build one together. Imagine you need an AI assistant to extract key deliverables and action items from raw meeting notes. "
            "First, define the system role and context using Markdown headers. Second, place the raw meeting transcript inside clear XML boundary tags "
            "so the AI knows where the data starts and ends. Third, specify the exact schema for the response. Notice how setting constraints — "
            "like if a deadline is unknown, output null — prevents the model from guessing or hallucinating dates."
        ),
        "actions": [
            "On index.html, click the Hands-On Workshop (DO & APPLY) tab",
            "Focus on form fields on the left: Role (### ROLE), Context (### CONTEXT), and Input Data (<meeting_notes>)",
            "Point to real-time assembled preview on the right and highlight rule: '- If any deadline is unknown, output null. Do not hallucinate dates.'",
            "Click the Copy button on the assembled prompt preview"
        ]
    },
    {
        "id": 4,
        "name": "Exercise 1.1 — The Interactive Prompt Refactor Game",
        "page": "exercise.html",
        "duration_sec": 23,
        "time_range": "1:12 - 1:35",
        "script": (
            "It's your turn to apply this framework. In your course workspace, launch Exercise 1.1, the prompt refactor. "
            "You'll find real-world enterprise prompts that are currently generating inconsistent results. "
            "Your task: Restructure them using the role, context, task, constraint framework, and format the inputs using Markdown headers "
            "and XML boundaries. Test your prompt directly in the interactive sandbox to verify your output structure. "
            "Master this pattern, and you've unlocked the core engine of professional AI productivity. See you in video 1.2."
        ),
        "actions": [
            "Navigate to exercise.html via top navbar link (Refactor Game)",
            "Drag and drop 5 building blocks into slots: ROLE -> CONTEXT -> TASK -> <customer_review> -> CONSTRAINTS",
            "Click Check & Test Prompt. Watch slots turn green, score update to 100 pts, and confetti explosion trigger",
            "Hold view on success banner as closing sentence is spoken"
        ]
    }
]

def open_in_chrome(url_or_path):
    """Opens a URL or local path explicitly in Google Chrome per project rules."""
    cmd = ["open", "-a", "Google Chrome", url_or_path]
    try:
        subprocess.run(cmd, check=True)
        print(f"🌐 Opened in Google Chrome: {url_or_path}")
    except Exception as e:
        print(f"⚠️ Error opening Google Chrome ({e}), falling back to default browser...")
        webbrowser.open(url_or_path)

def serve_studio():
    """Serves the repository locally and opens the Recording Studio in Google Chrome."""
    os.chdir(BASE_DIR)
    handler = http.server.SimpleHTTPRequestHandler
    
    # Allow port reuse
    socketserver.TCPServer.allow_reuse_address = True
    
    with socketserver.TCPServer(("", PORT), handler) as httpd:
        url = f"http://localhost:{PORT}/recording-studio.html"
        print(f"\n🎬 ========================================================")
        print(f"🎙️ Video 1.1 Recording Studio Server Started!")
        print(f"🌐 Live URL: {url}")
        print(f"📂 Serving Directory: {BASE_DIR}")
        print(f"🛑 Press Ctrl+C to stop the local server")
        print(f"========================================================\n")
        
        # Open in Chrome
        open_in_chrome(url)
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n👋 Stopping recording studio server. Good take!")

def print_teleprompter():
    """Prints the complete continuous teleprompter script to CLI."""
    print("\n📜 ========================================================")
    print("🎙️ VIDEO 1.1 CONTINUOUS RECORDING TELEPROMPTER SCRIPT")
    print("========================================================\n")
    for shot in SHOTS:
        print(f"🎬 Shot {shot['id']}: {shot['name']} [{shot['time_range']}]")
        print(f"📄 Target Page: {shot['page']}")
        print(f"🎙️ SCRIPT:")
        print(f"   \"{shot['script']}\"")
        print(f"\n🖱️ ON-SCREEN ACTIONS:")
        for idx, act in enumerate(shot['actions'], 1):
            print(f"   {idx}. {act}")
        print("-" * 56 + "\n")

def check_project():
    """Validates all project HTML files and assets."""
    pages = [
        "index.html",
        "comparison.html",
        "constraints.html",
        "exercise.html",
        "recording-guide.html",
        "shotlist.html",
        "recording-studio.html",
        "automation-guide.html"
    ]
    print("\n🔍 Validating project pages and integrity...")
    all_ok = True
    for p in pages:
        path = os.path.join(BASE_DIR, p)
        if os.path.exists(path):
            size = os.path.getsize(path)
            print(f"  ✓ {p:<24} ({size:,} bytes)")
        else:
            print(f"  ✗ MISSING: {p}")
            all_ok = False
            
    if all_ok:
        print("\n✅ All 7 project pages verified successfully!\n")
    else:
        print("\n❌ Missing files detected!\n")

def main():
    parser = argparse.ArgumentParser(description="Shotlist Recording Director & Automation Suite")
    parser.add_argument("--serve", action="store_true", help="Start local server and open Recording Studio in Chrome")
    parser.add_argument("--shot", type=int, choices=[1, 2, 3, 4], help="Open specific shot page in Chrome")
    parser.add_argument("--teleprompter", action="store_true", help="Print teleprompter voiceover script")
    parser.add_argument("--check", action="store_true", help="Validate all project pages")
    
    args = parser.parse_args()
    
    if args.serve:
        serve_studio()
    elif args.shot:
        shot = next(s for s in SHOTS if s["id"] == args.shot)
        target = os.path.join(BASE_DIR, shot["page"].split("#")[0])
        open_in_chrome(f"file://{target}")
    elif args.teleprompter:
        print_teleprompter()
    elif args.check:
        check_project()
    else:
        check_project()
        print("💡 Tip: Run 'python3 record_shotlist.py --serve' to launch the Recording Studio in Google Chrome.")

if __name__ == "__main__":
    main()
