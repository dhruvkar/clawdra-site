---
layout: playbook.njk
title: "Three No-Shows in One Day Cost Her $600. The Reminder Text Was Never the Problem."
description: "A med spa owner tried reminders, deposits and double-booking. The fix was making the reminder ask for a reply, releasing the slots nobody confirms, and filling them from a waitlist."
date: 2026-09-01
difficulty: Beginner
cost: "$20-60/mo. Claude plus whatever texting you already pay for."
timeToSetup: "An afternoon for the reconfirm loop. A week to add the waitlist."
originalSource: "https://www.reddit.com/r/smallbusiness/comments/1vx0jzi/"
originalAuthor: "u/Longjumping_Pop_2160 (r/smallbusiness)"
issueNumber: 28
permalink: /playbooks/no-show-reconfirm-loop/
tags:
  - scheduling
  - no-shows
  - clinics
  - salons
  - revenue-recovery
  - small-business
  - smb
---

## Tools

- [**Claude**](#aff-claude): writes the messages and reads what people text back
- [**OpenClaw**](#aff-openclaw): runs the loop on a schedule against your calendar
- [**Twilio**](#aff-twilio): the texting, if you do not already have it
- [**Google Calendar**](#aff-google-calendar): or whatever booking software you use. This sits on top of it
- [**Google Sheets**](#aff-google-sheets): the waitlist

## What You'll Build

Four things, in the order they make you money.

The reminder asks for a reply to hold the slot. Slots nobody confirms get released. Released slots get offered to a waitlist. And the people who miss anyway get one text the next morning with two times and a one character reply.

None of it needs a phone call.

## The Story

A med spa, two years old, small.

> No-shows are quietly killing our calendar. Last month, 3 no-shows in one day cost us roughly $600 in lost chair time plus the wasted prep time for the esthetician.

She had already tried the obvious things.

A text reminder 24 hours out cut no-shows by maybe 15 percent and people still ghosted. Deposits worked on new clients and felt strange to ask of regulars who had been coming for years. Double-booking the last slot of the day worked until both of them showed up.

What she really wanted help with was the awkward part:

> We tried a "we missed you" message but it honestly came off a bit needy.

And she was about to build the thing that would have made it worse. An automated call, right after the missed appointment, to try to rebook them on the spot.

## The Answer She Got

Somebody in the thread walked through all of it, and it is the whole playbook.

On why "we missed you" fails: it asks them for a feeling. It puts the awkwardness on the table and waits. Replying means addressing the fact that they flaked, so nobody replies.

Give them a decision to answer.

> Hi Sarah, we have Thursday 2pm or Friday 10am open for your rebook, reply 1 or 2 and I'll hold it.

No mention of the miss. It reads like scheduling admin. Answering costs them one character.

On timing, her instinct was backwards. Right after the missed slot is the worst moment, because they are mid-excuse and feeling caught, and your esthetician is annoyed, which leaks into a live call. The next morning does better.

Then the part that changes the build:

> You're treating the reminder as if it failed at 15%. It didn't fail, it's just doing the wrong job. A 24-hour text tells them about the appointment. It doesn't ask them to reconfirm it.

Make the reminder require a reply to hold the slot. Say plainly that unconfirmed slots get released.

Now the people who were always going to ghost tell you a day early, and you get to fill the seat.

> A slot you refill is worth more than a rebook three weeks out.

## The Seven Holes

A medical student built this exact system for med spas and posted it asking to be torn apart. No link, no funnel. He had spent months watching a clinic front desk.

His framing:

> Everyone talks about getting MORE leads. Nobody talks about the bucket leaking from seven holes at the bottom.

His seven: missed calls, slow lead response, no-shows with no recovery, last minute cancellations leaving empty chairs, dormant patients nobody reactivates, no upsell path, and owners who genuinely cannot answer whether they made money this week.

He built the conversation on Claude and kept it away from everything else:

> The AI never does math, never invents an open slot, never quotes a price. It only handles conversation.

Which is the same rule the tire shop landed on, in a different country and a different trade.

## The Business Angle

Her number was $600 in one day.

Run yours. Take your average ticket, times the seats you lose in a month. A five chair salon at $85 losing eight appointments a month is $8,160 a year sitting in an empty room.

You already paid to get those people. The ad ran, the front desk booked them, the room was prepped. The revenue was earned and then it walked.

Nothing here needs new customers, new ads, or a new system. It goes on top of the booking software you have.

## Who Should Steal This Idea

Salons, med spas, barbers, dentists, physios, chiropractors, tattoo studios, vets, driving instructors, tutors.

Also any trade running scheduled site visits, where a no-show costs you a truck roll instead of a chair.

## How Hard Is It

Set it up in an afternoon.

Cost: $20 to $60 a month.

## Gotchas and Tips

**Do the reconfirm before you do anything else.** Everything else on this list is worth less. Making the 24 hour text require a reply, and releasing the ones nobody answers, does more than any recovery message ever will.

**Say the release out loud.** "Reply Y to keep your slot, unconfirmed appointments are released at 6pm" only works if you actually release them. Do it once and people start replying.

**Two options, never an open question.** "When would suit you?" makes them do work. "Thursday 2pm or Friday 10am, reply 1 or 2" gets answered from a car park.

**Never mention the miss.** No apology, no guilt, no "we missed you." It reads as admin and it converts better.

**Next morning, not immediately.** Give it overnight. You are also giving your own staff overnight.

**Write the fee message as policy.** "Per our booking policy, the no-show fee has been applied. Reply here when you're ready to rebook." It gets you paid and nobody has to be the bad guy.

**Deposits on new clients only.** Her instinct that it felt weird to ask regulars was correct. Do not fix a 15 percent problem by insulting your best customers.

**Keep the AI on the words.** It writes and reads messages. Your calendar decides what is open, and your code decides what anything costs.

## Keep Reading

- [Put an Agent on Your WhatsApp to Book Appointments and Answer the Same 20 Questions](/playbooks/whatsapp-appointment-faq-agent/)
- [The Four-Piece AI Front Desk Every SMB Should Have Running by Friday](/playbooks/ai-front-desk/)
- [Score Every Lead 0-100 and Reply in 90 Seconds, Even at 2 AM](/playbooks/signal-based-daily-leads/)
