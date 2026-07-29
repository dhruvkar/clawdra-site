---
layout: playbook.njk
title: "Culling 3,000 Wedding Photos Without Paying to Look at Them All"
description: "His daughter's photographer delivered 3,000 photos. An agent built him a five-stage pipeline that clears out the duplicates and the blurry frames with free math, so only a few hundred images ever reach a paid model."
date: 2026-07-29
difficulty: Intermediate
cost: "Pennies to a few dollars per batch, because only a few hundred images ever reach a paid model"
timeToSetup: "A weekend, and it runs on every batch after that"
originalSource: "https://www.reddit.com/r/hermesagent/comments/1v34auv/"
originalAuthor: "clrudolphi"
originalAuthorUrl: "https://www.reddit.com/user/clrudolphi/"
issueNumber: 24
permalink: /playbooks/photo-culling-pipeline/
tags:
  - photography
  - image-processing
  - cost-control
  - computer-vision
  - creative
  - small-business
  - weddings
---

## Tools

- [**Hermes**](#aff-hermes): the agent that designed and built the whole pipeline from a conversation
- [**OpenClaw**](#aff-openclaw): alternative agent runtime for the same build
- [**Claude Code**](#aff-claude-code): another alternative that does the same jobs
- [**Anthropic**](#aff-anthropic): the Claude models that make the final keep-or-cull judgment, cheap one first
- [**Docker**](#aff-docker): keeps the whole thing in a container so nothing gets permanently installed on your computer
- [**Python**](#aff-python): what the pipeline is written in, and it serves the review page too

## What You'll Build

A machine that takes a folder of a few thousand photos and hands you back the couple hundred worth looking at, grouped by moment, with a simple web page for making the final calls.

The more useful thing you are building is a cost pattern that applies well beyond photos.

It comes down to the order of operations. Instead of showing every photo to an expensive AI, you run a gauntlet of filters that get smarter and pricier as they go. Cheap math clears out the obvious duplicates, groups what survives by scene, and drops the blurry and badly exposed frames. Only what makes it through all of that gets shown to a model that charges you per look.

Out of 3,000 photos in the original, the paid AI was only asked about a few hundred. That is roughly ninety percent of the bill eliminated before it was ever incurred, without giving up any quality on the decisions that actually needed judgment.

If you take one thing from this playbook, take the order: cheap filters first, expensive intelligence last.

## The Story

This came out of a Reddit thread where people were sharing what they use their agents for. A user going by clrudolphi had a very specific and very relatable problem.

His daughter got married. The wedding photographer delivered about 3,000 photos.

If you have ever been on the receiving end of a professional photo dump, you know how little it feels like a gift and how much it feels like homework. Somewhere in those 3,000 frames are the eighty pictures that belong in the album. The rest are burst-mode duplicates, shots where someone blinked, shots where the focus missed, the same table from four angles, and forty near-identical frames of the first dance.

Nobody wants to look at 3,000 photos, so nobody does, and the album never gets made, and the whole thing sits on a drive forever.

He asked his agent to solve it. Two constraints, both of which shaped the entire design: keep the AI costs down, and leave no permanent mess on his Windows workstation.

Those constraints are why the build is worth studying. Anybody can throw 3,000 images at an AI and get an answer back. He got the same answer for a fraction of the money.

## The Five Stages

The gauntlet runs in five stages, translated here out of the technical terms.

**Stage one: kill the obvious duplicates. Free.** When a photographer holds down the shutter, you get eight nearly identical frames. The pipeline shrinks each image down to a tiny thumbnail and generates a kind of fingerprint from it. Images with nearly identical fingerprints are the same moment. No AI involved at all, just a similarity score. This alone removes a huge share of a wedding gallery.

**Stage two: group what is left by scene. Nearly free.** Now it needs to understand what each photo is of, so it can put the ceremony shots together, the reception shots together, the getting-ready shots together. It uses an image-understanding model that turns each picture into a set of numbers describing its content, then clusters photos whose numbers are close. No chatbot is involved and nothing gets described in words. This is a small, fast, single-purpose model that runs on your own machine and costs essentially nothing.

**Stage three: throw out the technically bad ones. Free.** Classic image analysis, the kind that has existed for twenty years and involves no machine learning whatsoever. Is it blurry? Is it badly exposed? Is it visually empty? Out. His own note on this stage is that there is no model here at all, just math on pixels.

**Stage four: now, finally, ask the AI. This is the only part that costs money.** Whatever made it through the first three stages gets shown to a vision-capable Claude model, which actually looks at the photo and makes the keep-or-cull call, and explains why. And even here he was careful. It runs the cheap fast model first, and only escalates to the more expensive one when the cheap model is not confident.

**Stage five: you make the final call.** The pipeline generates a web page where he flips through the survivors, grouped by scene, and picks what goes in the album.

## The Review Page Is a Single File

The review interface is one self-contained HTML file. Plain JavaScript, hand-written styling, no frameworks, no build step, nothing to install. Your keep and cull decisions live in the page itself and are saved in your browser, so you can close it and come back. A tiny built-in web server serves it locally.

An agency would have built this as a web app with a backend, a database, and a login screen, and taken three weeks doing it. His version is one file that does the job, and when the wedding is over he deletes it.

When you ask an agent to build you a tool, say the words "single self-contained HTML file, no frameworks, no build step." You will get something you can actually use and understand, today, instead of a small software project you now maintain.

## The Business Angle

Two ways to count the money here, and the second is the one to take with you.

**The obvious one.** Photo culling is a real service that real photographers pay for. Outsourced culling runs anywhere from a few cents per image to $40 an hour, and a 3,000-image wedding is commonly a $150 to $400 job. Wedding photographers shoot dozens of weddings a year. If you are a photographer, that is thousands of dollars a year, or, more likely, that is you doing it yourself at midnight because you cannot bear to pay for it.

For the rest of us there is no bill, just the album that never got made.

**The one to take with you.** Look at the ratio again. Three thousand images went in, a few hundred reached a paid model. He designed roughly ninety percent of his AI bill out of existence before running a single expensive call, and the quality of the decisions did not suffer, because everything he filtered out was junk that never needed judgment.

Most people wire an expensive model into the front of their process, get a surprising bill, and conclude that AI is too expensive for their business. Usually the problem is that they asked a very expensive brain to do work cheap math could have handled first.

Sorting mail, screening resumes, reviewing invoices, triaging support tickets, grading leads, checking documents. Every one of these has cheap deterministic filters that can eliminate most of the pile before anything intelligent needs to look at it.

## Who Should Steal This Idea

**Wedding and event photographers.** The obvious one. This is your culling workflow, and it groups by scene while it is at it.

**Real estate photographers and videographers.** Dozens of shots per property, most of them redundant, on a deadline.

**Anyone running product photography.** Hundreds of shots per product, you need the six good ones.

**Insurance adjusters, contractors, and inspectors.** You come back from a site with two hundred photos of a roof. You need the twelve that show damage, grouped by area. That is exactly this pipeline with different instructions in the last stage.

**Anyone with a security camera archive.** Same structure. Cheap motion and quality filters first, AI only on the frames that survive.

**Anyone about to point an AI at a big pile of anything.** The photos are incidental here. The gauntlet is the part to copy.

## How Hard Is It

Weekend project, and this is a very good use of an agent.

You are not going to hand-build a five-stage image pipeline. You are going to describe the problem and the two constraints, exactly as he did: keep the AI costs down, and do not permanently install anything on my computer. A capable agent will propose something like this structure on its own, because it is the sensible answer.

The instruction worth stealing verbatim is the one about cost. Say "sort my photos" and you get a script that sends all 3,000 to a paid model. Say "sort my photos and keep the AI costs as low as possible" and you get the gauntlet. One sentence produced the entire design.

Everything runs in a container, so when you are done, it all disappears cleanly.

**Cost:** pennies to a few dollars per batch. The first three stages cost nothing but electricity. Only the few hundred survivors reach a paid model, and most of those are answered by the cheapest one.

## Gotchas and Tips

**State your cost constraint out loud, up front.** "Minimize what I spend on AI calls" is not a detail to mention later. Say it first and you get a completely different design back.

**Say "no lasting installation on my machine."** His second constraint got him a containerized build that cleans up after itself. Without it you end up with half-installed Python libraries you will be confused by in six months.

**Ask for the tiers.** Cheap model first, escalate to the expensive one only when the cheap one is unsure. That pattern applies to almost everything and most people never ask for it.

**Ask it to explain each call.** His pipeline has the model give a reason for keeping or culling. That is what lets you spot-check whether it understands your taste, rather than trusting a silent verdict.

**Never let it delete anything.** The pipeline should move, tag, or list. Not delete. You want to be able to disagree with it a week later.

**Group by moment, not just by quality.** The scene clustering is what makes the review page usable. Twenty good photos scattered randomly is still work. Twenty good photos sorted into ceremony, toasts, and dancing is a decision you can make in five minutes.

**Tune the aggressiveness on one folder first.** Run it on 300 photos from one event and look at what it threw out before you point it at your whole archive. The blur threshold in particular is a matter of taste, and an artsy shallow-focus shot can look like a mistake to a math filter.

---

## Keep Reading

- **[He Spent $1,263 on AI in One Month. Then He Capped It.](/playbooks/ai-budget-cap/)**: The other half of cost control. This playbook keeps the bill from happening, that one stops it once it has.
- **[Snap a Photo, Get a Live Shopify Listing in Minutes](/playbooks/photo-to-shopify-listing/)**: Pointing AI at your images to make money instead of to sort them.

**Want the full deep dive?** Read our [Best OpenClaw Skills](/learn/best-openclaw-skills/) guide for the foundational patterns this playbook is built on.
