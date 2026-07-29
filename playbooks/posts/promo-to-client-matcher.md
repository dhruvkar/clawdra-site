---
layout: playbook.njk
title: "Matching Supplier Promotions to the Clients Who Asked for Them"
description: "A travel advisor gets dozens of supplier promotions a day and can't read them all. Their agent parses each one into a database and raises a flag when a live offer matches something a client already asked for."
date: 2026-07-29
difficulty: Beginner-to-intermediate
cost: "~$25-50/mo (agent runtime plus model costs)"
timeToSetup: "An afternoon for the matching loop. Add the client wishlists as you go."
originalSource: "https://www.reddit.com/r/hermesagent/comments/1v8w2w5/"
originalAuthor: "ChaosDisrupted_com"
originalAuthorUrl: "https://www.reddit.com/user/ChaosDisrupted_com/"
issueNumber: 24
permalink: /playbooks/promo-to-client-matcher/
tags:
  - travel
  - brokers
  - crm
  - lead-matching
  - email-automation
  - commissions
  - small-business
  - agencies
---

## Tools

- [**Hermes**](#aff-hermes): the agent reading the mail, filling the database, and raising the flag
- [**OpenClaw**](#aff-openclaw): alternative agent runtime for the same build
- [**Claude Code**](#aff-claude-code): another alternative that does the same jobs
- [**Airtable**](#aff-airtable): where the CRM, the client wishlists, and the promotions table live
- [**Gmail**](#aff-gmail): the firehose of supplier emails this all runs on
- [**Google Calendar**](#aff-google-calendar): the schedule feeding the daily briefings
- [**Telegram**](#aff-telegram): optional, get the match alerts on your phone instead of by email

## What You'll Build

A system that reads every promotional email your suppliers send you, pulls out what the offer actually is, files it in a table, and then tells you which of your clients would want it.

Three pieces, none of them complicated.

First, a table of promotions. Every supplier email that comes in gets parsed into structured fields. What is the offer, who is it from, what does it cover, what does it cost, when does it expire.

Second, a table of client wishlists. What each of your clients has told you they want. The destination, the timeframe, the budget, the thing they mentioned once on a call eight months ago.

Third, the part that makes it worth money: a match. When a new promotion lands that fits something on a wishlist, you get told. Rather than a digest of forty offers, you get a message saying this specific client wanted this specific thing, it just went on sale, and it expires Thursday.

You stop drowning in vendor mail and start being the advisor who calls people with exactly the thing they asked for.

## The Story

This turned up in a Reddit thread asking what people run their agent for besides coding. A user going by ChaosDisrupted_com answered as a travel advisor, and the problem they described will be familiar to anyone in a brokered business.

Travel advisors get flooded. Cruise lines, resorts, tour operators, hotel groups, destination management companies, all sending promotions constantly. Dozens a day. Limited-time cabin rates, resort credits, a suppressed shoulder-season fare, a two-for-one on a specific sailing.

Their exact framing was that it would be impossible to keep up with all of those and match them to a client's needs.

That sentence contains the whole business problem, and it is worth unpacking, because the problem is not really about email.

A travel advisor makes money on commission when a client books. The client is only going to book when the trip they want is available at a price that feels good. So the advisor's actual job is holding two lists in their head at once: everything a hundred clients have ever said they wanted, and every deal currently live in the market. When those two lists touch, that is a booking.

No human can hold both lists at once. So the promotions get skimmed or filed or ignored, and three weeks later a client mentions they booked the trip themselves. The commission was sitting right there and nobody connected the two lists.

So they had their agent do the connecting.

## How It Works

The agent had already built them a CRM in Airtable, along with several other databases they use in the business. Worth pausing on that: the agent built the customer database, not a vendor. That is the layer everything else sits on.

Then the loop.

**It reads the promotional email as it arrives.** It does not summarize the mail into a daily digest, it breaks each offer into fields, so that "Sandals is doing 45 percent off plus a $500 air credit on Saint Lucia for travel through March, book by the 15th" stops being prose and becomes a row with a destination, a discount, an inclusion, a travel window, and a booking deadline.

**It files that row in a promotions table.** Now every live offer in the market is in one place, searchable, with an expiry date attached. That alone is useful. You can ask a question like "what do I have for a family of four in the Caribbean in February" and get a real answer.

**It matches against client wishlists and raises a flag.** This is where the money is. When a promotion lands that matches something a client has already said they want, the agent alerts them. Instead of reading mail and hoping to spot an opportunity, they get handed the ones that exist.

## The Second Half: The Briefing

The same person is running a daily briefing, and while it is a different job, it is a good illustration of how these systems accumulate once you have an agent with access to your stuff.

On Sunday it builds the family meal plan for the week, using recipes they supplied and working around what everyone has on each day. Then every morning it texts a briefing to all five family members containing the weather, a Bible verse, what is for dinner, anything due today from their reminders, a summary of what is on the family calendar, a bulleted summary of any school emails that came in, whichever household chore is scheduled for that day, any birthdays in the next seven days, and anyone's trips in the next two weeks.

They run a separate version of the same thing for the business side.

It stays in the playbook because of the pattern underneath it. Once an agent has permission to read your mail, your calendar, and your notes, the second use case is nearly free and every one after that costs less again. Setting up the access is the hard part, and you only do it once.

## The Business Angle

What this replaces adds up to more than it first looks like.

**The assistant nobody can afford.** The literal job being done is "read every vendor email, know every client's preferences, and connect them." In a large agency that is a marketing coordinator or a sales support role at $40,000 to $55,000 a year. In a one-person or two-person shop it is simply not done, which is the more common case and the more expensive one.

**The commissions that quietly do not happen.** This is the expensive part, and it never appears on any report. A travel advisor's commission on a decent package booking is commonly a few hundred to well over a thousand dollars. If matching live promotions to stated client wants surfaces even one extra booking a month that would otherwise have been missed, the system pays for itself several times over on the first one. And the failure mode it fixes is invisible: you never find out about the trip your client booked without you.

**The speed advantage.** Promotions expire. The advisor who calls a client the morning an offer drops, with the exact trip that client described, wins the booking against the advisor who gets to their inbox on Thursday. In a brokered business that timing gap is most of the competition.

Cost of running it is $25 to $50 a month.

## Who Should Steal This Idea

Anyone whose suppliers email them constantly and whose customers have told them what they want. The two-list problem is everywhere.

**Insurance brokers.** Carrier bulletins, rate changes, new product launches, and appetite guides land constantly. Match those against clients whose renewals are coming or who were declined last year on a risk somebody now writes.

**Freight brokers and logistics.** Available capacity and lane rates on one side, shipper needs on the other. This is literally the job.

**Real estate agents.** New listings and price drops against buyer criteria you already collected. Most agents rely on portal alerts that only match on the obvious fields and miss anything a buyer said in words.

**Car dealers and independent lots.** Auction runlists and wholesale inventory feeds against your customer want-list. Somebody asked for a low-mileage three-row in white six weeks ago and you have not thought about them since.

**Wholesalers and distributors.** Manufacturer close-outs, overstock, and promotional allowances against what your accounts actually buy.

**Recruiters.** New roles against candidates you have already spoken to, and vice versa. Same structure exactly.

**Event planners and procurement.** Venue and vendor promotions against briefs you are holding.

The test is two questions. Do you get supplier emails you feel guilty about not reading? Do you have customers who told you what they wanted and then never heard back? If both, this is your build.

## How Hard Is It

Afternoon for the core loop, and it gets better the longer it runs.

Technically this is a small build. The agent watches an inbox, extracts fields into a table, and checks new rows against another table. That is a beginner-level ask for any capable agent.

The part that takes effort is the wishlist table, and it is worth being honest about that. Your promotions table fills itself up automatically. Your client preferences do not. Somebody has to capture what each client actually wants, in enough detail to match against.

The good news is you do not have to do it up front. Start with your twenty most active clients, write a few lines each, and let the system run. Then add the habit of dictating a wishlist entry after every client call, which the agent can file for you. Six months of that and the matching gets genuinely uncanny.

**Cost:** roughly $25 to $50 a month. If you already pay for a database tool, that is the only other line item.

## Gotchas and Tips

**Capture the expiry date, always.** A promotion without a booking deadline is not actionable. Make it a required field, and have the agent quietly drop or archive expired rows so your table stays true.

**Let the wishlists be messy prose.** Do not force clients into dropdown categories. "Wants somewhere warm in February, hates crowds, will not do a connection through Miami, budget is flexible for the right thing" is worth ten times more than a structured form, and the whole reason an agent can do this now is that it can match against sentences.

**Tune the alerts hard, immediately.** If the agent flags twenty loose matches a day, you will start ignoring it within a week and the system is dead. Tell it to only raise a flag when the match is strong, and make the strength bar higher than feels comfortable at first.

**Alert with the draft already written.** Aim past the notification and have it produce a ready-to-send message to the client, referencing the thing they told you they wanted. You approve and send, and a lead becomes outreach in fifteen seconds.

**Keep client preferences out of the shared table.** These notes contain personal details, budgets, and sometimes things said in confidence. Keep the wishlist table restricted, and be deliberate about what the agent is allowed to include in a message.

**Log the misses.** When you get a match alert and choose not to act, note why. That feedback is what makes the matching sharper, and it is the difference between a system that improves and one that stays mediocre.

**Build the promotions table even if you never build the matching.** Being able to ask "what do I currently have for X" and get a real answer is most of the value, and it works from day one.

---

## Keep Reading

- **[Get 5 Sales-Ready Leads in Your Inbox Every Morning. Without a Lead List.](/playbooks/signal-based-daily-leads/)**: Outbound built on signals instead of lists. This playbook is the inbound version, where the signal arrives in your own mail.
- **[He Let an AI Triage 180 Emails a Day. Here's the Stack.](/playbooks/inbox-triage-agent/)**: If the volume itself is the problem before you get to matching anything.

**Want the full deep dive?** Read our [Best OpenClaw Skills](/learn/best-openclaw-skills/) guide for the foundational patterns this playbook is built on.
