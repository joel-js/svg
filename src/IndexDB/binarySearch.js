export const binarySearchOutages = (outages, startUnix, endUnix) => {
    // Ensure outages are sorted by start_time_unix
    // outages.sort((a, b) => a.start_time_unix - b.start_time_unix);
  
    // Binary search to find the start index
    let left = 0;
    let right = outages.length - 1;
    let startIndex = -1;
  
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (outages[mid].start_time_unix >= startUnix) {
        startIndex = mid;
        right = mid - 1; // Narrow down to earlier indices
      } else {
        left = mid + 1;
      }
    }
  
    // Collect outages in the given range
    const result = [];
    for (let i = startIndex; i < outages.length; i++) {
      if (outages[i].start_time_unix > endUnix) break; // Stop if beyond range
      result.push(outages[i]);
    }
  
    return result;
  };