---
layout: playbook.njk
title: "A Customer Sends a Photo of a Tire. The Shop Sends Back a Price and Holds the Stock."
description: "A tire shop runs its whole sales counter over WhatsApp. Photo of the sidewall, voice note, or 2017 Chevy Onix all turn into a priced offer with the stock reserved. The operators who reviewed it explain how to stop an agent giving your margin away."
date: 2026-09-01
difficulty: Intermediate
cost: "Roughly $50-150/mo. WhatsApp service replies are free, you pay for the AI and the hosting."
timeToSetup: "A weekend for the happy path. A month before you trust it with pricing."
originalSource: "https://www.reddit.com/r/n8n/comments/1vfh681/"
originalAuthor: "u/LifeInternational674 (r/n8n)"
issueNumber: 28
permalink: /playbooks/whatsapp-tire-shop-agent/
tags:
  - whatsapp
  - sales
  - inventory
  - retail
  - voice
  - small-business
  - smb
---

## Tools

- [**WhatsApp**](#aff-whatsapp): where the customer already is. Use the official Business API
- [**Claude**](#aff-claude): reads the photo, hears the voice note, writes the reply
- [**Google Sheets**](#aff-google-sheets): the stock list. The shop already worked here, so it stayed here
- [**n8n**](#aff-n8n): the wiring between the message and the tools
- [**OpenClaw**](#aff-openclaw): does the same job if you would rather run one agent than a flowchart

## What You'll Build

A sales counter that answers WhatsApp at 9pm.

Somebody sends a photo of the writing on their tire. The agent works out the size, checks what is actually on the shelf, sends back a price, answers the haggling, reserves the stock, and tells you in the team group.

When it does not know, it stops and asks a human. When a human answers, it gets out of the way.

## The Story

A tire shop in Brazil. Every customer message arrives on WhatsApp, and almost none of them arrive clean.

Some people send the size, `195/65 R15`. Some send "2017 Chevy Onix" and expect you to know. Some send a blurry photo of the sidewall taken in a dark garage. Some send a voice note.

The agent handles all four.

From there it checks real stock and builds a priced offer. Then it negotiates, because customers negotiate. How much in three installments. What if I take four. It re-checks quantity against stock before it commits to anything, builds the order summary, asks the customer to confirm, reserves the stock, works out whether there is time to fit them today or it needs a booking, and posts the order to the shop's team group.

The inventory lives in a Google Sheet.

That is the decision worth copying. The builder did not move the shop onto a new system. He read the sheet the staff were already updating, and left them alone.

## When It Does Not Know, It Raises Its Hand

Unknown size. Price outside the table. Anything strange.

The agent opens a pending request, pings the team's WhatsApp group, and stops talking. The manager answers in the group like a normal person. That answer routes back into the customer's chat automatically.

And if any human replies from the shop's own phone, the bot switches itself off for that conversation.

The builder's summary of it was that the agent knows how to escalate and then get out of the way.

## The Business Angle

A counter person costs $2,500 to $4,000 a month and goes home at six.

The messages do not go home at six. A tire shop's customers text in the evening, after they have looked at the flat, and they buy from whoever answers first.

This build covers the evenings and the queue at 11am when two people are already at the counter. The shop keeps its staff and stops losing the messages nobody had hands for.

Worth knowing on the bill: Meta changed WhatsApp pricing on July 1st 2025 and now charges per message. Conversations the customer starts are free, 1,000 a month per account and free after that. So the inbound sales case here costs you almost nothing in message fees. You only pay when you send marketing.

## Who Should Steal This Idea

Any shop that sells a thing with a size, a fitment, or a spec. Tires, parts, glass, filters, blinds, flooring, paint.

Also anyone taking orders on WhatsApp and typing them into a system afterwards.

## How Hard Is It

Needs a developer, but just once.

Cost: roughly $50-150 a month once it is live. Most of that is AI usage and a small server.

## Gotchas and Tips

**Never let the model near a number.** This is the single most important line in the whole build. Prices, totals, stock counts and discounts come from your code. An agent that negotiates will eventually hand out a discount nobody approved, and you will hear about it from the customer, not from your logs.

**Hide the tools it is not allowed to use yet.** Filter the tool list by where the conversation is. Early on it should only be able to look up a vehicle. Rejecting a bad tool call after the fact still burns a turn, and the model will argue with the rejection.

**Strip old totals out of the history.** Once a price appears in something the model wrote, it is in the context next turn. Three turns later it will negotiate from that stale number even though your tool would return a different one. Recompute the whole offer whenever the item, the quantity or the payment method changes.

**Your tests are lying to you.** One operator ran the same script repeatedly and a cheap model handed out an unauthorized discount roughly one run in three. A single green test would have shipped that. Run each scary case ten times and look at the failure rate.

**Make refusing an action it can take.** Prompting a model to never offer a discount holds for about a week. Give it a real escalate tool so that declining is a button it presses. Otherwise it says "let me see what I can do for you" and the customer holds you to a discount that never existed.

**Use the official WhatsApp API.** The build in the original post runs on an unofficial one that emulates WhatsApp Web. It is free and it works, and it also breaks WhatsApp's terms. Bans are usually permanent and take the chat history and contacts with them. For a shop whose customers only reach them one way, that is the business.

## Keep Reading

- [Put an Agent on Your WhatsApp to Book Appointments and Answer the Same 20 Questions](/playbooks/whatsapp-appointment-faq-agent/)
- [The Four-Piece AI Front Desk Every SMB Should Have Running by Friday](/playbooks/ai-front-desk/)
- [Let It Do Anything You Can Undo. Make It Ask for Everything Else.](/playbooks/reversible-irreversible-gate/)
