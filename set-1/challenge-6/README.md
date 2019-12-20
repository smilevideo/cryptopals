## Note
The initial guidance to use the edit distance between the first two KEYSIZE-sized blocks didn't work, nor did the other suggestion to take the average of the first 3 distances.  
What did work was to compute the average of the *maximum* number of unique distances between consecutive blocks, not just 3.
