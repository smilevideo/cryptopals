## Note
The initial guidance to only use the edit distance between the first two KEYSIZE-sized blocks didn't work, nor did the other suggestion to take the average of the first 3 distances.

The approached that worked for me was to compute the average of the *maximum* number of unique distances between consecutive blocks, not just 3.
