---
layout: playbook.njk
title: "Working Around the Industry Software You Can't Replace"
description: "A restaurant and commissary kitchen owner gave his agent its own login to the platform he's locked into. It now runs the daily jobs that platform never shipped, and drafts the reservation replies and invoices his managers send."
date: 2026-07-29
difficulty: Intermediate
cost: "~$30-80/mo (agent runtime plus model costs, on top of software you already pay for)"
timeToSetup: "One weekend for the first job. It grows one job at a time after that."
originalSource: "https://www.reddit.com/r/hermesagent/comments/1v34auv/"
originalAuthor: "drdcuddy"
originalAuthorUrl: "https://www.reddit.com/user/drdcuddy/"
issueNumber: 24
permalink: /playbooks/vertical-software-gap-filler/
tags:
  - restaurant
  - hospitality
  - operations
  - vertical-software
  - inventory
  - invoicing
  - small-business
  - crm
  - automation
---

## Tools

- [**Hermes**](#aff-hermes): the agent doing the work, with its own logins to everything below
- [**OpenClaw**](#aff-openclaw): alternative agent runtime for the same build
- [**Claude Code**](#aff-claude-code): another alternative that does the same jobs
- [**Airtable**](#aff-airtable): the database layer holding the operational data the industry software won't
- [**Square**](#aff-square): point of sale and inventory the agent edits directly
- [**Shopify**](#aff-shopify): online store inventory, same treatment
- [**Stripe**](#aff-stripe): payments flowing into the same picture
- [**Make**](#aff-make): the automation platform the agent administers for him
- [**n8n**](#aff-n8n): the self-hosted automation platform he is migrating to, kept in sync automatically
- [**Slack**](#aff-slack): the client channel the agent polices
- [**Google Calendar**](#aff-google-calendar): the business calendar the agent maintains and uses for staffing
- [**Gmail**](#aff-gmail): where reservation requests arrive and drafted replies wait

## What You'll Build

An operations layer that sits on top of the software you already pay for and does the things that software refuses to do.

Every small business has one. The industry-specific platform you are locked into. The restaurant system, the salon system, the field service system, the kitchen management system. It handles maybe seventy percent of the job. The other thirty percent is you, every morning, doing the same manual work to cover for it.

This build hands that thirty percent to an agent. You give the agent its own login to the platform, plus access to your email, your point of sale, your calendar, and your team chat. Then you describe the gaps in plain English, one at a time, and it starts closing them on a schedule.

Think of it less as a replacement for your software and more as the employee whose job is working around it.

## The Story

This one comes from a Reddit comment, not a big writeup, which is part of why it is so good. Someone asked the r/hermesagent community what they use their agent for other than coding. A user going by drdcuddy answered with a list. It reads like a job description.

He runs a restaurant and a commissary kitchen. If you have not come across one, a commissary kitchen is a licensed commercial kitchen that rents time and space to food businesses that cannot afford their own. Food trucks, caterers, small packaged-food brands. So he has two businesses stacked on each other: a restaurant with customers, and a facility with tenants.

That means two entirely different operational headaches, two sets of software, and one owner.

## The Jobs

**It drafts the reservation replies and the invoices.** When a reservation request comes in, the agent writes the reply and creates the draft invoice. His managers open it, make the occasional edit, send it, and fire off the deposit request. He says this saves them hours every single week. Notice that the agent never sends anything itself. It gets the work to ninety percent so a human spends thirty seconds instead of ten minutes.

**It edits inventory directly.** It updates his point of sale and his online store inventory itself. His own words are that it does this far faster than he can do it manually. Worth noticing what that implies: he is not asking for a report about inventory, he is telling the agent to change the inventory, and it does.

**It runs the software the vendor undercooked.** He uses a commissary kitchen management platform for his tenants. He gave the agent API access and its own account on the platform. Then he set it running daily jobs to, in his words, fill in gaps that the software is unable to do. It surfaces problems, flags new leads, and can set up and communicate with new clients.

So he did not switch platforms or wait on a feature request. He hired something to operate the software he was stuck with, on his behalf, every day.

**It polices the client Slack.** The commissary tenants have a Slack channel. The agent watches it, adds and removes members, pushes out notices about upcoming changes to access and services, and automatically removes clients who have left. That last one is the kind of admin task that never gets done on time, and every month it does not get done is a month a former tenant can still see your operations.

**It administers his automation platform.** He was already running a pile of connections between his database, his point of sale, his payment processor, his printing system, and his email. The agent maintains them.

**It is handling his own migration.** He wants to move off his paid automation platform onto a self-hosted one. So the agent built a full mirror of the paid account in the self-hosted tool, and now watches for changes he makes in the old one and updates the new one to match. He can flip the switch whenever he is ready, with no migration weekend.

**It runs his calendar like an operations person would.** It maintains upcoming events and updates them as details change. His best example: it added every World Cup match to the business calendar so they could plan restaurant staffing around the tournament, then kept updating which teams were playing as the bracket resolved.

Nobody sells that as a product. There is no integration for "put the games my customers will watch on my staffing calendar and keep it current," and there never will be, because the market for it is him. It took a five-minute conversation with an agent.

## The Pattern Worth Copying

Strip away the specifics and there are three moves worth copying into any business.

**Move one: give the agent its own account.** Not your login, its own: a separate email address, a separate seat in the platform, a separate Slack user. That is what turns it from something you ask questions into something that does work while you are asleep. It also means you can see exactly what it did, and cut off access in one click if you need to.

**Move two: point it at the gap, not the whole job.** He did not ask it to run the commissary. He asked it to do the specific daily things the commissary software cannot. Each job is small and boring and describable in a sentence. That is what makes them reliable.

**Move three: let it write, let a human send.** Reservations and invoices get drafted rather than issued. Anything that touches a customer or moves money has a person in front of it, while the purely internal work like inventory updates and removing a departed tenant from Slack runs on its own. He has been deliberate about which jobs fall on which side of that line.

## The Business Angle

The bundle of work in that list is a job. Drafting client correspondence, maintaining inventory across two systems, onboarding and offboarding tenants, keeping the calendar accurate, chasing what the software missed, keeping the automations from rotting. In most markets, hiring an operations coordinator or an assistant manager to do exactly this runs $45,000 to $60,000 a year plus payroll taxes. For a restaurant operating on the margins restaurants operate on, that hire is often simply impossible, which is why the owner does it at eleven at night instead.

Then there is the second bill, the one nobody puts on a spreadsheet. When your industry software does not do something, you have three options: pay a consultant to build a workaround, migrate to a different platform, or absorb the work yourself forever. The consultant costs $2,000 to $10,000 and the workaround breaks the next time the vendor ships an update. The migration costs you a month. Absorbing it yourself is what almost everyone picks, and it ends up costing the most, because it never stops.

His agent is a fourth option that did not exist two years ago. Cost is the agent runtime and the model, call it $30 to $80 a month on top of software he was already buying.

The migration trick deserves attention on its own. Moving from a paid automation platform to a self-hosted one usually means a painful cutover weekend or a consultant. He has the agent maintaining both in parallel until he feels like switching. That is a several-thousand-dollar project running quietly in the background for free.

## Who Should Steal This Idea

Anyone who has ever said "our system doesn't do that."

**Restaurants and bars.** Reservation replies, deposit invoices, inventory across the register and the online store, staffing against what is actually happening in town that week.

**Anyone renting space or time.** Commissary kitchens, coworking spaces, salon suites, storage, studios, gyms. Tenant onboarding and offboarding is pure repetitive admin, and the offboarding half is a security problem when it slips.

**Trades and field service.** Your dispatch software almost certainly does not do the one report you need, and it definitely does not talk to your accounting the way you want.

**Medical, dental, and veterinary practices.** Practice management software is famously rigid and famously expensive to customize. The agent works around it instead of through it.

**Property managers.** Multiple portals, none of which talk to each other, plus a constant stream of the same tenant messages.

**Anyone paying for two platforms that do not integrate.** The agent is the integration. It logs into both like a person would.

The test: name the thing you do manually every week because the software cannot. If you can describe it in one sentence, it is a candidate.

## How Hard Is It

Weekend project for the first job, then it compounds.

Nothing in this list is technically fancy. An agent with logins, some scheduled jobs, and clear instructions about what it may do alone versus what it must leave in a draft. Picking the right first job is harder than building it.

Pick one that is boring, repetitive, internal, and low stakes. Removing departed clients from a Slack channel is a perfect first job. Nobody gets hurt if it is late, you will notice immediately if it is wrong, and it is genuinely annoying to do by hand. Get that running for two weeks. Then add the next one.

Do not start with anything that emails a customer or moves money. Earn your way up to those, and even then, keep them as drafts.

**Cost:** roughly $30 to $80 a month for the agent and the models, on top of the software you already pay for. The point of this build is that it does not replace your existing subscriptions, it makes them tolerable.

## Gotchas and Tips

**Give it its own account, and use a real one.** Separate email, separate seat, separate Slack user. You want its actions in the audit log under its own name, so when something looks wrong you know instantly whether it was you, your manager, or the agent.

**Check whether your platform has an API before you promise yourself anything.** He had API access to his kitchen management software, which is what made the daily jobs clean. If yours has no API, the agent can still drive the website like a person does, but it is slower and more fragile. Find out first.

**Draft, do not send.** Every job that touches a customer or a dollar should end in a draft that a human releases. Treat that as the permanent design rather than a starter setting. His managers still click send on every reservation reply and he is still saving hours.

**Offboarding is the job to automate first.** Removing people who left is the task most likely to be forgotten and most likely to matter. It is also completely mechanical. Perfect starting point.

**Keep a written list of what it is allowed to do unattended.** Once you have eight or ten jobs running, you will lose track. Write down which ones run on their own and which ones stop for approval, and review it monthly.

**Use it to escape a platform, not just to survive one.** The mirror-and-sync trick is underrated. If you are trapped on expensive software, have the agent build and maintain your exit in parallel. You get leverage on renewal day even if you never actually leave.

**Expect this to grow one sentence at a time.** He did not design this system. He accumulated it. Every time he caught himself doing something manual, that became the next job.

---

## Keep Reading

- **[Replace Your CRM With a Conversation](/playbooks/nex-crm/)**: The same instinct pointed at your customer database instead of your operations stack.
- **[The Restaurant GM Who Built AI Coaches for Every Shift](/playbooks/qsr-shift-coach/)**: Hospitality again, but aimed at the people on the floor rather than the software in the back office.

**Want the full deep dive?** Read our [Best OpenClaw Skills](/learn/best-openclaw-skills/) guide for the foundational patterns this playbook is built on.
