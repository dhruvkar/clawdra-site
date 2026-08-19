---
layout: playbook.njk
title: "An AI Read 60 Days of a Google Ads Account, Then Built the Next Campaign. One Prompt."
description: "One prompt against a live Google Ads account: rank every campaign, find where the money leaks, then build the replacement with keywords, negatives, and geo targeting. It lands paused, so nothing spends until you look at it."
date: 2026-08-19
difficulty: Intermediate
cost: "The Claude or Codex subscription you already pay for, plus a connector to the ad account. Your ad spend does not change."
timeToSetup: "An afternoon to connect it. Ten minutes a month after that."
originalSource: "https://www.youtube.com/watch?v=D3C2U5hFex0"
originalAuthor: "Insightful Pipe (YouTube)"
issueNumber: 27
permalink: /playbooks/google-ads-audit-and-build/
tags:
  - google-ads
  - ppc
  - marketing
  - advertising
  - agency-replacement
  - small-business
  - smb
---

## Tools

- [**Claude Code**](#aff-claude-code): the agent that reads the account and does the thinking. The demo used Codex, and the connector works the same from Claude
- [**Codex**](#aff-codex): what the person in the video actually ran, if you would rather use that
- [**Google Ads**](#aff-google-ads): your live account, which is the part that makes this real and also the part that makes it risky
- [**OpenClaw**](#aff-openclaw): if you want the review to run on the first of every month instead of when you remember
- [**Anthropic**](#aff-anthropic): a few cents of usage per review

The connector in the demo is a paid MCP server, which is a small piece of software that hands your AI a key to a specific account. Google Ads has its own API if you would rather wire it yourself, and that path is free but slower to set up.

## What You'll Build

A monthly Google Ads review that you do not do.

The agent reads the last 60 days of the account, ranks your campaigns from best to worst, tells you where the money is going that should not be, then writes the next campaign and puts it in the account paused. You look at it, you turn it on.

## The Story

Someone connected an AI to a live Google Ads account and gave it a single instruction: analyze the last 60 days, find the trends, name the best and worst campaigns, and propose a new one that is ready to launch.

Here is what came back, in the order it came back.

It ranked all four campaigns in the account from best to worst by efficiency. Click-through rate was up 11 percent. Conversion rate had gone from 2.5 to 3.1 percent. Broad match traffic had grown without the conversions to match it, which is the polite way of saying money was going out the door for clicks that were never going to buy. Mobile was pulling 64 percent of the clicks and returning half the conversion value.

Any competent Google Ads manager finds those four things. That is the monthly report you are paying for.

Then it kept going.

It proposed a new campaign with a 280 dollar daily budget, four ad groups organized by match type and intent, 20 keywords, a negative keyword list, and geo targeting across seven states. The person watching approved it. The agent then built the whole thing inside the account: campaign, budget, bidding, geo targeting, four ad groups, 20 keywords, 12 negatives, device bid adjustments, and the responsive search ads.

It created the campaign in paused status. Nothing spent a cent. The last thing in the video is the campaign sitting in the Google Ads interface exactly as described, waiting for someone to press go.

## What Actually Happened Versus What It Sounds Like

This was a vendor demo. The company that makes the connector made the video, and the account had four campaigns in it, which is small. Take the polish off before you decide anything.

What survives the discount is still the interesting part. The agent did not write a report about the campaign. It built the campaign. The gap between "here is what I would do" and "I did it, go look" is the entire gap between advice and delivery, and it just got closed for one of the most expensive line items a small business carries.

Also worth noticing: the demo asked for a strategy and got an approval step before anything was built, and the finished campaign arrived paused. Whoever set that up had thought about what happens when this goes wrong. Most people building this kind of thing have not.

## The Business Angle

Small accounts usually get managed for a few hundred to a couple thousand dollars a month, or ten to twenty percent of spend, whichever the agency thinks it can get. For that money you get a monthly review, some keyword and negative keyword maintenance, new ad copy when performance sags, and a report.

Read the list again. Every item on it is what the agent did in one prompt.

The honest version is that the retainer buys two different things and only one of them is now automatable. The review, the build, and the maintenance are mechanical. Knowing that your margins are thin on the product those high-intent keywords sell, or that the phone does not get answered after four o'clock so paid clicks after four are wasted, is not mechanical. The agent has no idea what your margins are and will never ask.

So the play is not usually "fire the agency this week." It is to stop paying agency rates for the mechanical 70 percent, and then have a much shorter conversation about the other 30.

For agencies reading this: you already know which of your retainers is mostly the mechanical part. That is the one your client is about to run themselves.

## Who Should Steal This Idea

Anyone spending real money on Google Ads who cannot tell you, right now, which of their campaigns is the worst one. Service businesses with a single account and a few campaigns, ecommerce owners who inherited an account from a previous agency, and agencies who want to hand three hours a month back to their team.

## How Hard Is It

Weekend project, and mostly for the connecting part.

Cost: your existing AI subscription plus the connector. The demo used a paid MCP server. Google's own Ads API costs nothing and takes longer to wire up. Neither one changes what you spend on ads, which remains the only large number in this playbook.

## Gotchas and Tips

**Run it read only first, for a full month.** Connect it with read access, ask for the review, and compare what it says against what your agency sends you. You learn what it is good at for the price of nothing.

**Write access is the whole risk.** A connector with write permission on a live ad account can create campaigns, and anything that can create a campaign can spend money. The video says this out loud, which is to its credit: test on a low budget or sandbox account first.

**Paused is the setting that makes this safe.** Any version of this you build should create campaigns paused and let a human press go. If you take one thing from this playbook, take that.

**Do not let it touch budgets on live campaigns.** Reviewing is safe. Building paused is safe. Editing the budget of something that is currently running is where a bad night happens.

**It cannot see your margins, your capacity, or your phone.** It will happily scale a campaign that sells your worst-margin service, or drive calls to a line nobody answers on Fridays. That context lives in your head and has to go in the prompt.

**Check the negatives and the ad copy by hand the first time.** Keyword lists and negatives are where a small mistake gets expensive quietly. Read them once, properly, before anything runs.

**Ask for the same review every month and keep them.** Twelve of these in a folder is a performance history nobody in your business has ever had.

## Keep Reading

- [Research Your Competitors' Ads and Launch Your Own Campaign on Meta](/playbooks/meta-ads-pipeline/)
- [He Spent $1,263 on AI in One Month. Then He Capped It.](/playbooks/ai-budget-cap/)
- [The One-Person Agency: Charge Agency Rates as a Solo Operator](/playbooks/one-person-agency/)
