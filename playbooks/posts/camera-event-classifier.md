---
layout: playbook.njk
title: "A Camera That Tells You Whether It Was a Delivery or a Theft"
description: "An agent wrote him a script that saves a 60-second clip whenever his camera sees motion, shows it to a model that can watch video, and texts him a plain verdict instead of another motion alert."
date: 2026-07-29
difficulty: Beginner-to-intermediate
cost: "~$10-30/mo (pennies per clip, and only clips with motion get looked at)"
timeToSetup: "An afternoon"
originalSource: "https://www.reddit.com/r/hermesagent/comments/1v34auv/"
originalAuthor: "XaocuHKa"
originalAuthorUrl: "https://www.reddit.com/user/XaocuHKa/"
issueNumber: 24
permalink: /playbooks/camera-event-classifier/
tags:
  - security
  - cameras
  - retail
  - storefront
  - alerts
  - video
  - small-business
  - loss-prevention
---

## Tools

- [**Hermes**](#aff-hermes): the agent that wrote the script and runs the loop
- [**OpenClaw**](#aff-openclaw): alternative agent runtime for the same build
- [**Claude Code**](#aff-claude-code): another alternative that does the same jobs
- [**Ring**](#aff-ring): the camera in the original build, though any camera that exposes motion events works
- [**Gemini**](#aff-gemini): a model that can watch actual video, not just still frames
- [**Telegram**](#aff-telegram): where the plain-English verdict lands on your phone
- [**Python**](#aff-python): what the script is written in

## What You'll Build

A camera that tells you what happened, rather than one that tells you something happened.

The loop runs in four steps. Your camera detects motion, a script saves a sixty-second clip, and that clip goes to an AI model that can watch video, with a question attached: what is going on here, and should I care? The answer arrives on your phone as a sentence.

So instead of "motion detected at the front door," you get "UPS delivery," or "USPS pickup," or "possible theft." That difference is what separates a camera you have muted from one you still respond to.

## The Story

This one is a short Reddit comment, and the description is a lot shorter than the idea inside it.

A user going by XaocuHKa was in a thread about what people run their agents for. They said their agent wrote a Python script that monitors their Ring camera for motion, saves a sixty-second clip, passes it to a different model that can work with video, evaluates the risk of theft and identifies deliveries, and notifies them on Telegram. They get a message that says "UPS delivery" or "USPS pickup" or a possible theft warning.

That is the whole post. It matters more than its length suggests.

Everybody with a camera has the same experience. You install it, you turn on motion alerts, and for about four days you check every single one. Then you realize that ninety percent of them are a car going past, a cat, a shadow at four in the afternoon, or the wind moving a plant. So you turn the alerts off, or you leave them on and stop looking, which is worse, because now you believe you are covered when you are not.

Camera companies know this, which is why "smart alerts" that can distinguish a person from a car are what they charge a monthly subscription for. Even those top out at telling you a person was there. They cannot tell you whether that person dropped off a box or picked up one that was not theirs.

Closing the gap between "a person was at your door" and "someone just took your package" is the whole job, and it now costs a sixty-second clip and one well-worded question.

## The Detail That Makes It Work

One technical choice in that comment is easy to skim past, and it is the reason the whole thing works. The clip goes to a model that can process video rather than a still image.

This matters enormously. A photo from a doorbell camera shows you a person standing near a package. That is genuinely ambiguous. Are they setting it down or picking it up? A still frame cannot tell you. A human looking at that photo cannot always tell you.

Video can. Direction of travel, whether their hands were full arriving and empty leaving or the reverse, whether they came up the path or in from the side, whether they looked around first, whether a marked van is parked in the corner of the shot. All of that lives in the motion, and none of it survives in a single frame.

So when you build this, give the model the actual clip and let it watch, rather than letting it summarize a snapshot.

The other quiet efficiency is that this only runs when the camera reports motion. Nothing analyzes a 24-hour stream, so most of the day costs nothing and you only pay when something moved. That filtering is why the monthly cost lands where it does.

## The Business Angle

Retail and storefront owners, this section is for you.

**What you are paying now.** Professional monitoring runs $30 to $60 a month, and what you get is someone calling after an alarm has already tripped. Cloud video plans with smart detection are typically $10 to $20 a month per location, where "smart" means it can tell a person from a car. Video analytics that actually classifies behavior is a commercial product with commercial pricing, commonly $50 to $100 per camera per month, sold to chains rather than to the guy with one shop.

This build gets you behavior classification at the cost of the clips you analyze. Which is pennies, because only motion events get looked at.

**What it actually saves you.** Package theft is the obvious one, and for a small retail or e-commerce operation a few stolen deliveries a year is real money. But theft is probably not where most of the value sits.

The rest of it is knowing your delivery arrived without waiting on a tracking update, knowing somebody is at your back door at 11pm on a Sunday, and knowing a customer has been standing outside your locked door for five minutes while you are in the back. Plus you end up with a dated, described log of who came and went, instead of four thousand video files nobody will ever open.

**The number nobody counts is attention.** Forty useless notifications a day cost you more than money, because they train you to ignore your own security system. This build takes those forty and leaves you the two that matter. A muted alert is worth exactly nothing, so anything that gets you back to trusting the notifications is worth more than the subscription it replaces.

## Who Should Steal This Idea

Anyone with a camera and a question it cannot currently answer. The camera setup is the same everywhere. The question you ask it is specific to your business.

**Retail storefronts.** Deliveries arriving, customers waiting at a locked door, loitering after hours, someone at the back entrance.

**Restaurants and bars.** Back door propped open, deliveries dropped where they should not be, dumpster being used by somebody else's business, which is a real and expensive problem.

**Self-storage and small warehouses.** After-hours access, vehicles that do not belong, unit doors left open.

**Car lots.** Overnight movement on the lot. A lot camera that can say "someone is walking the rows at 2am" is a different product from one that says "motion."

**Construction sites.** Tool and material theft is endemic, and sites are empty and unmonitored precisely when it happens.

**Contractors and trades with a yard.** Same story. Trailers and equipment sitting overnight.

**Property managers.** Illegal dumping, unauthorized access, verifying a vendor actually showed up when they invoiced you for showing up.

**Farms and rural properties.** Gate access, livestock, equipment, and typically no monitoring service worth buying at that distance.

The pattern is always the same. You have footage and you do not have attention, and this converts one into the other.

## How Hard Is It

An afternoon, and it is a genuinely good first build if you are new to this.

The pieces are small. Something that notices your camera reported motion, something that grabs the clip, one call to a model that can watch video, and a message to your phone. Any capable agent will write this for you from a description.

The part that needs your thought is the question you ask the model, because that is your entire product. "Describe what happened" gives you a paragraph you will not read. What you want is a short verdict from a fixed set of options you defined, plus a confidence, plus one line of explanation. Tell it exactly which outcomes you care about: delivery arriving, package being removed, customer waiting, staff arriving, vehicle in the lot, nothing worth mentioning.

The last item on that list is the important one. Give it explicit permission to conclude that nothing happened, and to stay quiet when that is the answer. A system that has to produce an alert will produce alerts, and you will be back where you started inside a week.

**Cost:** roughly $10 to $30 a month depending on how busy your camera is. Only motion events get analyzed, so a quiet back door costs almost nothing and a busy sidewalk costs more. If your camera is on a street, restrict the detection zone before you turn this on.

## Gotchas and Tips

**Send video, not a still.** A single frame cannot tell you whether a package is arriving or leaving. The motion can, and that distinction is most of what you are paying for.

**Define your categories up front, and include "nothing."** A short list of specific outcomes plus an explicit silent option. Open-ended descriptions produce noise, which is the exact problem you are solving.

**Fix your motion zones first.** If your camera currently fires on passing cars, you are about to pay to analyze passing cars. Tighten the detection area before you connect anything, not after.

**Ask for a confidence level and act on it.** High confidence goes straight to your phone. Low confidence goes into a quiet log you glance at once a day. That single split is what keeps the alerts trustworthy.

**Keep the clip and the verdict together.** When you get "possible theft," you want to tap it and watch the sixty seconds immediately. An alert you cannot verify in one tap is an alert that makes you anxious rather than informed.

**Be careful what you automate on top of it.** Notifying you is the right output. Do not wire this into anything that calls the police, triggers an alarm, or contacts a person. It will be wrong sometimes, and the cost of being wrong in that direction is severe.

**Check your local rules on recording.** Cameras pointed at public sidewalks, shared spaces, or anywhere with employees have rules attached depending on where you are, and analyzing footage does not change your obligations. Worth ten minutes before you scale this to a storefront.

**Start on one camera for two weeks.** Read every verdict during that period and see where it is wrong. Your specific doorway, lighting, and traffic will need the question tuned, and two weeks of watching tells you exactly how.

---

## Keep Reading

- **[His AI-Built Baby Monitor Knows Babbling From Crying. The Whole Family Sleeps Now.](/playbooks/esp32-smart-baby-monitor/)**: The same instinct applied to sound instead of video, turning a raw sensor into a useful answer.
- **[Let an AI Run Your Equipment Without Letting It Break Anything](/playbooks/greenhouse-ai-with-safety-rails/)**: What to do once an agent is watching your physical space and you start wanting it to act.

**Want the full deep dive?** Read our [Best OpenClaw Skills](/learn/best-openclaw-skills/) guide for the foundational patterns this playbook is built on.
