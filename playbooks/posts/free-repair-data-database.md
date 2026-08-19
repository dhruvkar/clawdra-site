---
layout: playbook.njk
title: "A Mechanic Cut Off Two Fingers. He Spent the Recovery Building the Database His Industry Paywalls."
description: "Labor times, torque specs, and fault codes are behind subscriptions every small shop resents paying. One shop owner, sidelined by an injury, built a free alternative and funds it with an API."
date: 2026-08-12
difficulty: Advanced
cost: "Free to use. If you build your own version, hosting is the cheap part and the data is the expensive part."
timeToSetup: "Months, not weekends. This is the one in this issue that is genuinely hard."
originalAuthor: "Dhruv Kar"
issueNumber: 27
permalink: /playbooks/free-repair-data-database/
tags:
  - automotive
  - trades
  - data
  - industry-software
  - quoting
  - small-business
  - smb
---

## Tools

- [**Claude Code**](#aff-claude-code): what he used for parts of the build, and what you would use for yours
- [**Claude**](#aff-claude): the reasoning layer behind the "fix my car" view
- [**OpenClaw**](#aff-openclaw): if you want the curation and update jobs running on a schedule instead of by hand
- [**PostgreSQL**](#aff-postgresql): where a reference dataset like this belongs once it stops being a spreadsheet
- [**Cloudflare**](#aff-cloudflare): cheap hosting and the bot protection any free public database will eventually need
- [**Stripe**](#aff-stripe): how you charge for the API tier that funds the free tier

His exact stack is not public. This is the shape you would need, not a copy of his.

## What You'll Build

A reference database for a trade that gatekeeps its own reference data, given away free, funded by selling programmatic access to the same data.

In this case: labor times, torque specs, fluid specs, battery and wiper specs, and fault code information for cars. Plus a quote builder, an AI diagnostic view, and a section where actual humans answer questions.

## The Story

He has been working on cars for 25 years. Owns a shop.

Last year he cut two of his fingers off. They were repaired and he is fine, and he is funnier about it than anyone else would be. But he could not work in the shop while he healed.

So he built the thing he had wanted for two decades.

Every small shop in the country pays for repair data. Labor times so you can quote a job. Torque specs so you can put it back together correctly. Fault code information so you know what the car is telling you. The names in that business are ALLDATA, Mitchell1, and MOTOR, and his description of how the trade feels about them is not subtle.

In his words: he knows everyone who works on cars, whether at a small shop or even a Midas, hates the paywalled big boys.

So he built a free one. It is called the Open Labor Project.

## What He Actually Shipped

Not a landing page with a waitlist. A working reference site.

Free labor times, torque specs, fluid specs, battery specs, and wiper specs. Fault code information. A quote builder, which is the part most directly worth money to a shop owner, because quoting is the job that stands between a phone call and a booked repair.

Then two more pieces that show he actually thought about it.

There is a free "fix my car" view driven by AI. And right next to it, there is an "ask a human expert" section, staffed by the best techs he knows personally, who agreed to participate.

His reason for building both is the most useful sentence in the whole post: AI is actually kind of terrible at diagnosing things at a deep level.

That is a man who sells an AI feature telling you exactly where it stops working. He built the human backstop into the product rather than pretending the model closed the gap.

He also wrote a page explaining how the data is curated, because a free database that will not show its work is not worth trusting. On a reference dataset, provenance is the product.

## The Part That Should Change How You Think

He keeps it free. He funds it partly out of his own pocket, and partly by selling API access to the same data, which he says has been moderately successful.

Read that structure again, because it is the actual playbook.

The free public version is the marketing. The programmatic access is the business. The people who need one repair spec at a counter pay nothing and tell their friends. The people who need ten thousand specs inside their own software pay him.

He did not have to beat ALLDATA to win. He had to make the thing exist and let it fund itself.

## Be Honest About the Difficulty

This is the hardest build we are running this issue, and pretending otherwise would be doing you a disservice.

He is not a shop owner who typed a prompt and got a database. He says Claude helped him with some of the coding, and in the same breath he tells you he has a coding and infosec background from seven years in a defense company environment.

So the correct read is not "AI built this." The correct read is that a domain expert who could already code got a large amount of leverage, and finished a project that had been impossible to justify before.

That is still the important part. He had 25 years of knowing exactly what the data should look like, which is the thing you cannot buy or prompt for. What changed is that the build cost around that knowledge fell far enough to make an out-of-pocket passion project survivable.

## The Business Angle

You already know what your shop pays for repair data every month. We are not going to guess at your bill, and anyone quoting you a precise industry figure is making it up.

The question worth asking is broader than one subscription line.

Look at your own trade and find the reference data everyone needs and nobody owns. Not your customer list, not your pricing, not anything proprietary. The shared facts. Labor times. Code tables. Sizing charts. Compliance thresholds. Part interchange. The stuff that is true for everyone in your industry and is somehow still behind a login.

Someone is charging your entire trade for access to facts. For most of the history of your trade, building the alternative meant a database team and a funding round, so nobody did it. That is why the subscription still exists.

Two things changed. The build cost collapsed. And you can fund a free consumer version by selling the machine-readable version to the handful of companies that want to plug it into their own software.

The vendor you resent is not protected by their data. They are protected by how expensive it used to be to assemble it.

## Who Should Steal This Idea

Anyone with deep operator knowledge of a trade that paywalls its own reference material. Auto shops, HVAC, plumbing, electrical, medical billing, insurance, legal, logistics, agriculture.

Especially anyone who has been in a trade long enough to know precisely which numbers matter and which ones the incumbent gets wrong. That knowledge is the moat. The software is now the easy half.

## How Hard Is It

Serious engineering.

Cost: free to use his. If you build your own, hosting is genuinely cheap and the data is genuinely expensive. Assembling, verifying, and maintaining a reference dataset is the entire job, and no model does that part for you.

## Gotchas and Tips

**The data is the work.** Everything else is a weekend. Do not start this thinking the hard part is the site.

**Publish your provenance.** He wrote a page explaining how the data is curated, and that page is doing more work than any feature. A free database nobody can audit is a free database nobody will rely on for a repair they have to warranty.

**Know where your AI stops.** He shipped an AI diagnostic view and an "ask a human" section side by side because he knows the model is weak at deep diagnosis. Copy that instinct. In a trade, a confidently wrong answer costs somebody a real engine.

**Decide the funding model before you launch, not after.** Free consumer tier plus a paid API is a real structure that works. Free with no plan is a project you resent in eight months.

**Check the licensing on anything you did not measure yourself.** Reference data has owners, and "it was on the internet" is not provenance. This is the part where a domain expert who has been in the trade for decades has a real advantage over an outsider scraping.

## Keep Reading

- [Working Around the Industry Software You Can't Replace](/playbooks/vertical-software-gap-filler/)
- [An Attorney Turned Four Years of Client Emails Into a Subscription](/playbooks/expertise-to-subscription/)
- [Let Customers Design Their Own Order and Get a Price](/playbooks/visual-quote-agent/)
