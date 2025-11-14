# HaluMem Demo - AI Memory Hallucination Visualization

An interactive demonstration of memory hallucinations in AI systems, based on the HaluMem research paper that reveals critical flaws with 50%+ failure rates in current AI memory systems.

## Quick Setup

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## What is HaluMem?

HaluMem is a groundbreaking evaluation framework that exposes systemic failures in AI memory systems. Unlike traditional end-to-end testing, HaluMem provides operational-level assessment to diagnose exactly where and why memory failures occur.

![Memory](./memory.jpg)

## Demo Points

### 1. The Problem Overview
**Show the Overview tab**
- Explain the 4 types of memory hallucinations:
  - **Fabrication**: Creating memories that never existed
  - **Error**: Getting key details wrong
  - **Conflict**: Not updating old memories
  - **Omission**: Completely forgetting crucial information
- Show the statistics: 43% max recall, 74%+ omission rates

### 2. Live Demonstration
**Switch to Live Demo tab**
- Run each hallucination type demo:
  - Show how the system inverts preferences (fabrication)
  - Demonstrate name confusion (error)
  - Display conflicting health status (conflict)
  - Show complete memory loss (omission)
- Point out the memory bank on the right showing corrupted memories

### 3. How Memory Operations Work
**Switch to Operations tab**
- Run the success flow first - show how it SHOULD work
- Then run the failure cascade - show how errors compound
- Explain the 4 core operations:
  1. Extract: Pull information from conversation
  2. Store: Save as memory points
  3. Update: Modify when new info arrives
  4. Retrieve: Fetch for context

### 4. The Metrics Deep Dive
**Switch to Metrics tab**
- Show the performance comparison chart
- Highlight the catastrophic degradation with context length
  - Mem0 drops from 43% to 3.2% at 1M tokens
- Show the radar chart comparing different systems
- Explain the hallucination distribution

### 5. System Comparison
**Switch to System Comparison tab**
- Walk through the comparison table
- Point out that NO system achieves acceptable performance
- Highlight universal failures:
  - All systems have <26% update accuracy
  - All have >74% omission rates
- Discuss best vs worst performers

### 6. Why This Matters
**Return to Overview tab**
- Memory is fundamental for agentic AI systems
- Without reliable memory, AI can't:
  - Maintain context in long conversations
  - Learn user preferences
  - Track project state
  - Be trusted with important tasks
- This is a systemic architectural problem, not a minor bug

### 7. Technical Insights for AI Engineers
- Cascading errors: Extraction failures → Update failures → QA failures
- Current architectures lack:
  - Reliable correlation between retrieval and update
  - Constraints on memory formation
  - Interpretable memory operations
- Future solutions need:
  - Dedicated models for each operation
  - Explicit user confirmation for memory creation
  - Clear audit trails for memory modifications

## Key Statistics to Emphasize

- **50%+** Overall failure rate
- **43%** Best recall rate (Mem0)
- **14.5%** Worst recall rate (Memobase)
- **74%+** Omission rate across all systems
- **96.8%** Performance degradation at 1M tokens
- **<26%** Update accuracy for all systems
- **0** Systems achieving >70% accuracy

## Demo Features

### Interactive Components
1. **Live Hallucination Demos**: Real-time visualization of 4 hallucination types
2. **Operation Pipeline**: Step-by-step visualization of memory operations
3. **Performance Metrics**: Interactive charts showing system performance
4. **Comparison Table**: Detailed breakdown of all systems tested

### Visual Elements
- Animated transitions for better engagement
- Color-coded performance indicators
- Real-time memory bank visualization
- Progress indicators for operations

## References

- [HaluMem Paper on ArXiv](https://arxiv.org/...)
- Memory Systems Tested:
  - Mem0
  - Mem0-Graph
  - Memobase
  - Supermemory
