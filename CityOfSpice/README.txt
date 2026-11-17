CITY OF SPICE - PRINTED MENU EDITION (16 NOV 2026)
==================================================

WHAT CHANGED
- Replaced the 53-item starter menu with 112 rows from the two provided photographed printed menu pages.
- Added Non-Vegetarian Curry builder with selectable protein and 12 curry sauces.
- Added selectable individual soft drinks for the 3 grouped printed drink rows.
- Kept the single large City of Spice header logo, Halal badge, search, cart and staff area.
- Preserved offline PWA support; versioned local menu storage so previous app menu changes are not overwritten.

CRITICAL CHECKS BEFORE CUSTOMER USE
- Lamb curry protein price is unclear in the printed photo, so Lamb is disabled in the builder pending staff confirmation.
- Chef Special Fried Rice is crossed out on the printed menu and has been omitted.
- 112 menu rows were transcribed; 1 additional builder card provides the non-vegetarian curry combinations.
- Prices/servings require restaurant verification. Egg Masala Dosa, Chicken Tikka Dosa and other variations have specific printed prices.
- Descriptions are customer-friendly draft explanations inferred from dish names; NOT verified official ingredient/allergen descriptions.
- Dietary labels are conservative but still MUST be approved by the restaurant before relying on them.
- No dish photos have been supplied yet. Emoji image placeholders remain until restaurant photos or licensed reusable photos are bundled.
- No orders or payments are transmitted: the cart is a dish selection list only.

LOCAL DATA AND UPDATES
- This edition uses a new localStorage menu key. This prevents an older 53-item saved menu from silently hiding the new 112-item seed menu. Old localStorage data remains on that device under its original key.
- If staff edited an older version, export its JSON menu backup before changing versions; importing that old backup into the new edition would replace this new menu, so merge changes separately.
- Staff PIN remains saved under the original device-local key.
- Export and import JSON menu backups across iPads manually. Device edits do not automatically sync.
- Menu photos manually added in staff mode may hit localStorage size limits; bundle optimized food images in an images folder for production.

WEB INSTALLATION / OFFLINE
1. Deploy entire CityOfSpice folder over HTTPS if using the PWA installation method.
2. Add to Home Screen from Safari, open online once to populate offline cache, then test offline.
3. Local HTML runners and Swift Playgrounds can also bundle these files, but native wrapper integration is separate and needs device-specific testing.

ANDROID
The separate Android Studio ZIP bundles the identical CityOfSpice website files inside the APK. It does not contact any website for menu browsing.

CHECKLIST
- Verify 112 printed rows and 7 protein selections against original paper menu.
- Confirm Lamb curry price and restaurant dietary/allergy policy.
- Test curry, drink choices, cart, staff PIN, backups and offline reopening.

HYBRID CURRY PICKER: 12 descriptive sauce cards + one protein dropdown; total price and quantity summary; add custom curry combinations to cart. All sauce descriptions/heat ratings are drafts for restaurant verification. Lamb pricing needs confirmation. This version uses new localStorage keys; export previous staff edits before changing versions.
