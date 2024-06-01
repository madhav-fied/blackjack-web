# For bringing your local instance of blackjack

```bash
git clone https://github.com/madhav-fied/blackjack-web.git
cd blackjack-web
pnpm install
pnpm dev 
```

# TODO: Down the road:

1. Improve winning state display
1. delay when drawing cards
1. Lint warnings

1. Money for betting
1. Shuffle/reset cards when going to end in useDeck
1. separate types definition
1. Improve directory structure
1. Style hand properly

1. Total near cards [ done ]
1. Evaluate cards for win - lift state up: context + reducer [ done ]
1. Dealer? Can be one card only and then draw card [ done ]
1. Player component -> For splitting functionality [ done ]
1. Fix checking logic: use split instead of charAt(0) [ done ]
1. Render unique cards in the first draw - useRef [ done ]
