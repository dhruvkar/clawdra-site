---
layout: playbook.njk
title: "He Tested 8 AI Memory Products Across 2,176 Tasks. A Folder of Text Files Won."
description: "A plain markdown wiki the agent curates itself scored 98.5 and beat every commercial memory product. Here is what the benchmark found, and the three questions to ask before you pay for memory."
date: 2026-08-05
difficulty: Beginner
cost: "Free if you use files. $341 to $569 per 1,000 answers depending on what you pick."
timeToSetup: "An afternoon"
originalSource: "https://www.reddit.com/r/AI_Agents/comments/1veeix3/i_ran_8_ai_agent_memory_systems_through_2176/"
originalAuthor: "Major-Shirt-8227"
originalAuthorUrl: "https://www.reddit.com/user/Major-Shirt-8227/"
issueNumber: 25
permalink: /playbooks/agent-memory-benchmark/
tags:
  - memory
  - second-brain
  - benchmarks
  - small-business
  - smb
  - buying-guide
  - cost
---

## Tools

- [**OpenClaw**](#aff-openclaw): the agent that curates the files and reads them back
- [**Claude Code**](#aff-claude-code): does the same job from a terminal
- [**Hermes**](#aff-hermes): another runtime that works the same way
- [**Obsidian**](#aff-obsidian): a comfortable way to read and edit the markdown yourself
- [**Git**](#aff-git): version history for the memory, which you get free by keeping it in a repo
- [**GitHub**](#aff-github): where the winning approach, Karpathy's llm-wiki pattern, is published

## What You'll Build

A memory your agent maintains as a folder of text files, plus enough information to decide whether you should buy a product instead.

The build is genuinely small. Your agent keeps a set of markdown files, writes to them as it learns things about you and your business, links them together, and reads them before it answers anything. No vendor. No subscription. No API key beyond the model you already pay for.

What makes it worth doing is the evidence behind it. Someone ran eight memory systems through the same test and published the numbers, and the boring approach won by a clear margin.

## The Story

Someone on Reddit under the handle Major-Shirt-8227 asked r/AI_Agents a few weeks back whether anyone had actually made a second brain work. About 75,000 people read the thread, and most of the comments were frustration. They had published a web search benchmark the month before and promised memory tools were next.

So they built the Agentic Memory Index. Same agent setup, eight different memory systems underneath it, 272 scored tasks each. That is 2,176 tasks in total.

The test design is worth copying. Of the 272 tasks, 200 were questions about facts stored across simulated multi-week working relationships. The other 72 were questions about facts that were never stored at all, sitting there to catch systems that invent memories. There was a separate scale test against a 5,000-page store. The judge was calibrated against two independent human labelers before the run.

Then the result. The winner is not a product. A plain markdown wiki that the agent curates itself, following Karpathy's llm-wiki pattern, scored 98.5. Every commercial product came in below it.

Mitosis Cortex was the best hosted product at 96.9. gbrain, a free open-source local tool, scored 92.9 and beat every hosted API except Mitosis Cortex. Mem0 scored 92.3 and was the cheapest per thousand successful answers at $341.

The failures are more instructive than the rankings. Zep's problem was freshness. A fact you just stored took 162.7 seconds at the median before the system could answer a question about it, and it passed 8 of 24 update questions. Supermemory was nearly perfect on recent memories, 59 of 60 on recall, and then passed only 11 of 72 long-horizon questions.

One commenter summed the whole thing up better than the report did. We build all this complex memory infrastructure and the agent just wants a notepad.

## The Part the Headline Leaves Out

The author was honest about the catch in the comments, and you should hear it before you rip out anything you are paying for.

The markdown wiki is the least token-efficient approach in the test, roughly half as efficient as the most efficient tool. It cost $568.93 per thousand successful answers. Mem0, which scored six points lower, cost $341 for the same thousand answers.

So the free thing is not the cheap thing. You are not paying a vendor, you are paying the model to read more text every time it needs to remember something. For a small operation that difference is noise. If you are running an agent that answers hundreds of questions a day, it is a real line on the bill.

The other caveat is collaboration. A folder of markdown files works beautifully for one person and gets awkward the moment several people and several agents need to write to it at once. Nobody has solved that part elegantly yet.

That is the honest shape of the decision. Best accuracy, worst token cost, weakest at collaboration.

## The Business Angle

**What people are about to spend.** Memory is the current upsell in every AI tool pitch. Hosted memory APIs are sold per seat or per call, and the pitch is always that your agent forgets things and this fixes it. Some of those products are good. The best one in this test scored 96.9, which is genuinely close.

**What the benchmark actually buys you.** It moves you from a vendor pitch to three questions you can ask any of them:

How long after I tell you something can you answer a question about it? Zep took 162.7 seconds at the median, which is fine for a nightly digest and useless for a live conversation.

How well do you do on things I told you two months ago? Supermemory was almost perfect on recent facts and failed 61 of 72 long-horizon questions.

What happens when I ask about something I never told you? That is what those 72 planted questions were for, and it is the failure that damages you most, because an invented memory reads exactly like a real one.

**Where the money actually is.** For most small businesses the answer is the free one, and the reason is not the price. It is that you can open the files and read them. When your agent tells a customer something wrong, you want to look at what it believed and fix that line, which you cannot do inside a hosted vector store.

## Who Should Steal This Idea

**Anyone whose agent keeps forgetting the same things.** Your prices, your policies, which clients are difficult, what you decided in March.

**Consultants and agencies.** Everything you know about a client, in files you can hand over or archive when the engagement ends.

**Anyone evaluating a memory vendor right now.** Take the three questions above into the call. The answers separate the real products from the demos quickly.

**Solo operators and small teams.** Markdown wins outright at this size. The collaboration weakness does not apply to you and the token cost is rounding.

**Anyone who got burned by a confident wrong answer.** The planted-question part of this test is the closest thing published to a measurement of that failure.

## How Hard Is It

An afternoon, and most of that is deciding what is worth remembering.

Point your agent at a folder. Tell it to keep notes there as linked markdown files, one topic per file, and to read the relevant ones before answering anything. Tell it to update a file when it learns something that contradicts what is already written. Keep the folder in a git repo so you get history for free and can see what changed when something goes wrong.

Then feed it. The files are worthless empty and get useful fast. Your services and prices, your standard policies, the quirks of your regular customers, the decisions you keep re-explaining.

**Cost:** free to run, though expect the model to read more text per question than a purpose-built product would. Budget for that if you are running high volume.

## Gotchas and Tips

**One topic per file, and link them.** The winning approach is a wiki, not one enormous notes file. The linking is what lets the agent pull only the relevant pages instead of reading everything.

**Make it curate, not just append.** The agent has to rewrite and consolidate its own notes, otherwise you end up with a log that grows forever and contradicts itself in three places.

**Test for invented memories on purpose.** Ask your agent five questions about things you never told it. If it answers confidently rather than saying it does not know, fix that before you let it near a customer.

**Check freshness yourself.** Tell it something, then immediately ask about it. If your setup cannot answer straight away, you have the Zep problem and you need to know that before it matters.

**Keep it in git.** Free version history, and when the agent gets something wrong you can see the exact edit that introduced it.

**Read the files occasionally.** They are plain text, which is the entire advantage. Ten minutes a month reading what your agent believes about your business is the cheapest quality control available.

**If you are high volume, price the tokens before you commit.** The free option cost $568.93 per thousand answers in this test against $341 for the cheapest product. Accuracy went the other way. Pick your side deliberately.

---

## Keep Reading

- **[Give Your AI a Second Brain That Gets Smarter Every Day ($0/Month)](/playbooks/ai-second-brain-karpathy/)**: The build for the exact approach that won this benchmark, step by step.
- **[Your AI Remembers Everything So You Don't Have To](/playbooks/ai-second-brain/)**: The wider case for giving an agent memory at all, if you are still deciding.

**Want the full deep dive?** Read our [Best OpenClaw Skills](/learn/best-openclaw-skills/) guide for the foundational patterns this playbook is built on.
