---
layout: playbook.njk
title: "Nobody Selling a $2M Yacht Stops Mid-Deal to Fill In a CRM. So He Put the CRM Above the Keyboard."
description: "Salespeople lose deals over small forgotten things: a client's wife's name, which unit they liked, what got promised three weeks ago. A designer built the fix as a keyboard, because that is the one place they never stop typing."
date: 2026-08-19
difficulty: Advanced
cost: "Free to copy the idea in a lighter form. Building the real thing is a proper project."
timeToSetup: "A weekend for the version most owners should build. Six months for the version in the story."
originalSource: "https://www.reddit.com/r/SideProject/comments/1vqxpin/im_a_designer_and_i_built_an_ios_keyboard_that/"
originalAuthor: "A product designer on r/SideProject"
issueNumber: 27
permalink: /playbooks/client-memory-keyboard/
tags:
  - sales
  - crm
  - real-estate
  - client-management
  - whatsapp
  - small-business
  - smb
---

## Tools

- [**Claude**](#aff-claude): the part that reads back through the thread and pulls out what matters
- [**OpenClaw**](#aff-openclaw): if you want the client brief to arrive before the call instead of during it
- [**WhatsApp**](#aff-whatsapp): where the relationship actually lives for most of these businesses
- [**iMessage**](#aff-imessage): same, if your market is American
- [**Google Sheets**](#aff-google-sheets): the client file, which does not need to be anything fancier
- [**Claude Code**](#aff-claude-code): what you would use to build the lighter version of this yourself

## What You'll Build

A memory that shows up where the selling happens.

Not a CRM you go to. Everything you know about this client, sitting in front of you at the moment you are typing to them, in the app you were already typing in.

## The Story

A product designer, twelve years in fintech, had never shipped an app. Six months ago he started writing code instead of handing off design files. This was the first thing he built end to end.

The idea came from watching people sell. Salespeople, real estate agents, watch dealers, yacht brokers. He kept seeing them lose deals over things they had forgotten, and the things were never big. What the client's wife was called. Which property they liked. What got promised three weeks ago, buried in a WhatsApp thread nobody is ever going to scroll back through.

The obvious answer is a CRM. His observation about why that fails is the sharpest thing in the post:

Nobody in that world uses one, because using a CRM means stopping the sale to go type in a form, and no one selling a two million dollar yacht is going to do that.

Read that again if you have ever paid for a CRM your team does not use. The software was never the problem. The interruption was.

So he built the opposite of a form. A custom keyboard on the phone. You open WhatsApp, you start typing to a client, and everything you know about them is sitting right there above the keys. You never leave the conversation, because the conversation is the job.

Underneath it he has around thirty AI capabilities: drafting responses, pulling facts out of voice memos, matching a client against what you have in stock. His first architecture was one giant system prompt handling all of it, and by the fifth capability it was a mess.

The engineering was miserable in the way that only phone keyboards are. An iOS keyboard extension gets killed by the operating system somewhere around thirty to sixty megabytes of memory, so his first version, which loaded client data directly, kept dying. He moved everything into a read-only cache that the main app writes and the keyboard only reads. Keyboards get no network access unless the user grants full access, which triggers a scary system warning, so the whole thing had to work offline. The extension gets killed and relaunched constantly, so any state has to rebuild itself from disk in milliseconds. And breakpoints in a keyboard extension work maybe forty percent of the time, so he debugged an embarrassing amount of it with print statements.

## The Idea Is Portable. The Keyboard Is Not.

Most people reading this should not build a keyboard.

The transferable part is the placement. Client memory that lives somewhere you have to go and get it does not get used by the people who need it most, because those people are mid-conversation and the conversation is worth more than the tidiness of your records. Put the memory where the work already happens and it gets used.

There are three cheaper places to put it than a keyboard.

Before the call, as a briefing. An agent reads the thread and your notes and sends you six lines about this person right before you dial. This is a weekend build and it captures most of the value.

After the conversation, as extraction. You forward the thread, or a voice memo from the car, and the agent pulls out the facts and appends them to the client's row. The reason nobody updates the CRM is that updating it is a separate task. This makes it not a separate task.

Inside the thread, as a lookup. You ask your assistant "what do I know about the Hendersons" and get the answer without opening anything. Less elegant than the keyboard. Roughly free.

## The Business Angle

This one does not replace a vendor, and that is exactly why it is worth your attention.

Nobody is invoicing you for the deals lost to forgetting. There is no line item, no monthly charge, no renewal email. The cost is a client who felt like a stranger on the fourth call and went with the broker who remembered their kid's name. That number never shows up anywhere, so nothing in your business ever flags it.

The businesses this hits hardest are the ones with long sales cycles and few, large deals. Real estate, high-end retail, brokerage, custom manufacturing, professional services. If your average deal is worth thousands and takes months of scattered conversations, one recovered deal a year pays for anything you build here several times over.

And there is a second thing worth more than the first. Right now that client history lives in one salesperson's head and their phone. When they leave, it walks out with them. Once it is written down by an agent that listens to the thread anyway, it becomes yours.

## Who Should Steal This Idea

Real estate agents, brokers, high-ticket retail, anyone selling something expensive over months of WhatsApp. Owners with a small sales team who bought a CRM that nobody fills in. Any business where the relationship is the product.

## How Hard Is It

The briefing version: set it up in an afternoon.

The extraction version: a weekend.

The keyboard version: serious engineering, on the hardest surface Apple ships. He is twelve years into a design career, spent six months learning to code first, and still lost hours to print statements.

Cost: a Claude subscription and whatever you already use to store client notes.

## Gotchas and Tips

**Start with your ten biggest clients, not all of them.** The value is concentrated. Ten well-kept client files beat four hundred empty ones, and you will actually finish.

**The capture has to be free.** If your team has to do anything deliberate to record a fact, they will not. Forwarding a thread or talking into a voice memo is about the limit of what survives a busy week.

**One job per prompt.** His single giant prompt broke by the fifth capability. Drafting a reply and extracting facts are separate jobs and want separate instructions.

**Client data on a phone is a real decision, not a footnote.** Names, family details, what someone can afford. Decide what is stored, where it lives, and what happens when a phone is lost, before you put a single client in it.

**Watch for confidently wrong recall.** An agent that misremembers which unit a client liked is worse than an agent that says nothing, because you will repeat it out loud with total confidence. Keep the source line next to the fact.

**iOS only, in the original.** If your team is on Android, the keyboard route is closed to you, and the three lighter versions above are not.

## Keep Reading

- [Replace Your CRM With a Conversation](/playbooks/nex-crm/)
- [The Inside Sales Agent That Never Sleeps (For Real Estate)](/playbooks/realtor-inside-sales-agent/)
- [Software for One: The App That Only Ever Has to Make Sense to You](/playbooks/software-for-one/)
