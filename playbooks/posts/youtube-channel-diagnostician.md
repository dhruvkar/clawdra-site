---
layout: playbook.njk
title: "Your Analytics Tell You What Happened. This Agent Tells You Why."
description: "He wired a YouTube data server to a checklist built from three named growth experts, so the agent diagnoses weak hooks and dying thumbnails instead of handing over another dashboard."
date: 2026-08-05
difficulty: Intermediate
cost: "Free. A YouTube API key and a free database tier."
timeToSetup: "A weekend, most of it writing the checklist"
originalSource: "https://www.reddit.com/r/AI_Agents/comments/1vehmfw/i_built_an_ai_agent_that_acts_as_a_youtube_growth/"
originalAuthor: "Positive_Asparagus63"
originalAuthorUrl: "https://www.reddit.com/user/Positive_Asparagus63/"
issueNumber: 25
permalink: /playbooks/youtube-channel-diagnostician/
tags:
  - youtube
  - content
  - analytics
  - marketing
  - small-business
  - smb
  - agency-replacement
---

## Tools

- [**OpenClaw**](#aff-openclaw): the agent that holds the checklist and does the reasoning
- [**Claude Code**](#aff-claude-code): the same job from a terminal
- [**YouTube**](#aff-youtube): the data source, through its free public API
- [**MCP**](#aff-mcp): how the agent gets structured access to that data instead of raw JSON
- [**Obsidian**](#aff-obsidian): a reasonable place to keep the checklist as plain files you can edit

## What You'll Build

An agent that looks at your channel and tells you what is wrong with it.

Not a dashboard. Your analytics page already reports that the video underperformed, which you knew, because you watched the number. What you want is the sentence after that. The hook was slow. The thumbnail is competing with itself. This topic has been flat for four videos and the audience told you why in the comments.

Two pieces make that possible. A tool layer that gives the agent clean access to your channel data, and a checklist of what good looks like, written down, that the agent measures your channel against.

## The Story

Someone posted this on Reddit under the handle Positive_Asparagus63, in r/AI_Agents. Their complaint was specific. Most YouTube tools just hand you numbers and leave you to work out what they mean.

So they built two things. An MCP server for YouTube data, which is the plumbing that lets an agent ask structured questions about a channel. Then a skill called CreatorLens sitting on top, acting as a growth strategist layer.

CreatorLens is the interesting half, and it is not code. It is an extendable checklist of advice they pulled out of videos by Paddy Galloway, Ed Lawrence and Kallaway. Named practitioners, specific rules, written down where the agent can apply them. They point out that adding your own tested rules to it is trivial.

With both pieces in place the agent stops reporting and starts diagnosing. Weak hooks. Poor thumbnails. Content that is flatlining. It also scans your niche for outlier channels worth learning from, using a dedicated outlier-detection tool that filters out noise so you only see channels that genuinely pass a performance check.

The rest of what it does is context-gathering so those judgments are not guesses. It pulls channel stats, top videos and trending videos. It reads transcripts to analyze what was actually said, and comments to read how the audience reacted. It caches all of that in a database so it does not burn API quota answering the same question twice.

Their own takeaway was about design, not YouTube. The interesting part was not wrapping the API. It was choosing a tool set that gives the agent just enough structured data to reason well without drowning it in raw JSON. Fewer, well-scoped tools beat exposing everything the API offers.

## The Checklist Is the Whole Product

Strip this build down and you find something that has nothing to do with video.

The data is free and public. The plumbing is a weekend. What makes the agent useful is that someone sat down and wrote out what good looks like, sourced from people who have actually grown channels, in a form the agent can check against.

That is transferable to any part of your business where expertise exists as scattered advice and your own numbers exist in a dashboard nobody acts on.

The pattern is: take a domain where you know good from bad but the knowledge lives in your head or in other people's talks, write the rules down as an editable list, and give an agent access to both the rules and your data. Then ask it what is wrong.

Nobody needs to write software for this. The rules are a text file. The skill is telling the agent to apply them.

## The Business Angle

**What you are paying now.** A YouTube growth consultant runs $500 to $2,000 a month for a channel audit and ongoing advice, and the deliverable is usually a call plus a document. Agencies that do content strategy retainers start higher. Plenty of businesses skip it entirely and just post, which is its own cost.

**What this costs.** Free. A YouTube Data API key costs nothing, and the caching database runs on a free tier. Your only real spend is model usage.

**What it replaces, honestly.** Not the strategist. It replaces the recurring audit, which is the part of a consultant's job that is a checklist applied to your numbers. The good consultants were always selling judgment about what to make next, and that part holds up.

**Where the real money is for a business channel.** Most companies with a YouTube channel are not trying to become creators. They post because someone said they should, they get a few hundred views, and nobody can say whether it is working or why. This build turns that into a specific answer, which is the difference between abandoning the channel and fixing it.

**And the agency version.** If you sell marketing services, this is a productized channel audit you can run in an afternoon for every client on your roster, with your own rules encoded in the checklist rather than someone else's.

## Who Should Steal This Idea

**Any business running a YouTube channel that is not obviously working.** Which is nearly all of them.

**Course creators and coaches.** Your channel is the funnel. Knowing which hooks hold and which topics stall is the whole business.

**Marketing agencies.** Encode your own methodology in the checklist and run it across every client account.

**Local businesses posting video.** Home services, gyms, restaurants, clinics. You are competing in a small niche where outlier detection actually surfaces useful neighbors to learn from.

**Anyone who already pays for a channel audit.** Run this first and see what is left worth paying for.

**And the wider case.** Anyone with a dashboard they do not act on and a folder of expert advice they never applied. The pattern moves.

## How Hard Is It

A weekend, and the split is unusual. The plumbing is the fast part now. The checklist is where the work is.

Get a free YouTube Data API key. Connect it to your agent so it can pull channel stats, video performance, transcripts and comments. Add a small database for caching so repeat questions do not re-spend your quota.

Then write the checklist, which is the part that decides whether any of it is useful. Watch the people who actually know your field and write their rules down as plain statements the agent can check. Hook must land inside the first ten seconds. Thumbnail must be readable at phone size. Title and thumbnail must not repeat each other. Your own rules go in the same file, and you will add to it every time you learn something.

Follow the source's advice on tools. Give the agent a small number of well-scoped ways to get data rather than everything the API can do. It reasons better with less.

**Cost:** free, aside from model usage.

## Gotchas and Tips

**Write the checklist before you build the plumbing.** The data access is commodity work. If you skip the rules you have built another dashboard, which is the thing you were trying to escape.

**Name your sources in the checklist.** The original pulled from Paddy Galloway, Ed Lawrence and Kallaway. Knowing which rule came from where matters when two of them disagree, and they will.

**Cache aggressively.** The free API quota is real and you will burn it re-asking the same questions. The source used a database purely for this and it is worth copying.

**Fewer tools, better scoped.** The builder's own conclusion. An agent handed every endpoint drowns in raw JSON and reasons worse than one given six clean questions it can ask.

**Feed it comments, not just numbers.** Sentiment on the comment thread often explains the metric. That combination is what makes the output feel like a diagnosis instead of a report.

**Be careful with outlier detection.** Filtering for channels that pass a real performance check is what makes it useful. Without that filter you get a list of large channels, which tells you nothing you did not know.

**Add your own rules as you learn them.** The checklist is the asset and it compounds. Every time a video works and you understand why, write the rule down.

---

## Keep Reading

- **[Fire the Research Analyst: Three Agents That Spy on Your Competitors Every Sunday](/playbooks/youtube-competitor-intel-agents/)**: The outward-facing version, watching 50 competitor channels instead of diagnosing your own.
- **[Post on X and LinkedIn Every Day Without Being a 'Content Person'](/playbooks/daily-content-machine/)**: What to do once you know which topics land.

**Want the full deep dive?** Read our [Best OpenClaw Skills](/learn/best-openclaw-skills/) guide for the foundational patterns this playbook is built on.
