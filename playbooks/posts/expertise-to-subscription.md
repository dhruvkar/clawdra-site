---
layout: playbook.njk
title: "An Attorney Turned Four Years of Client Emails Into a Subscription"
description: "A 16-year attorney who can't code pointed an agent at his own sent folder. It pulled his past advice into a searchable database with a chatbot in front of it, so the same answers get sold more than once."
date: 2026-07-29
difficulty: Intermediate
cost: "~$25-60/mo (agent runtime plus a model subscription) and about $150 once for a mini computer"
timeToSetup: "First automations in one evening. The subscription product came together over about two months of evenings."
originalSource: "https://www.reddit.com/r/hermesagent/comments/1uz77ew/my_hermes_setup_w_notion_knowledge_base_crons_and/"
originalAuthor: "NeurosisByAnalysis"
originalAuthorUrl: "https://www.reddit.com/user/NeurosisByAnalysis/"
issueNumber: 24
permalink: /playbooks/expertise-to-subscription/
tags:
  - professional-services
  - legal
  - consulting
  - subscription
  - productization
  - knowledge-base
  - chatbot
  - sms
  - small-business
  - raspberry-pi
---

## Tools

- [**Hermes**](#aff-hermes): the agent that runs the whole thing, on a mini computer in his house
- [**OpenClaw**](#aff-openclaw): alternative agent runtime for the same build
- [**Claude Code**](#aff-claude-code): another alternative that does the same jobs
- [**Codex**](#aff-codex): the model subscription doing almost all the thinking here
- [**Notion**](#aff-notion): the question and answer database, the task board, and the customer-facing portal
- [**Gmail**](#aff-gmail): the sent folder that becomes the raw material, plus the agent's own mailbox
- [**Telegram**](#aff-telegram): how he talks to the agent from his phone
- [**Zoho Billing**](#aff-zoho): the invoicing platform the agent reconciles against
- [**Google Sheets**](#aff-google-sheets): the monthly tracking sheet on the other side of that reconciliation
- [**Stripe**](#aff-stripe): subscription billing for the new product
- [**Cloudflare**](#aff-cloudflare): puts the portal online at his own domain without paying a website vendor
- [**Raspberry Pi**](#aff-raspberry-pi): the $150 computer the whole business runs on

## What You'll Build

A machine that takes the advice you already give away in email and turns it into something people pay a monthly fee for.

It works in one loop. Every night, the agent reads your sent folder. When it finds a message where a client asked you a real question and you gave a real answer, it strips out the names and pulls the question and the answer into a private database. That database sits there waiting for you.

You read each entry, fix anything you got sloppy about, and tag it. The tag is the only signal the system needs. A second job comes along, sees the tag, and moves that question and answer into a public database that customers can search.

In front of that public database sits a chatbot, on your website and over text message. When a subscriber asks something, the chatbot answers from your own past answers. When it is not confident, it hands the question to you.

You keep doing the work you already do, and the system quietly turns what comes out of it into something you can sell more than once. People subscribe for access to that.

## The Story

Someone posted this on Reddit under the handle NeurosisByAnalysis. He opens by saying he has no affiliation with anything he mentions and that he typed the whole post himself with no AI help. Worth noting, because a lot of posts like this turn out to be ads.

Here is who he is. He has been an attorney for sixteen years. He and his wife own a brick-and-mortar business with a few locations in their city, in what he calls a low-profit, high-regulation industry. He cannot code. He describes himself as comfortable learning and trying things with guidance, which is exactly where most owners are.

Over the years he had picked up enough to avoid hiring a web agency. He could handle WordPress, domains, DNS, some basic SEO, simple connections between web forms and spreadsheets. He had tried Zapier repeatedly and could never get automations to run reliably. He had downloaded OpenClaw at one point, did not get it, and gave up quickly.

His side business is the interesting part. Because he knows his industry so well as both a lawyer and an owner, other businesses in that industry started coming to him for legal help. It is a very local industry, almost all small businesses, very low margin. These are companies that would never hire an attorney for anything short of getting sued, because they cannot afford to.

He can answer their questions in six, twelve, or eighteen minutes. He bills at an attorney rate, so those businesses get real legal advice for a few hundred dollars instead of thousands. Great for them. But look at what it is for him: he is still selling minutes. Every dollar requires him to be in the chair.

Then Reddit started showing him posts about people running agents at home, and he got curious.

## He Started Absurdly Small

Most people start by trying to build the big thing. He started by trying to sign a PDF.

Every month he received an email with the same one-page form. Same layout every time, different information filled in. He would open it in a PDF app, add his digital signature, flatten it, and send it back. Two minutes of nothing, twelve times a year, forever.

He assumed the agent would need to drive the apps on his desktop, opening the PDF program and clicking around like a person would. He explained what he wanted. The agent told him it did not need his desktop apps at all. If he gave it a transparent image of his signature, it could watch for the email, sign the PDF, and send it back on its own.

It worked.

That moment matters more than the automation did. It is where his mental model flipped from "AI helps me do my work faster" to "AI does the work." Everything after this came from that shift.

Next he had it record customer payments and reconcile them between his invoicing platform and the Google Sheet they use to track things month to month. That worked too.

## The Agent Pitched Him a Business

A couple of weeks in, during an ordinary conversation, the agent proposed something he had not asked for.

Its argument was simple. A lot of your clients ask the same questions and you give the same answers. Let me go through the last four years of your email, find the threads where someone asked a question and you gave advice, and turn those into anonymized questions and answers in a database. Then we put a chatbot in front of it, on the web and over text. It answers first. It escalates to you when it is not sure. Clients subscribe to get access.

He said yes.

The agent has been building the entire thing since, with what he describes as very little input from him, mostly just approving commands over Telegram. Over one weekend it was taking him from a single consulting website to a rebranded landing page, a free resources section, a subscription-gated hub where subscribers get his paid templates plus a searchable version of the question and answer database, the web chatbot, and a profile page where a subscriber can register the phone number that is allowed to text his AI associate.

It built the backend for all of it. The text messaging side, including getting the brand and campaign approved and wiring up the webhooks. The subscription side, with payment processing and magic login links.

And a small detail that tells you how it thinks: the customer portal lives in Notion, and rather than pay one of the several services that publish Notion pages to a custom domain, the agent put it online through a Cloudflare tunnel for free.

## The Loop That Keeps It Alive

A product like this is worthless if it goes stale, so four things keep it fed.

**The backfill.** The agent went through four years of past email threads and populated the database from scratch. That is the cold start solved in one pass. Years of your expertise, already written, already paid for, just sitting in a folder.

**The nightly sweep.** Every night the agent checks his sent folder for that day. If a client asked something substantive and he answered it, that exchange gets added to the private database. The category column is deliberately left blank.

**The tag as the approval gate.** He reviews and revises each new entry, and then adds a category tag. There is no approval button or dashboard anywhere in this. The presence of a tag means a licensed attorney has read the thing and stands behind it.

**The sweep to public.** A separate scheduled job checks the private database for anything tagged, and moves it into the public database that subscribers search and the chatbot reads from.

That gate design is worth copying. He needed a human approval step, for obvious reasons when you are an attorney publishing legal guidance. Rather than build an approval system, he took the thing he was going to do anyway, categorizing an entry, and used its presence as the signal. The safety mechanism costs him no extra work at all.

## He Taught It to Watch Itself

Most people running an always-on agent have no idea what it is doing until something breaks. He solved that with roughly one message.

He made a dedicated Telegram chat called "Hermes Doctor." Then he told the agent, roughly: I want this chat to be for you to run ongoing health checks on yourself. I want you to catch problems and bloat early. Things like noticing your memory is close to its limit, or noticing that your costs jumped and finding out why. What else should we set up here?

The agent came back with fifteen categories of checks. A few of them:

- **Memory budget**, daily. Flag when memory or the user profile is above 90 to 95 percent, or when entries are stale or duplicated.
- **Cost regression**, daily and weekly. Flag when the size of each request jumps unexpectedly, usually because skills or memory quietly grew.
- **Hardware health**, hourly. Flag high temperature or throttling, heavy load, low memory, or the storage drive not being mounted.
- **Login health**, daily. Flag when the connections to his email, calendar, notes, and billing platform are expired or missing.

It also proposed how to report: silent alerts that only fire when something is actually actionable, a short daily digest, and a deeper weekly audit. Then it recommended which ones to turn on first.

The best line in the whole setup is what it did next. It built most of these as plain scripts with no AI involved, specifically so that the monitoring itself stays cheap. The agent optimized its own overhead without being asked.

## The Business Angle

Two separate pieces of money here, and the second one is worth more than the first.

**What he did not have to buy.** Price out what he built over a couple of weekends. A rebranded site, a gated member portal, a searchable knowledge base, a chatbot trained on proprietary content, text-message delivery with carrier approval, subscription billing, and passwordless login. From an agency or a dev shop, that is a $15,000 to $40,000 project and a three-month timeline, plus a few hundred a month in ongoing software once it is live. He is out roughly $150 for a small computer and a model subscription.

**What he stopped being.** This is the bigger number, and it does not show up on an invoice.

For sixteen years he sold time. Even his efficiency worked against him: he got so good at his niche that he could answer in twelve minutes, which meant he could only bill twelve minutes. The better he got, the less each answer was worth. That is the trap every consultant, accountant, lawyer, bookkeeper, agency owner, and specialist is stuck in.

The subscription breaks it. The same answer he gave once, for one client, in twelve minutes, is now inventory. It gets asked and answered a hundred more times without him in the room. He goes from selling hours to selling access, and he takes on clients as subscribers instead of as calendar slots.

He is not replacing himself. The chatbot escalates anything it is unsure about straight to him, and he reviews everything before it goes public. He is separating the part of his expertise that is repetitive from the part that requires his judgment, and only charging by the hour for the second one.

## Who Should Steal This Idea

Anyone whose inbox is full of answers they have already given.

**Accountants and bookkeepers.** Four years of client emails explaining the same deductions, the same deadlines, the same "can I write this off" questions. Your sent folder is a paid product you have been giving away one reply at a time.

**Insurance agents and brokers.** Coverage questions, claim process questions, renewal questions. Same twenty questions, endlessly, from different people.

**Consultants and fractional executives.** You are the definition of someone selling twelve-minute answers at an hourly rate.

**Trade contractors who advise as much as they build.** Permit questions, code questions, "do I need to pull a permit for this." Especially valuable if you work in one city where the rules are local and nobody has written them down plainly.

**Agency owners.** Every client asks the same onboarding questions. Turn that into a portal and you have both a product and a way to stop repeating yourself on kickoff calls.

**Anyone in a regulated niche.** His whole edge is that his industry is highly regulated, entirely small businesses, and nobody can afford real advice. If that describes your world, the demand is already there and priced out.

The test is simple. Search your sent folder for a question you answer often. If you get more than twenty hits, you have a product.

## How Hard Is It

Set up the first piece in an evening. Grow it from there.

He is not a developer. He has not edited a single configuration file. Two months in he is still running one agent profile with no sub-agents, and he says he keeps asking whether he needs more and the agent keeps telling him no.

He runs the whole thing on a Raspberry Pi 5 with an external drive, roughly $150 of hardware. He originally installed the agent on his laptop and then, the same day, asked it to move itself to the Pi. It did, on its own, and that is where it has lived since.

Do not start with the subscription business. Start with the stupid thing. Find one email you handle by hand every month and hand it to the agent. His was a signature on a PDF form. Once you have watched it do something small and correct, you will start seeing the bigger version on your own, which is exactly what happened to him.

**Cost:** roughly $25 to $60 a month for the agent runtime and a model subscription, plus about $150 once for the mini computer. He does mention hitting a usage limit once while the agent was chewing through four years of email during the backfill, which he cleared with a reset on his plan. Plan for the backfill to be your most expensive day.

## Gotchas and Tips

**Anonymize before it goes anywhere near public.** He strips client details when the question and answer moves into the database. If you are bound by any kind of confidentiality, and most professionals are, this is not optional and it is not something to trust to a first draft. Read every entry.

**Make the approval gate something you were already doing.** His is a category tag. Do not build an approval workflow. Find the small step you already take on each item and let its presence be the green light.

**Leave the backfill for last.** The nightly sweep is cheap forever. The four-year backfill is one expensive burst. Get the daily loop working correctly on today's email before you point it at four years of history, or you will pay to process a mountain incorrectly.

**Give the agent its own email account.** He did. It keeps the agent's activity separate from your personal mail and makes it obvious what it has and has not touched.

**Track your own to-do list inside the system.** When there is something only he can do, like fetching an API key from his domain provider or picking a subdomain name, the agent writes him a checklist page and watches for items to get checked off. It is a nice way to keep the human steps from becoming the bottleneck.

**Build the doctor early.** The self-monitoring chat took one message to set up and it is what makes an always-on agent something you can trust while you sleep. Ask it to run its checks as plain scripts where possible so the watching costs you almost nothing.

**Read the chatbot's escalations, always.** The value of the escalation path is entirely in whether you actually respond to it. That queue is also where you find your next database entries.

---

## Keep Reading

- **[Turn 1,000 WhatsApp Voice Messages Into a Searchable Knowledge Base](/playbooks/whatsapp-voice-knowledge-base/)**: The same idea applied to voice notes instead of email, for people whose expertise lives in messages rather than documents.
- **[Stanford Built 12 AI Plugins for Lawyers. Here's How Your Firm Gets the Same Edge.](/playbooks/stanford-legal-ai-plugins/)**: Tooling for the legal work itself, where this playbook is about packaging the advice you already give.

**Want the full deep dive?** Read our [Best OpenClaw Skills](/learn/best-openclaw-skills/) guide for the foundational patterns this playbook is built on.
