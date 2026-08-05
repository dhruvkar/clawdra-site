---
layout: playbook.njk
title: "Eight of the 27 Most-Copied Automations Are the Same Build."
description: "Someone catalogued the 27 most-upvoted automation builds. Eight of them were one build wearing different industry costumes. Here is the shape, and how to copy it."
date: 2026-08-05
difficulty: Beginner-to-intermediate
cost: "~$20-50/mo, plus whatever your calendar and phone already cost"
timeToSetup: "A weekend to build, two weeks of reading it every day"
originalSource: "https://www.reddit.com/r/automation/comments/1v4kl9z/i_went_through_the_27_mostupvoted_automation/"
originalAuthor: "AykutSek"
originalAuthorUrl: "https://www.reddit.com/user/AykutSek/"
issueNumber: 25
permalink: /playbooks/automation-pattern-survival/
tags:
  - small-business
  - smb
  - intake
  - receptionist
  - appointments
  - lead-capture
  - service-business
  - monitoring
  - quality-control
---

## Tools

- [**OpenClaw**](#aff-openclaw): the agent runtime that holds the rules and runs the loop
- [**Claude Code**](#aff-claude-code): does the same jobs if you prefer working from a terminal
- [**Hermes**](#aff-hermes): another runtime option for the same shape
- [**Google Calendar**](#aff-google-calendar): the availability the agent has to read before it promises anything
- [**Calendly**](#aff-calendly): the booking layer if your calendar is not directly reachable
- [**Twilio**](#aff-twilio): the phone number messages arrive on
- [**WhatsApp**](#aff-whatsapp): the channel a lot of customers actually prefer
- [**Gmail**](#aff-gmail): the other channel intake arrives on
- [**Telegram**](#aff-telegram): where the agent pings you when it is unsure
- [**SQLite**](#aff-sqlite): the log of every conversation, which is the part this playbook is really about

## What You'll Build

An intake agent, plus the thing that tells you when the intake agent is wrong.

The agent part is unremarkable. A message arrives, it works out what the person wants, checks whether you can actually do it, books it, and writes down what happened. Five steps, and four of them are easy now.

The second piece is a daily digest of what your agent did, written in sentences, sent somewhere you will actually look. Not a dashboard. Just a short list of the conversations it had and the calls it made, once a day, on your phone.

Almost nobody builds the second piece, and that is roughly why so few of these are still running a year later.

## The Story

Someone posted this on Reddit under the handle AykutSek, in r/automation. They did the boring work nobody bothers with. They went through the 27 most-upvoted automation builds people had posted and looked at what each one actually did, instead of what it was called.

Eight of the 27 were the same build.

A dental one that books appointments. A restaurant one that takes reservations. A vet clinic one that sorts urgent from routine. A website chat that captures the lead before the visitor leaves. Four industries, four write-ups, four sets of screenshots. Underneath, the same five moves: message comes in, figure out what they want, look it up, book it, log it.

The rest clustered just as tight. Five turn content into other content. Four are some version of finding businesses and pulling their public contact info.

The top posts also had almost nothing to do with the multi-agent architecture everyone argues about online. Twenty-seven of the most popular things anyone built, and the ambitious orchestration stuff barely shows up.

The author closed with a question they could not answer from the outside. How many of these are still running six months later?

Someone who deploys these for a living answered it. The ones that die are the ones nobody checked after go-live, because a receptionist bot does not fail loudly. It books the wrong slot, or gets an address wrong, and no alert fires anywhere. You find out when a customer calls to complain. The builds that lasted had someone reading the transcripts for the first couple of weeks.

The build itself is an afternoon of work now. The two weeks after it are where these live or die.

## The Dental One and the Vet One Are the Same Build

There is a practical consequence to eight builds being one build, and it is worth more than the observation.

When owners go looking for how to automate something, they search for their industry. The dental one. The HVAC one. The law firm one. They find nothing good, or one thin blog post from 2024, and they decide this has not been figured out for businesses like theirs.

It has been. It is filed under somebody else's trade.

A vet clinic sorting urgent from routine is doing the same job as a plumber deciding whether this is a burst pipe or a dripping faucet. A restaurant taking reservations is doing the same job as a salon booking a colorist. The dental practice confirming appointments is the physio, the tattoo studio, the driving instructor, and the guy who services your furnace.

Everything that feels specific to you is something you fill in. Which services you offer. Which questions people ask. How your slots are shaped. The words your customers use. None of that is the machine, and once that lands you can stop waiting for someone to publish the version with your industry in the title.

So search for the shape instead of the sector. If somebody in a trade nothing like yours published a build where a message arrives, gets understood, gets checked against something, gets booked and gets logged, you found your build. Swap the vocabulary and point it at your calendar.

## The Middle Step Is the Whole Project

Four of the five steps are easy now. One is not, and it is not the one people worry about.

Receiving a message is easy. Understanding what someone wants is easy, and that is the part that felt like magic two years ago. Writing down what happened is easy. Replying is easy.

Looking it up is where these die.

A commenter on the same thread said it plainly. Those bots look deceptively simple on the surface. The real fight is connecting that look-it-up-book-it-log-it flow reliably to whatever legacy systems or scattered software actually hold the data. Data integrity there, in their words, is brutal.

That is the honest part. Your agent has to know whether Tuesday at 3 is genuinely free, which means reaching into whatever holds the truth about Tuesday at 3. For a lot of small businesses that is a practice management tool from 2011 with no way in, or a paper book behind the counter, or three calendars that quietly disagree with each other.

If your answer is that your booking system has no way for software to talk to it, you did not hit a snag. You found the project. Sort that out before you write a word of agent instructions, because everything else is trim on top of that one question.

The good news is the shape survives a low-tech answer. Plenty of working builds skip integration completely. They take the request, check a calendar the owner keeps deliberately simple, and hand a human one line to confirm. You still get most of the value. The customer got a real answer in thirty seconds at nine at night instead of a voicemail beep.

## The Business Angle

**What you are paying now.** A part-time front desk person runs $2,000 to $3,500 a month depending on where you are. An answering service is cheaper, roughly $200 to $500, but it mostly takes messages instead of booking anything. The work still lands on your desk in the morning. Neither one covers evenings and weekends without the price climbing.

**What the missed ones cost.** This number matters more and gets counted less. For most service businesses an unanswered call after hours is not a delayed customer. It is a lost one. The next thing that person does is search again and call whoever picks up. If your average job is worth $400 and six of those slip past you in a month, the math gets uncomfortable fast.

**What this costs.** Twenty to fifty dollars a month, on top of the calendar and the phone number you already pay for.

**The catch that decides whether any of that is real.** All those savings assume the thing works. An intake agent that books the wrong slot did not save you a receptionist, it cost you a customer and removed the person who would have caught it. Nothing announces the failure, so the damage stacks up before you hear about it.

So the daily digest is not admin bolted onto the build. It is the part that turns the build into money. Ten minutes a day for two weeks, then a glance a day after that, and you will know inside a week whether you bought a front desk or a slow leak.

## Who Should Steal This Idea

Anyone whose front door is a message. Which is nearly everyone.

**Dental, medical, physio, chiro, veterinary.** Booking, confirming, rescheduling, and pulling the urgent cases out of the pile.

**Restaurants and bars.** Reservations, large party requests, and the same six questions about parking and dietary options.

**Salons, barbers, spas, tattoo studios.** Booking by service and by practitioner. That is the vet triage build in nicer clothes.

**Trades and home services.** Plumbers, electricians, HVAC, roofers, pest control. Emergency versus scheduled is the whole triage. This is the most valuable version of the build, because the emergency call is the one that pays.

**Law firms, accountants, consultants.** Qualifying an inquiry before anyone bills an hour against a bad fit.

**Gyms, studios, driving instructors, tutors.** Slot and class booking with a waitlist behind it.

**Property managers and self-storage.** Maintenance requests, viewings, and access questions. Almost all of it arrives after hours.

**Auto shops.** Estimates, drop-off times, and the endless is my car ready yet.

If your business answers the same twenty questions and fills the same calendar every week, you are in scope. The trade on the sign out front is the last thing that matters about your build.

## How Hard Is It

A weekend to build. Two weeks of paying attention after. Put the second one in your calendar.

The building is not the hard part anymore. An agent will write most of it from a clear description. Give it your services, your hours, your prices, the questions people actually ask, and some way to see your calendar. You will have something answering messages by Sunday evening.

Then do the unglamorous thing. Every conversation gets written down as plain sentences. What the person wanted. What the agent decided. What it booked. Where it hesitated. Send yourself that list once a day and read all of it for two weeks. Yes, all of it.

You are not watching for crashes. Crashes announce themselves. You are watching for the booking that went in an hour off, the address transcribed wrong, the customer who asked something slightly outside the script and got a confident answer that was wrong. Every one you catch in week one is a customer you keep and never find out you almost lost.

**Cost:** roughly $20 to $50 a month. If you already pay for a booking tool and a business line, the agent layer is the only new line on the bill.

## Gotchas and Tips

**It fails quietly, which is why it needs a reader.** Nothing here breaks in a way you will notice. It does the wrong thing confidently and moves to the next message. Assume that is happening and go looking. Waiting for an error message means waiting for a complaint.

**Settle the availability question before anything else.** If the agent cannot reliably find out whether a slot is free, do not let it promise slots. Have it take the request and hand you one line to confirm. That version is still worth building, and it cannot double-book you on a Saturday.

**Give it permission to not know.** The most useful sentence in your instructions is the one telling it what to do when it is unsure. Stop, say a human will follow up shortly, ping you. An agent that has to produce an answer will produce one.

**Escalation needs a name on it.** Pinging the business pings nobody. Send it to one person's phone with the whole conversation attached, not a notification saying something needs attention.

**Log the reasoning, not just the outcome.** Booked Tuesday 3pm tells you nothing once you know Tuesday 3pm was wrong. Customer asked for an afternoon this week, offered Tue 3pm and Thu 4pm, they took Tue. That shows you where it went off.

**Start with one channel.** Whichever one your customers already use. Adding more later is easy. Doubling your surface area on day one just means twice as many transcripts to read while you are still learning what wrong looks like.

**Read the write-up from the trade least like yours.** When you get stuck, go find how the plumber solved it. Their triage logic answers your vet clinic problem. It was the same problem the whole time.

**Put a reminder in your calendar for six months out.** The reason this playbook exists is that nobody knows how many of these are still alive. Book yourself half an hour next spring to read a real week of transcripts. That one reminder is most of what separates the builds that survive from the ones nobody mentions again.

---

## Keep Reading

- **[The Four-Piece AI Front Desk Every SMB Should Have Running by Friday](/playbooks/ai-front-desk/)**: The full front-desk stack this pattern describes, laid out as a build rather than a shape.
- **[Put an Agent on Your WhatsApp to Book Appointments and Answer the Same 20 Questions](/playbooks/whatsapp-appointment-faq-agent/)**: The single-channel version, and the fastest way to test the shape on your own customers.

**Want the full deep dive?** Read our [Best OpenClaw Skills](/learn/best-openclaw-skills/) guide for the foundational patterns this playbook is built on.
