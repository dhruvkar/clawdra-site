---
layout: playbook.njk
title: "Your Business Has No CFO. This One Is Free and Remembers Last Quarter."
description: "OpenExecutive is an open source AI executive team. Eight specialists behind one voice, with memory of every decision it gave you. 1,544 stars and the front page of Hacker News in a week."
date: 2026-09-01
difficulty: Intermediate
cost: "Free and open source. You pay Anthropic for usage, roughly $20-100/mo depending on how much you ask it."
timeToSetup: "An evening to install. A weekend if you feed it your own documents first."
originalSource: "https://github.com/SenteLabsAI/OpenExecutive"
originalAuthor: "SenteLabsAI"
issueNumber: 28
permalink: /playbooks/open-source-ai-c-suite/
tags:
  - agents
  - strategy
  - finance
  - operations
  - small-business
  - smb
  - claude
---

## Tools

- [**OpenExecutive**](#aff-openexecutive): the whole thing. Free, open source, runs on your machine
- [**Anthropic**](#aff-anthropic): the API key it runs on. This is the only line item
- [**Claude**](#aff-claude): the model doing the thinking, Sonnet for most of it
- [**SQLite**](#aff-sqlite): where it keeps what it told you. No setup, it just makes the file
- [**GitHub**](#aff-github): where you get it

## What You'll Build

An executive team that answers one question at a time.

You ask about pricing. Behind the answer, a CFO looks at your unit economics, a CMO looks at your positioning, and a general counsel checks whether you can actually say that. You get one reply in one voice.

Then it writes down what it told you.

Next month you ask a related question and it opens with what it advised you in August. That part is the whole point.

## The Story

Somebody's CEO fired developers to make room for AI.

So developers built an open source AI CEO. That headline went to the front page of Hacker News on August 27th and did 941 points and 637 comments in a day.

The joke landed. The repo underneath it is real.

OpenExecutive is 1,544 stars, 106 forks, Apache 2.0, and was last updated the same day it hit the front page. It is a FastAPI backend and a Next.js frontend, and it runs on your own machine against your own API key.

Eight specialists sit behind it:

- Chief Strategy Officer, for competitive analysis and positioning
- Chief Financial Officer, for modeling, unit economics, cash flow
- Chief HR Officer, for hiring, comp, performance
- General Counsel, for contracts, IP, employment basics
- Chief Operating Officer, for process and vendors
- Chief Marketing Officer, for go to market and brand
- Chief Product Officer, for roadmap and prioritization
- Board Communications, for the deck and the investor update

You never see them. You ask a question, an orchestrator fans it out to whichever specialists matter, each one pulls what it needs, and one answer comes back in one voice.

Two retrieval layers feed every specialist. The first is built in business knowledge that ships with the repo. The second is your documents, which you upload and it chunks into its own store. So the CFO answering you has read your actual P&L, not a generic one.

## The Part Nobody Else Does

After every answer, a cheap background pass reads the conversation and pulls out the decisions and initiatives. Those go into a SQLite file on your disk.

Open a new session next month and it starts with a block of what it recommended before.

That is the difference between an assistant and an advisor. An assistant answers the question in front of it. This thing knows it told you in August to hold off on the second van, and it will bring that up when you ask about hiring in October.

There is also a scheduler that surfaces follow ups on its own. If it flagged something as time sensitive, it comes back to you without being asked.

## The Business Angle

Price out the seats you are replacing.

A fractional CFO runs $2,000 to $5,000 a month. A business attorney reading a contract for the first time is $400 to $2,000 a pop, and that is the number Scott Galloway quoted when he said he was cutting his legal spend by a third this year.

Most small businesses buy none of it. They make the call themselves at 11pm and find out in eighteen months whether it was right.

That is the actual customer here. A business that never had a CFO and has been guessing for nine years.

One founder in that Hacker News thread put it plainly. He runs a Hermes agent as his boss, it hands him three tasks every morning, and it keeps the memory of the whole business. His line was that there were things he would have completely missed without it.

## Who Should Steal This Idea

Owners running a business with no executive layer. One to twenty employees, profitable, and the strategy conversation happens in your own head or with your spouse.

Also anyone about to buy their first serious piece of advice. Run the question through this first so you walk into the paid hour knowing what to ask.

## How Hard Is It

Needs a developer, but just once.

It is a Python and Next.js app. Somebody has to install it, put in an API key, and upload your documents. After that anyone can use it.

Cost: free software. Your Anthropic usage is the bill, and it is small because the expensive model only runs the orchestration.

## Gotchas and Tips

**Feed it your real documents or skip it.** Out of the box it gives you competent generic business advice, which you can already get. The value shows up when the CFO has your P&L and the COO has your actual process docs. Budget the upload time.

**Run one instance.** The scheduler claims jobs in a way that assumes a single copy is running. Two copies will fire the same follow up twice.

**It is advice, and it is confident.** Anything with legal or tax consequence still goes to a human who carries insurance. Use it to know what to ask.

**The memory is the feature, so protect the file.** That SQLite database is the only thing that makes this different from a chat window. Back it up.

**Ask it questions with stakes.** People test these things with "write me a marketing plan" and get slop. Ask it whether you should take the January order at 22 percent margin. That is where it earns the install.

## Keep Reading

- [Set Up a 4-Agent Business Team on a Mac Mini](/playbooks/four-agent-team/)
- [Run Your Business on AI (While Living Your Life)](/playbooks/one-person-agency/)
- [Your AI Remembers Everything So You Don't Have To](/playbooks/ai-second-brain/)
