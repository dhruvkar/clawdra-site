---
layout: playbook.njk
title: "Two Websites That Will Never Talk to Each Other. He Built the Bridge in an Afternoon."
description: "Somebody in your business is a human API, moving the same data between a supplier portal and your own system all day. Check the network tab first, then let Claude drive the browser."
date: 2026-09-01
difficulty: Beginner
cost: "Free if you have a paid Claude plan. Claude in Chrome is included."
timeToSetup: "An hour to describe it. A day if you end up writing an extension."
originalSource: "https://www.reddit.com/r/smallbusiness/comments/1vzxjcz/"
originalAuthor: "u/One_Bumblebee_3189 (r/smallbusiness)"
issueNumber: 28
permalink: /playbooks/browser-bridge-between-systems/
tags:
  - automation
  - browser
  - operations
  - data-entry
  - small-business
  - smb
---

## Tools

- [**Claude**](#aff-claude): drives the browser. The Chrome extension comes with any paid plan
- [**Claude Code**](#aff-claude-code): for the version you keep, once the steps stop changing
- [**Google Sheets**](#aff-google-sheets): the middleman when both sites do CSV
- [**OpenClaw**](#aff-openclaw): runs it on a schedule once it works

## What You'll Build

Something that reads one website and fills in another.

Pull the order off the supplier portal. Type it into your system. Submit it. Log it in the sheet. Do that forty times a day without a person doing it.

## The Story

A guy built Chrome extensions for his father's business.

Not because he wanted to build software. Because a large part of his father's day was moving information between websites that have no way of talking to each other. So the extension pulls what it needs off one page, fills in the form on the next site, submits it, writes the result somewhere else, and builds a report across all of them.

His observation is the one that matters:

> It also made me realize how many businesses probably have processes that don't fit neatly into Zapier/Make/API-based automation because the websites involved simply don't offer integrations.

That is most small businesses.

The supplier portal. The state licensing site. The insurance carrier. The freight portal. The manufacturer's warranty system. None of them will ever build an integration for a nine person company.

So somebody in that business becomes the integration. Usually it is the owner, or the one person who knows the system.

Another commenter had run exactly this at an insurance brokerage. They could not integrate with most of the carriers, so their extensions pulled data off a Salesforce page and pasted it into carrier application forms. For small group benefits the carrier sites allowed spreadsheet uploads, so they built their own translator between each site's format.

Two different businesses. Same fix.

## Check The Network Tab First

Before you automate anything, open the site and press F12.

A commenter on the thread gave the best advice in the whole thread, and almost no owner has heard it. Most sites that "have no integration" are still calling a JSON API under the hood every time you click something. You can see it happening in the network tab while you use the site normally.

If it is there, hit it directly. It is faster and far more reliable than driving a browser.

"No integration" nearly always means "no documented integration." Those are different problems.

## The Business Angle

Price the person doing it now.

Half a day a week of data entry at $22 an hour is about $5,700 a year. Two people doing it is $11,000. And it is the work that makes good staff quit, because it is the least interesting hour of their day and they know it.

Claude in Chrome is included with a paid Claude plan you may already have. Nine million people installed it in the beta. Somebody timed it editing a Salesforce record end to end at under 40 seconds against three to four minutes doing it by hand.

So the first version of this costs nothing. You describe the job in plain English and watch it work.

## Who Should Steal This Idea

Insurance agencies, brokers, freight and logistics, medical billing, anyone dealing with a manufacturer portal, anyone filing on a government site every month.

If a person in your business has two tabs open and is looking back and forth between them, that is the one.

## How Hard Is It

Set it up in an afternoon.

Go up the ladder only as far as you need:

1. Check the network tab. If there is an API, use it and stop here.
2. If both sites do spreadsheet import and export, use that. Boring and it never breaks.
3. Describe the job to Claude in Chrome. No code.
4. Write a real extension only when it runs constantly and has to survive logins.

Cost: nothing to start.

## Gotchas and Tips

**It will break, so plan for that instead of being surprised.** When a site redesigns, everything pointed at it stops working. The industry number for fixing one of these is 4 to 16 hours of developer time, one to three times a year per portal. An automation that saves five hours a week easily survives that. Owners abandon these because the first break feels like proof it does not work.

**Decide what this is before you build it.** One person's convenience, or the path your quotes and invoices actually travel. If it is the second one, you want a real record those sites write into, even if version one is ugly. As one commenter put it, browser automation is a fine bridge and a bad place to park the company's truth.

**Spreadsheets in the middle work until two people edit at once.** Then they stop working, quietly, and you find out from a customer.

**These run inside your logged-in accounts.** Keep it on the machine and the browser profile of whoever owns those logins. Do not hand a portal password to a hosted service to save an hour.

**Two factor auth will stop it.** Anything unattended will hit an MFA wall eventually. Build it so a human is around, or so it stops and asks.

**Write the steps down.** The extension is not the asset. The list of what happens in what order is the asset, and it is what lets anybody rebuild this in an hour when the site changes.

## Keep Reading

- [Working Around the Industry Software You Can't Replace](/playbooks/vertical-software-gap-filler/)
- [Turn Any Windows PC Into a Web Automation Machine](/playbooks/real-scraping-stack/)
- [Your AI Can Now Run Your Mac in the Background. Without Stealing Your Mouse.](/playbooks/cua-driver/)
