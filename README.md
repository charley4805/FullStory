Fullstory Strategic Solutions Demo – STEAM Store

This project is a simple single-page web application built to demonstrate intentional Fullstory data modeling using the JavaScript API. The app represents a small kids’ STEAM activity storefront with a realistic purchase flow: browse products, search and filter, add items to a cart, and complete checkout.

The goal of the demo is not visual complexity, but clarity—showing how properly modeled behavioral data enables teams to understand why users convert or drop off, not just that they did.

Live Demo

Live Site: https://charley4805.github.io/FullStory/
Source Code: https://github.com/charley4805/FullStory


Tech Stack & Design Choices
React – Used to create a fast, responsive single-page experience that mirrors modern e-commerce and SaaS applications.
TypeScript – Helps prevent errors in critical flows like cart updates and checkout, improving reliability and maintainability.
Tailwind CSS – Enables rapid UI iteration and consistent styling without introducing unnecessary complexity.
Vite – Provides fast local development and simple deployment to GitHub Pages.

Fullstory Instrumentation Overview

Page Naming (FS API)
Page names are set programmatically on route change:
Browse: Products
Checkout
Implemented centrally at the routing layer to ensure consistency.
Custom Events

Key user actions are captured with typed properties:
Search Performed
Item Added To Cart
Checkout Completed 

API Element Naming (data-fs-element)
Product Search Box
Category Filter Dropdown
Add To Cart Button
Place Order Button
Checkout form inputs
Extracted Element Properties

Important business data is attached directly to interactions using data-fs-properties-schema, including:
Product ID, price, and stock status on Add To Cart
Order total, item count, and subscription intent on Checkout

AI Tools Used
ChatGPT – Used to assist with structuring and refining documentation.
Antigravity – Used for UI.


Business Value Translation

This demo was built as a simple kids’ STEAM shopping experience because it reflects a very common real-world flow: browsing, searching, adding items to a cart, and checking out. React keeps the experience fast and responsive, TypeScript helps prevent errors in critical checkout flows, and Tailwind allows quick UI iteration without adding complexity—helping the site feel smooth and trustworthy so parents are more likely to complete a purchase.

Using Fullstory’s JavaScript API, user behavior is intentionally modeled instead of relying on generic analytics. By programmatically naming pages, key buttons, and form inputs—and attaching meaningful data like product IDs, prices, quantities, and subscription intent—teams can quickly see where users hesitate or drop off. This API-driven approach preserves user intent and context, making behavior searchable and actionable across product, marketing, and support teams. When teams can clearly understand why users struggle and fix issues faster, conversion improves and Fullstory becomes a natural platform for renewal and expansion.