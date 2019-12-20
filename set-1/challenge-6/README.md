NOTE: the initial guidance to only use the edit distance between the first two KEYSIZE-sized blocks sent me on a wild goose-bug chase, and the other suggestion to take the average of the first 3 distances was equally unhelpful.  

The approach that worked for me was computing the average of the maximum number of unique distances between consecutive blocks.

I guess it kind of hinted that the first method wouldn't be enough, but it's not clear and made me think there was a bug in my code when there wasn't, so I can't help but feel like the challenge outline did me dirty there.

If anyone disagrees and I am being dumb please let me know because I love to be proven wrong.
