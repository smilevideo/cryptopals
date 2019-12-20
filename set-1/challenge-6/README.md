## Note/complaint
The initial guidance to only use the edit distance between the first two KEYSIZE-sized blocks sent me on a wild goose-bug chase, and the other suggestion to take the average of the first 3 distances was equally unhelpful.  

The working approach was to compute the average of the maximum number of unique distances between consecutive blocks.
