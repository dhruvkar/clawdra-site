---
layout: playbook.njk
title: "One AI Now Runs the Books for Six Companies at Once"
description: "We wired one AI agent into six separate QuickBooks accounts through Intuit's official API. Adding the next company is a 2-minute login, not a new build. It's live now."
date: 2026-07-21
difficulty: Intermediate
cost: "~$50/mo (QBO you already pay for plus agent API costs)"
timeToSetup: "One weekend to register the app and get production API approval, then ~2 minutes per additional company."
originalAuthor: "Claw Drop"
originalAuthorUrl: "https://clawdrop.org"
issueNumber: 23
permalink: /playbooks/multi-entity-quickbooks-agent/
tags:
  - quickbooks
  - qbo
  - bookkeeping
  - multi-entity
  - oauth
  - api-integration
  - small-business
  - bookkeeper
  - openclaw
---

## Tools

- [**OpenClaw**](#aff-openclaw): the agent runtime that reads and categorizes transactions across every connected company
- [**Claude Code**](#aff-claude-code): alternative agent harness for the same setup
- [**QuickBooks Online**](#aff-quickbooks): the six sets of books the one agent connects to through Intuit's official developer API
- [**Anthropic**](#aff-anthropic): the model provider doing the actual "what category is this" reasoning
- [**Xero**](#aff-xero): alternative accounting platform with the same kind of official API if your entities live there instead

## What You'll Build

One AI agent that keeps the books for many separate companies at the same time.

Not one agent per company. One agent, one connection point, and behind it every set of books you own or manage. In this build it's six: a home-services business, a design and staging studio, and a handful of rental-property LLCs. Each one is a completely separate QuickBooks account with its own login, its own tax ID, and its own pile of uncategorized transactions nobody wants to touch.

The agent connects to all six through QuickBooks' official developer API. In plain English, that means we don't have a robot pretending to be a human clicking around inside the QuickBooks website. We plugged straight into the door Intuit built for software to talk to QuickBooks directly. It is the difference between a stunt and a machine.

This one is in production right now. It runs across all six companies. Adding the seventh is a two-minute login, not a new project.

## The Setup, and Why It Matters

There's already a Claw Drop playbook about a CPA who wired her AI into the QuickBooks API to close her own books faster. Great build. If you're a solo accountant, go read it. This is not that.

This is the version for someone who is drowning in **separate** companies. A person who runs three, four, six little businesses and has a different QuickBooks login for each one. A bookkeeper who does the monthly grind for a dozen clients. The pain isn't "closing one set of books is slow." The pain is "I have six sets of books and switching between them all month is death by a thousand logins."

The old way to solve this with AI would have been ugly. You'd point some browser bot at the QuickBooks website and have it type in a username and password, click through the menus, and hope Intuit didn't change a button. Do that six times, with six logins, and you've built six fragile things that break the first time the site updates. It's a house of cards.

We didn't do that. We used the front door Intuit actually built for this.

## The Established Pattern (Said Once, So We Can Move On)

The general recipe here is not new, and we're not going to pretend it is: find the official API for the software you already pay for, and put an AI agent on top of it instead of a human. That's the whole move behind half the builds in this newsletter. We covered it in detail with the solo-CPA close.

What's new is the multiplier. One app. Many companies. Let's talk about the part that actually changes the economics.

## The Real Unlock: One App, Many Companies

Here's the piece that makes this worth your weekend.

When you connect to QuickBooks the official way, you register **one** application with Intuit. Think of it like getting one master key cut. That one app is not tied to one company's books. It's a connector that any QuickBooks account can plug into.

So the flow looks like this. You build the connector once. Then each company logs in through the same little "Connect to QuickBooks" page, one time, with its own QuickBooks account. The home-services business logs in. The staging studio logs in. Each rental LLC logs in. Every one of them clicks "allow" once, and now your single agent can read and work all six sets of books.

Adding the next company is not a new build. It's not new code. It's someone logging in through the same page you already made and clicking one button. About two minutes.

That's the whole game. Most people assume "connect AI to QuickBooks" is a one-company-at-a-time chore, so running six businesses means six of everything. It doesn't. It means one connector and six two-minute logins. A single agent now runs six companies' books, and the marginal cost of the seventh is basically zero.

If you're a bookkeeper, read that paragraph again. Your entire client list can sit behind one agent. Onboarding a new client stops being a setup project and becomes a login link you send them.

## How We Actually Wired It Up

Here's the honest walkthrough, minus the jargon. This is the part that takes a weekend the first time and ten minutes the second.

### 1. Register one app with Intuit

You go to developer.intuit.com and create an application. This is you telling Intuit "I'm building software that's going to talk to QuickBooks." They hand you two things: a client ID and a client secret. Think of those as the username and password for your connector itself, separate from any individual company's login.

### 2. Get approved for the real thing

This is the step people trip on, so pay attention. When you first register, Intuit only gives you "sandbox" access. Sandbox is a fake practice company with fake numbers. It's great for testing and completely useless for real books.

To touch actual live QuickBooks accounts, you have to apply for **production** credentials. There's a short compliance and onboarding application. You fill out what your app does, how it uses the data, and you wait for approval. This is not hard, but it is a gate, and you cannot skip it. Budget a little lead time because a human at Intuit reviews it.

We did this. We got approved. The six companies are live production accounts, not test data.

### 3. Wire the login handshake

This is the "Connect to QuickBooks" page. In technical terms it's an OAuth flow with a redirect and a callback page. In plain terms it's the same "Sign in with Google" style button you've clicked a hundred times on other websites. The company clicks it, logs into their own QuickBooks, approves access, and gets bounced back. Done. That approval is what lets one company plug into your one app.

You set this up once. Then every new company reuses it.

### 4. Prove the connection works

Before trusting it with anything, we did the simplest possible sanity check: we asked it to pull the last five transactions out of QuickBooks and show them to us. They came back correct. That's how you know the pipe is real. Boring, but that boring test is the difference between "I think it's connected" and "it's connected."

## The Human-in-the-Loop Dry Run (Nothing Touches the Books Uninvited)

Here's the part that should make you comfortable, because the number one fear with anything near your books is "what if the AI screws up my numbers."

It can't, because we don't let it write anything until a human says yes.

The agent works in a review-first mode. It pulls the uncategorized transactions and, for each one, drops its best guess into a spreadsheet. One column has the transaction. The next column has the category the agent thinks it belongs in. The next column literally asks, "does this look right?"

The owner sits down with that sheet and does a fast pass. Approve the batch, or fix the ones that are wrong. That's it. The agent watches the corrections, learns the patterns for that specific business, and gets sharper the next time.

And nothing, not a single entry, gets written back into QuickBooks until it's approved. The AI proposes. The human disposes. The books stay clean because a person still signs off, they just aren't the one doing the mind-numbing sorting anymore.

For six companies, that's six review sheets instead of six full days of manual categorizing. The owner's job shifts from "do the work" to "check the work," which is a much shorter job.

## The Money

Here's why this exists.

Categorizing transactions by hand runs about **10 hours a month per company**. Six companies is roughly 60 hours a month of somebody clicking dropdowns in QuickBooks. That's a part-time job that produces nothing but tidy books.

With the agent proposing and a human approving, that 10 hours per company drops to about **1 hour**. Same six companies now cost about six hours of review a month instead of sixty. You just got a week of your life back every month.

But the real target is bigger. This operator was paying a full-service CPA firm about **$2,500 a month** to keep all this straight. Most of what that firm was billing for was the grind: the categorizing, the cleanup, the monthly bookkeeping. Once the agent handles the grind and a human approves it, you don't need a full-service firm anymore. You need a cheap tax-only accountant who files the returns at year end.

Do that math. Twenty-five hundred a month is thirty grand a year. Swap it for a tax-only firm at a few hundred a month plus maybe fifty bucks in agent costs, and you're keeping most of that thirty grand. The bookkeeping labor didn't move offshore. It moved into an agent that works for pennies and a human who just checks the output.

That's the wedge. Automate the categorizing, retire the expensive full-service firm, keep a cheap tax specialist for the one thing that actually needs a licensed human.

## Who Should Steal This Idea

**The multi-business operator.** If you own three, four, or more little companies, each with its own QuickBooks and its own tax ID, this is built for you. One agent, one connector, every entity behind it. Rental LLCs, side businesses, a main operating company, whatever you've got.

**The bookkeeper.** This is your whole business model, made leaner. Every client's books behind one agent. Onboarding a new client is a login link, not a setup week. You can take on more clients without hiring, because the categorizing grind stops scaling with your headcount.

**Anyone paying a full-service firm mostly for bookkeeping.** If your monthly accounting bill is really a bookkeeping bill with a little tax work stapled on, you're overpaying. The bookkeeping part is exactly what this replaces.

**Franchise and property groups.** Multiple locations or properties, each its own set of books, one owner who wants a single view. Same shape as the six-company build here.

## Gotchas and Tips

**The production approval is a real gate, so start it early.** Sandbox access is instant and useless for live books. Production access needs Intuit's compliance application and a human review. Apply for it at the beginning of your weekend, not the end, so you're not stuck waiting with everything else built.

**One app, but each company still logs in itself.** Don't try to shortcut the per-company login. That one-time "Connect to QuickBooks" click by each entity is what keeps every set of books properly separated and consented. It's a feature, not a hassle. It's also what makes adding company number seven a two-minute job.

**Keep write access off until you trust it.** Run the review-sheet dry run for a full cycle or two before you ever let the agent post back into QuickBooks. Read everything, write nothing, until the guesses are boringly correct. Then turn on write access to a draft batch you still approve.

**Keep a notes file per company.** Each business has its own quirks: this vendor is always "supplies," that recurring charge is always "software," the owner's personal card purchases need flagging. Write those rules down per company. The agent reads them before every pass and stops making the same mistake twice.

**Don't skip the five-transaction test on new companies.** Every time you connect a new entity, pull its last five transactions first. It's ten seconds and it confirms the pipe is real before you build anything on top of it.

---

## Keep Reading

- **[This Accountant Trained Her AI to Close the Books Every Month](/playbooks/cpa-quickbooks-monthly-close/)**: The single-practice version of this idea. Where this playbook is about running many separate companies, that one is a solo CPA getting her own monthly close down to a one-shot.
- **[Run Your Business on AI (While Living Your Life)](/playbooks/founder-runs-business-on-ai/)**: The bigger picture for any multi-business owner. What it looks like when AI handles the operational grind and you handle the decisions.
- **[Replace Your CRM With a Conversation](/playbooks/nex-crm/)**: Same official-API move, different software. Take the tool you already pay for, plug an agent into its front door, and run it from one place.

**Want the full deep dive?** Read our [Best OpenClaw Skills](/learn/best-openclaw-skills/) guide for the foundational patterns this build depends on.
