---
layout: playbook.njk
title: "Post on X and LinkedIn Every Day Without Being a 'Content Person'"
description: "An hourly AI drafting system that turns your real work into social posts. Agent generates 3 drafts, you pick one, ship. No content calendar, no burnout."
date: 2026-04-15
difficulty: Intermediate
cost: "$10-30/month (Typefully + API costs)"
timeToSetup: "A Saturday afternoon"
originalAuthor: "Clawdrop"
issueNumber: 9
permalink: /playbooks/daily-content-machine/
tags:
  - content
  - social-media
  - build-in-public
  - linkedin
  - twitter
  - solopreneur
  - automation
  - founder
---

## Tools

- [**Typefully**](#aff-typefully): schedules and publishes LinkedIn posts via API
- [**X**](#aff-x): primary posting destination for hourly drafts
- [**LinkedIn**](#aff-linkedin): secondary posting channel, 3-4 times a week
- [**Telegram**](#aff-telegram): where the agent delivers drafts for you to pick from
- [**Anthropic**](#aff-anthropic): model API powering the drafting agent

## What You'll Build

An agent that sits next to you all day and asks, once an hour, "want me to draft something about what you're working on right now?" You look at three options, pick one, and it's shipped to X and LinkedIn before you finish your coffee.

No content calendar. No batch-writing session on Sunday night. No "what should I post today" paralysis. The agent watches your actual work, turns it into hook-driven drafts, and lets you ship the one that sounds most like you. If none of them do, you type "skip" and go back to building.

This is the exact system we run at Clawdrop to post on X multiple times a day and LinkedIn 3-4 times a week, without either of us sitting down to "do content." The drafts are based on what's in our terminal, our calendar, our running scripts, and our recent chat context. If we had a weird bug that morning, the agent knows and drafts about the bug. If we just shipped something, the agent knows and drafts about the ship.

The output is a founder who looks like a prolific content creator while spending 5 minutes a day on it.

## Why Daily Posting Burns Out Founders

Every founder has tried to post daily. Most have quit by week 3.

Here's what goes wrong. You decide you're going to post every day. Day 1, you write something. Day 2, you write something. By day 4 you're staring at a blank tweet box trying to remember what you did that day. By day 10 you're recycling the same "lessons learned" tweets everyone else is writing. By day 20 you've started to hate your own voice and the dopamine from a 3-like post feels worse than not posting at all.

The problem isn't discipline. The problem is context. By the time you sit down to post, you've forgotten half the interesting stuff that happened during your day. The cool bug, the weird API response, the number you noticed, the thing the customer said. All the raw material for a good post is in your morning. By evening it's gone.

The other problem is hook blindness. You know what you want to say but you don't know how to start it. "So today I was working on..." is not a hook. It's a diary entry. Nobody stops scrolling for a diary entry. They stop scrolling for "wasted two weeks building a scraper before realizing the government publishes the data for free." Same information. Completely different opening move.

The fix for both problems is the same. Move the drafting closer to the work. Post while the context is still hot. Let something else handle the hook formulas so you don't have to remember 12 different ways to start a sentence.

That's what this system does. It catches you while the work is still in your head, drafts in 3 different hook styles, and lets you ship without touching a blank page.

## The Pattern

The whole thing is 4 moving parts in a loop.

```
WORK CONTEXT (terminal, calendar, chat)
    |
    v
HOURLY DRAFTING AGENT
    |
    v
3 DRAFTS (each with a different hook)
    |
    v
YOU (pick one, edit, or skip)
    |
    v
POST (X via browser, LinkedIn via API)
    |
    v
REPLY HANDLER
```

The agent doesn't pick what to post. It picks *how* to post what you already did. The creative work is still yours. The framing work is automated.

## Step-by-Step Setup

### Step 1: Define Your Posting Cadence

Decide two things up front:

**How often you want to post on X.** We run hourly during work hours (9am to 11pm Central), which works out to 14 draft batches per day. You won't ship every batch. Most days we ship 4-8 posts. The point of hourly drafting isn't to post hourly, it's to give you 14 chances to catch a good one.

**How often you want to post on LinkedIn.** LinkedIn is a different beast. Post too often and you look like a bot, post too little and the algorithm forgets you exist. The sweet spot is 3-4 times per week, on Tuesday, Wednesday, and Thursday. Morning drafts only. Track posts-per-week so the agent stops drafting when you hit 4.

Write your cadence into the agent's config so it knows when to skip. A weekend morning is a skip. A Sunday 4am is a skip. A Wednesday 2pm is not a skip.

### Step 2: Build Your Hook Library

The agent shouldn't be writing from scratch. It should be picking a hook formula and filling it in. We use 12 formulas. Each one is a proven opening move.

1. **Specific number.** "verified 6,377 emails this week. 47% were completely dead."
2. **Contrarian.** "most lead gen companies buy data from the same 3 providers. that's why all their lists look the same."
3. **Mistake/waste.** "wasted 2 weeks building a scraper before realizing the government publishes the data for free."
4. **Behind-the-scenes.** "here's what's actually running when i say 'my agent handles it.'"
5. **Result first.** "0 bounces out of 800 sends this week. here's the pipeline."
6. **Most people.** "most founders think daily posting is the move. it's not, unless your first line stops the scroll."
7. **Question opener.** "what if your cold list could qualify itself before you hit send?"
8. **List promise.** "4 tools every solopreneur running outbound should know about."
9. **Before/after.** "before: 3 hours on one cold email. after: the agent drafts 10 in 30 seconds."
10. **Bold claim.** "we killed our email warmup tool and the inbox rates went up."
11. **Lesson learned.** "the biggest thing i got wrong about cold email was assuming verifiers agreed with each other."
12. **Story opener.** "last tuesday a prospect replied with 'how did you get my email?' it was a good question."

Save these in a reference file the agent reads before every draft. When it generates 3 options, it picks 3 *different* formulas. Never send the same formula twice in one batch. Rotate.

For each draft, the agent needs to verify: does the hook work in isolation? Cover everything after line 2. If you still want to keep reading, the hook is good. If not, rewrite it.

### Step 3: Wire Up the Hourly Drafting Loop

The agent needs a trigger. This is not optional. A skill that doesn't run is just a document.

We run it via cron. A job fires every hour during work hours and sends a prompt back to the agent saying "draft 3 X posts and, if it's morning, 3 LinkedIn posts, based on what you know about today's work." The agent reads the morning calendar, the running scripts, the recent chat context, and any fresh git commits, and turns the raw material into drafts.

Example cron entry (roughly):

```
0 9-23 * * 1-5 /path/to/trigger-daily-content.sh
```

The script sends a single prompt to your agent runtime. The prompt is the entire job. It says: "It's $(date). Draft 3 X posts for the Build in Public audience using the hook formulas in ~/skills/social-hooks/references/hook-formulas.md. If it's between 8am and 10am Central and you have fewer than 4 LinkedIn posts this week, also draft 3 LinkedIn options. Check calendar, recent commits, and today's chat context for material. Send the drafts to me on Telegram."

If you don't have a persistent agent runtime, you can get the same effect by having the cron job append a prompt to a "heartbeat" file that your agent reads when it wakes up. Either works. The important thing is that the drafting happens on a schedule, automatically, without you asking.

### Step 4: Route Drafts to Your Chat

The drafts need to land somewhere you actually look. For us that's Telegram.

When the agent drafts, it formats each option inside a code block so you can copy-paste without accidentally grabbing labels. The message looks like this:

```
🐦 X drafts (Build in Public):

1. [draft with hook formula 1]

2. [draft with hook formula 2]

3. [draft with hook formula 3]

Pick a number (or skip, or send edits).
```

LinkedIn drafts show up in a separate message with the same format. You glance at both, pick the one that sounds most like something you'd actually say, and type the number back.

If none of them work, type "skip" and the loop resets for next hour. The agent doesn't get offended. It doesn't remember rejected drafts. Next batch is fresh.

### Step 5: Post X via Browser Automation

Here's the part everyone skips. You cannot post X content to a community via the Typefully API or any third-party scheduler. They only post to your personal timeline. If you're trying to build an audience in a specific community (Build in Public, for example), your posts need to land in the community feed, not just your timeline.

The only way to do that is browser automation. We run a dedicated browser profile on a Windows machine with the X community URL bookmarked. When you pick a draft, the agent spawns a sub-task that navigates to the community, clicks Post, fills in the text, makes sure "Also share with followers" is checked, and hits submit.

The flow takes about 8 seconds from "pick 2" to "posted." You don't watch it happen. You just get a success notification.

One critical rule we learned the hard way: never post via Typefully first and then try to repost the same text via browser. X will block it as a duplicate. Pick one path and stick with it. For community posting, always browser.

### Step 6: Post LinkedIn via Typefully

LinkedIn is simpler because it has a usable API. We use Typefully v2 because it handles scheduling, drafts, and publishing in one clean interface.

When you pick a LinkedIn draft, the agent makes a single API call that either publishes immediately or schedules for a specific time (we default to the next morning at 9am Central if you're drafting in the evening). Typefully handles the rest.

One detail that drove us up a wall for a week: LinkedIn posts that include a recognizable brand name consistently outperform posts that don't. "We built something like Netflix's recommendation engine for cold leads" gets 3x the impressions of "We built a recommendation engine for cold leads." The brand anchors the mental model instantly. We now require every LinkedIn draft to include at least one big-brand analogy or contrast. Doordash, Uber, iPhone, Amazon, Honda, Netflix. Whatever fits.

### Step 7: Reply Handling

Posting is half the job. Replying is the other half.

After every post, schedule a reply check 10 minutes out. Ten minutes is long enough that the first wave of replies has landed and short enough that you haven't context-switched yet. The agent pulls the replies, classifies them, and acts.

**Generic or agreeing replies** get an automatic emoji response. A single 👊, 🙏, 💯, or 🔥. Nothing more. These are the "great post" replies and they don't need thought.

**Disagreements or questions** get escalated to you on Telegram. The agent sends you the reply text, a one-line summary of what the person is asking or pushing back on, and waits for your response. You type a reply in chat. The agent posts it for you.

This keeps you out of X as a scrolling app. You only see replies that actually need your brain. The dopamine-loop stuff happens automatically in the background.

## Lanes That Work

This pipeline fits a specific kind of founder.

**Solo founders building in public.** Shipping daily, sharing progress, growing an audience while they grow the product. The agent turns every bug fix and every launch into a post.

**Agency owners marketing through personal brand.** Posting case studies, client wins, behind-the-scenes operations, and occasional contrarian opinions. LinkedIn is the primary channel, X is secondary.

**Technical creators running paid communities.** Posting signals of expertise, weird builds, and pattern interrupts. The Build in Public community on X is where they earn trust before selling courses or access.

**B2B founders who hate content.** The ones who know they should be posting but find the blank page repulsive. This system removes the blank page. You only ever see 3 filled pages and pick the best one.

What doesn't work: influencer-style content where the post *is* the product. If you're a fashion creator or a fitness coach whose whole business is polished content, this isn't your system. This is for founders who want to look like they post daily without letting content become their job.

## What Changes After Setup

The first week feels strange. You're posting 4-8 times a day on X and you didn't write any of it. You feel a little impostery.

By week 2, you start editing the drafts on the fly. The agent writes "wasted 2 weeks on a scraper before realizing the data was free" and you change it to "spent 12 days on a scraper before realizing the data was on a government site." Same hook, truer to your actual day. This is where you start to trust the system. It gets you 80% there. You add the last 20%.

By week 4, you're posting more than you ever have before and thinking about content less than you ever have. Your engagement numbers start going up not because the posts are better but because they exist. Algorithms reward frequency plus hook quality. You have both.

By week 8, strangers are replying to your posts and mentioning you as someone "who posts great stuff on X." Which is funny because the thing they're reacting to is actually the hook formula, and you didn't write the hook formula either.

The actual daily cost of the system after the first week is 5-10 minutes spread across the whole day. You pick drafts in the moment between finishing one task and starting another. It never feels like "content work" because there's no block of time set aside for it.

## Gotchas and Tips

**Don't auto-post. Ever.** Every post should have your 2-second sanity check before it ships. The value of the system is that it drafts, not that it publishes autonomously. The second you remove the pick-one-of-three step, you start shipping posts that sound off, and your audience notices.

**Rotate hook formulas religiously.** If the agent sends you 3 "specific number" drafts in a row, reject all 3 and ask it to rotate. Hook fatigue is real. Using the same formula twice in a week makes the audience go numb.

**Never post the same text to X timeline and X community.** Duplicate detection will block the second attempt. Pick one path per post.

**Check that your automation is actually running.** We have been burned repeatedly by assuming the cron job is wired up when it isn't. Verify every week that your agent is actually drafting on schedule. A silent cron failure is worse than no cron.

**Feed the agent real context, not made-up context.** The agent should draft from your actual work: git commits, running scripts, recent chat, open tabs. If it starts generating generic "today I'm grateful for the grind" posts, it's because you're not feeding it enough raw material. Pipe in more context.

**Treat skip as a valid answer.** You're under no obligation to post every hour. If none of the 3 drafts are good, skip. The system is designed to give you options, not quotas.

**LinkedIn needs a brand name in every post.** This is the weirdest rule we have and also the most consistently correct. iPhone, Honda, Netflix, Uber, Amazon, DoorDash. Pick one and drop it in as an analogy. Your impressions will go up. We have no idea why. It just works.

**Auto-reply with emojis, never with words.** Automated word-replies sound robotic no matter how well-tuned the prompt is. Emojis are honest. A single 💯 is better than a sentence the robot wrote.

**Escalate real conversations to you.** The agent should never answer a question or engage with a disagreement on your behalf. That's where your voice actually matters. Auto-handling that stuff kills your credibility fast.

---

## Keep Reading

- **[Stop Buying Cold Email Lists. Build One That Actually Books Meetings.](/playbooks/cold-email-list-pipeline/)**: The outbound-side companion. If content warms your audience, cold email books the calls.
- **[The One-Person Agency: Charge Agency Rates as a Solo Operator](/playbooks/one-person-agency/)**: The system you build *behind* the content machine, so the inbound actually goes somewhere.
- **[Grow a Newsletter With AI Agents Across 4 Social Channels](/playbooks/newsletter-growth-machine/)**: When one-platform posting isn't enough and you want to turn the content into a distribution machine.
