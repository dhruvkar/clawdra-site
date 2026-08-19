---
layout: playbook.njk
title: "Let It Do Anything You Can Undo. Make It Ask for Everything Else."
description: "One rule separates the automations that survive from the ones that quietly wreck your CRM: if the action can be undone, let the agent run it. If it cannot, hold it for a human. Four builders arrived at this in the same fortnight."
date: 2026-08-19
difficulty: Beginner
cost: "Free. This is a decision about how you configure what you already run."
timeToSetup: "An afternoon to sort your actions into two lists. The rest is wiring."
originalSource: "https://www.reddit.com/r/n8n/comments/1vocpah/lessons_from_running_n8n_ai_agent_workflows_in/"
originalAuthor: "GeorgeHadjisavvas (r/n8n)"
issueNumber: 27
permalink: /playbooks/reversible-irreversible-gate/
tags:
  - automation
  - approvals
  - risk
  - operations
  - agents
  - small-business
  - smb
---

## Tools

- [**OpenClaw**](#aff-openclaw): has an approval flow built in, which is the piece most people never turn on
- [**Claude Code**](#aff-claude-code): the agent doing the work on the other side of the gate
- [**n8n**](#aff-n8n): where the operator in this story runs his workflows, if you prefer boxes and arrows to code
- [**Telegram**](#aff-telegram): the cheapest possible approval inbox. One chat, every pending action, yes or no
- [**Google Sheets**](#aff-google-sheets): the log. What was proposed, who approved it, when

## What You'll Build

Two lists and a gate.

List one is everything your agent may do on its own, because you could undo it in thirty seconds. List two is everything that has to wait for a human, because you could not. Then one place where the waiting things wait.

That is the whole build. It is less work than the automation it protects, and it is the difference between an automation you keep and one you quietly switch off in six weeks.

## The Story

An operator who has been running AI agents against live business systems for a few months wrote down what he learned the hard way. His first line is the one to sit with:

The AI will eventually do the wrong thing. Not if, when.

His arithmetic is unsentimental. A prompt that works 99 percent of the time still means one action in a hundred hits your CRM, your inbox, or your payment system with bad data. If your agent handles thirty things a day, that is roughly one bad one every three days. Forever.

You cannot prompt your way out of that. So he stopped trying, and sorted his actions instead.

Reversible things run on their own. Drafting a document, logging a note, adding a row, writing a summary. If it goes wrong you delete it and nobody outside the building ever knew.

Irreversible things wait. Sending an email, updating billing, deleting a record. His words: that one filter cuts most of the risk.

Then two details that only come from having actually lived with this. Once you are running five or more workflows, approval requests scatter across Slack threads and email and you start missing them, so every pending action needs to land in one place. And log everything, because when something does go wrong you want to know exactly what the agent proposed, who approved it, and when.

## Everybody Hit This Wall In The Same Fortnight

The reason this is a playbook and not a tip is that four people arrived at it independently inside two weeks, from four different directions.

A developer built a fail-closed approval firewall for OpenClaw. Reads pass automatically, tests and development commands ask first, and force-pushes, recursive deletions, pipe-to-shell commands and config writes are treated as critical. Remembered approvals expire, and previews redact anything that looks like a password before showing it to you.

A second builder shipped a watchdog for the same problem, with the best sentence anybody wrote about it this month: AI guardrails only stop 89 percent of dangerous commands, which sounds fine until you think of it as a lock that lets one in nine intruders through.

A third made the sharpest technical argument. Most safety tooling is decorative because the scope is vague. If your allowlist is a broad prefix like api.example.com/v1/, the agent is still permitted to call /v1/delete-everything. Your budget cap, your approval step and your kill switch all sit inside that loose perimeter, so they are theater. His guard refuses to start if the rules are that broad.

The fourth is the one that matters commercially. A founder building an AI marketing tool kept having the same call: the founder loves the demo, then is asked for access to the ad account, and says absolutely not. Not paranoia. If you are bootstrapped, one bad decision blows a month of budget. So they rebuilt the product with approval gates first and capability second. His summary of what changed: every founder said they would try it once they knew they had approval gates and a kill switch. Autonomy sounds great, safety sounds better.

Four people, working on four different problems, landed on the same answer.

## The Business Angle

The thing standing between a small business and an AI that touches real systems has not been capability for a while now. It is that nobody sane gives write access to something they cannot stop.

Which means this is the clause that gets your pilot signed.

If you sell automation, the objection you hear on every call is some version of "what if it does something stupid to my customers." You do not answer that with a better model. You answer it by showing the two lists, the approval inbox on the owner's phone, and the log. The conversation stops being about trusting AI and starts being about which actions the owner wants to keep their thumb on. Owners are comfortable with that conversation, because it is the same one they have with a new hire.

If you buy automation, use the two lists as your buying test. Ask the vendor which actions their system takes without asking, and where the pending ones queue up. If they cannot answer in one sentence, they have not built it and you would be the one finding out at scale.

There is also a compliance edge for anyone selling into Europe. Under the EU AI Act, obligations for high-risk AI systems came into application on 2 August 2026, including a requirement that deployers assign human oversight to people with the competence, training and authority to actually exercise it, plus keeping logs for at least six months. That applies to the Act's defined high-risk categories, so it is not the plumber's follow-up automation. If you sell into hiring, credit, education or similar, it is you.

## Who Should Steal This Idea

Anyone whose agent can send an email, charge a card, update a customer record, or post something with the company's name on it. Agencies who need a clean answer to the trust objection. Owners about to hand an agent the keys to a CRM.

## How Hard Is It

Set it up in an afternoon.

Cost: nothing. You are configuring what you already run. The only new pieces are a chat where approvals land and a sheet where they get recorded, and you already have both.

## Gotchas and Tips

**Sort by "can I undo it," not by "how much do I trust it."** Trust drifts with your mood and with whatever the model did last week. Reversibility is a property of the action and does not move.

**Anything a customer sees is irreversible.** You can delete a bad email from your sent folder. You cannot delete it from your customer's inbox, or from their memory of your business.

**Watch out for broad permissions dressed up as narrow ones.** "Read-only access to the CRM" is a real limit. "Access to the customer API" is not, and it is how most connectors are actually configured.

**One approval inbox, or you will start rubber-stamping.** Approvals scattered across three apps become noise within a week, and noise gets approved without reading. One place, on your phone.

**Auto-approve the boring things on purpose.** If every action needs a human, you have not automated anything, you have added a queue. Let the reversible pile run freely so the gate stays meaningful.

**Log the proposal, not just the outcome.** The useful record is what the agent wanted to do and who said yes. That is also the record that protects you if a customer ever asks.

**Expire remembered approvals.** "Always allow this" is how a narrow permission becomes a wide one over six months, without anybody deciding to widen it.

## Keep Reading

- [Let an AI Run Your Equipment Without Letting It Break Anything](/playbooks/greenhouse-ai-with-safety-rails/)
- [He Spent $1,263 on AI in One Month. Then He Capped It.](/playbooks/ai-budget-cap/)
- [Eight of the 27 Most-Copied Automations Are the Same Build.](/playbooks/automation-pattern-survival/)
