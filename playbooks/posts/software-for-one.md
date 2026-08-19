---
layout: playbook.njk
title: "Software for One: The App That Only Ever Has to Make Sense to You"
description: "Nobody was ever going to build software for a market of one person. An interpreter built the tool that tracks his assignments, his mileage, and his next two paychecks, because now the math works."
date: 2026-08-12
difficulty: Beginner
cost: "Free if you already pay for Claude and use Google Sheets."
timeToSetup: "An afternoon, and you only build the part that annoys you"
originalSource: "https://news.ycombinator.com/item?id=49134342"
originalAuthor: "kelvinjps10 (Hacker News)"
issueNumber: 27
permalink: /playbooks/software-for-one/
tags:
  - productivity
  - freelance
  - contractors
  - spreadsheets
  - admin
  - small-business
  - smb
---

## Tools

- [**Claude Code**](#aff-claude-code): writes the automation, and turns out to be better at this platform than the platform's own tools
- [**Google Sheets**](#aff-google-sheets): where the data lives, because it already does
- [**Google Apps Script**](#aff-google-apps-script): the free automation layer built into Sheets that almost nobody uses
- [**Google Calendar**](#aff-google-calendar): where the work shows up once it exists
- [**Google Maps**](#aff-google-maps): the mileage math, done by API instead of by hand
- [**OpenClaw**](#aff-openclaw): if you would rather the whole thing run as an agent than as a script

## What You'll Build

A tool with exactly one user. You.

The worked example here: a freelance interpreter's assignment tracker. A new job arrives, and it lands on his calendar, lands in his spreadsheet, calculates its own mileage, and updates a forecast of what his next two paychecks will be.

## The Story

There is an idea going around called Software for One, and it landed hard enough on Hacker News to pull 265 points and nearly 300 comments.

The argument is simple. For the entire history of software, a tool had to justify its existence against a market. Somebody had to want it badly enough, and enough somebodies had to want the same thing, to pay for the months of work it took to build.

That math ruled out almost everything. Most of the friction in most people's working lives is too specific to be worth anyone's time. Not too hard. Too specific.

The best thing in that whole thread was not the essay. It was a comment.

A working interpreter, an independent contractor, described what he built with Claude Code, Google Sheets, and Apps Script. His aside about it is quietly damning: Claude turned out to be better at Google's own scripting platform than anything Google offers for it.

Here is what he was dealing with. His agency pays every two weeks. Between receiving an assignment and getting paid for that assignment, he spends about 45 minutes of admin. Per assignment.

So he built the fix. When a new assignment comes in, it automatically adds itself to his calendar and to his spreadsheet, and it calculates the mileage using the Maps API. The spreadsheet then works out what he is going to receive in his next two paychecks, plus the one currently running.

Nobody on earth was ever going to build that. Not as a product. There is no market for an assignment tracker shaped exactly like one interpreter's agency contract, his car, and his pay cycle.

That is the whole point.

## Why This Is Not Just "Replace Your SaaS"

We have run plenty of plays about killing a subscription. This is a different thing and it is worth keeping them separate.

Replacing a vendor means a product existed, you were paying for it, and now you are not. The tool already had a market. You just stopped being part of it.

Software for one means the product never existed at all. Not because it was hard, but because nobody could ever have made money selling it.

Look at what the interpreter actually built. It is not a competitor to anything. There is no category. It is a workflow that exists in one head, encoded once, running forever.

The category of things that were never worth building is enormously larger than the category of things you currently pay for. That is where the real opportunity sits, and almost nobody is looking at it because there is nothing there to compare against.

## How to Find Yours

You already know what it is. The test is not creativity, it is noticing.

**Find the thing you do that nobody else does the same way.** If your process matched everyone else's, a product would already exist for it. The friction lives in the parts that are specific to you: your client's weird intake format, your particular pay cycle, the two systems you personally have to reconcile.

**Time it honestly.** The interpreter knew his number was 45 minutes per assignment. Not "it takes a while." A number. Most people badly underestimate this, because the work is scattered in five-minute pieces and never shows up as a block on a calendar.

**Look for the copy-paste.** Any moment you move the same information from one place to another by hand is the seam where this belongs. Email to calendar. Invoice to spreadsheet. Address to mileage claim.

**Start with the annoying part, not the whole system.** He did not build an interpreter business platform. He automated the intake of one assignment. The paycheck forecast came after, because once the data was in a sheet the forecast was almost free.

**Build it where your data already is.** He did not migrate to a new app. The spreadsheet was already the source of truth, so the automation went to the spreadsheet.

## The Business Angle

The replacement math here is not a vendor. It is your own hours.

Run the interpreter's numbers and the shape gets obvious fast. Forty-five minutes per assignment is an hour a week if he takes one job a week, and most contractors take considerably more. Nobody was ever going to send him an invoice for that time, which is exactly why it survived for years. Unbilled admin does not show up in any account, so nothing in your business ever flags it.

For an owner, the version of this that matters is not your own admin. It is the process living in one employee's head, in a spreadsheet only they understand, that they redo by hand every week.

That has never been worth a software project. It is now worth an afternoon.

And there is a second-order benefit that people miss. When the process gets encoded, it stops being hostage to the person who knew it. The interpreter's paycheck forecast used to be a thing he could work out. Now it is a thing that exists.

## Who Should Steal This Idea

Freelancers and independent contractors of any kind, especially anyone paid on a cycle they have to track themselves. Anyone who invoices per job, per hour, or per mile.

For owners: anyone with a task that only one person on staff can do, not because it is skilled but because only they know the sequence.

## How Hard Is It

Set it up in an afternoon.

Cost: free if you already pay for Claude and already use Google Sheets. Apps Script is included with a Google account, costs nothing, and is one of the most underused pieces of free automation in existence.

## Gotchas and Tips

**Do not build a product.** The moment you start adding settings for use cases that are not yours, you have wandered back into needing a market. The value is that it fits you exactly and nobody else has to understand it.

**Write down what it does anyway.** The one real risk of software for one is that in eight months you will not remember how it works. A short plain-English file next to it costs five minutes and saves the whole thing.

**Use the platform you are already on.** Apps Script is free, runs on Google's infrastructure, and needs no hosting, no server, and no deployment. That is the correct starting point for most people, and the interpreter's aside is worth repeating: Claude handles it better than Google's own tooling does.

**Expect the second and third one to be faster.** The first build is where you learn the shape. Most people who do this once do it repeatedly, because they start noticing friction they had trained themselves to ignore.

**Watch what it does with your calendar before you trust it.** Anything that writes to a calendar automatically should be watched for a week before you stop checking. Not because it will fail dramatically, but because a silently duplicated event is annoying to unpick later.

## Keep Reading

- [Stop Paying $10,000 for a Custom Website](/playbooks/stop-paying-for-custom-websites/)
- [Replace Your SaaS Stack With One AI Agent](/playbooks/replace-saas-stack/)
- [Never Copy a Date From an Email to Your Calendar Again](/playbooks/email-to-calendar/)
