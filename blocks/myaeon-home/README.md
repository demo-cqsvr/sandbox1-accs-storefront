# myAEON2go home

The root homepage auto-block uses the curated `homeContent` export from
`scripts/myaeon-content.js`. It renders `promotions` (`title`, `image`, `href`),
`products` (`name`, `image`, `priceText`, `href`), `categories` (`name`, `href`),
and `offers` (`title`, `image`, `href`). Images are optimized local assets.
Prices are the source merchandising snapshot; this block does not request live
pricing, change cart state, or provide checkout behavior.

Promotion controls support previous/next, direct slide selection, Arrow Left,
Arrow Right, Home, End, horizontal touch swipes, and automatic rotation every
six seconds. Rotation pauses on focus, hover, hidden tabs, and explicit pause.
Reduced motion disables automatic rotation. Hidden slides and links are removed
from keyboard navigation. Manual slide changes announce the selected promotion.
The first promotion loads eagerly at high priority; other imagery loads lazily.

Products use a native horizontal scrolling list, with keyboard focus and previous/
next page controls. Reduced motion disables smooth arrow scrolling. Five cards
fit at desktop widths; mobile shows one full card and part of the next. Category
tiles use two/four/eight columns. The first savings banner spans the desktop grid.

Verify at 390px and 1440px: all images load, hero controls select the correct
slides, focus stops rotation, hidden links cannot receive focus, touch swipes and
product arrows work, and promotion/product/category links reach their configured
destinations. Content snapshots can become outdated and need editorial refresh.
